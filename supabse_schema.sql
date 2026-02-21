-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ROLES ENUM
create type user_role as enum ('customer', 'tailor', 'admin');

-- ORDER STATUS ENUM
create type order_status as enum (
  'Pending_Pickup', 
  'At_Hub', 
  'Stitching', 
  'QC_Pending', 
  'Ready_for_Delivery'
);

-- PROFILES (Public user data)
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  role user_role default 'customer',
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- MEASUREMENTS
create table measurements (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references profiles(id) not null,
  bust decimal,
  waist decimal,
  length decimal,
  custom_notes jsonb,
  sample_garment_ref text, -- Link for 'Sample Garment Reference'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table measurements enable row level security;

-- Policies for Measurements
create policy "Users can view their own measurements." on measurements for select using (auth.uid() = customer_id);
create policy "Users can insert their own measurements." on measurements for insert with check (auth.uid() = customer_id);
create policy "Admins and Tailors can view customer measurements." 
on measurements for select 
using (
  exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.role in ('admin', 'tailor')
  )
);

-- LOGISTICS
create table logistics (
  id uuid default uuid_generate_v4() primary key,
  provider text, -- e.g., 'Swiggy Genie', 'Porter'
  pickup_coords jsonb, -- {lat, lng}
  delivery_coords jsonb, -- {lat, lng}
  tracking_id text,
  status text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table logistics enable row level security;

-- Policies for Logistics
create policy "Admins can manage logistics." 
on logistics for all 
using (
  exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.role = 'admin'
  )
);

-- ORDERS
create table orders (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references profiles(id) not null,
  tailor_id uuid references profiles(id), -- Assigned Tailor
  admin_id uuid references profiles(id), -- Overseer Hub Admin
  measurement_id uuid references measurements(id),
  logistics_id uuid references logistics(id),
  type text check (type in ('visit', 'pickup', 'diy')) not null,
  status order_status default 'Pending_Pickup',
  details jsonb, 
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table orders enable row level security;

-- Policies for Orders
create policy "Users can view their own orders." on orders for select using (auth.uid() = customer_id);
create policy "Users can insert their own orders." on orders for insert with check (auth.uid() = customer_id);
create policy "Tailors can view assigned orders." on orders for select using (auth.uid() = tailor_id);
create policy "Admins can view and manage all orders." 
on orders for all 
using (
  exists (
    select 1 from profiles 
    where profiles.id = auth.uid() 
    and profiles.role = 'admin'
  )
);
