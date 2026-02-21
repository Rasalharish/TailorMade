"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, MapPin, Award, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Tailor {
    id: string;
    bio: string;
    specialties: string[];
    years_of_experience: number;
    city: string;
    profile_image_url: string | null;
    is_verified: boolean;
    rating_avg: number;
    total_reviews: number;
    base_price_tier: string;
    profiles: {
        full_name: string;
    };
}

// TEMPORARY MOCK DATA - Remove once database is set up
const MOCK_TAILORS: Tailor[] = [
    {
        id: "1",
        bio: "Specialist in South Indian blouse designs with intricate embroidery. I create unique boutique-style pieces that blend tradition with modern aesthetics.",
        specialties: ["Blouse", "Kurta", "Salwar"],
        years_of_experience: 12,
        city: "Bangalore",
        profile_image_url: null,
        is_verified: true,
        rating_avg: 4.8,
        total_reviews: 127,
        base_price_tier: "Premium",
        profiles: { full_name: "Priya Sharma" }
    },
    {
        id: "2",
        bio: "Expert in mens formal wear and suits. 15+ years of experience crafting premium tailored suits for corporate professionals.",
        specialties: ["Suit", "Shirt", "Pants"],
        years_of_experience: 15,
        city: "Mumbai",
        profile_image_url: null,
        is_verified: true,
        rating_avg: 4.9,
        total_reviews: 215,
        base_price_tier: "Designer",
        profiles: { full_name: "Rajesh Kumar" }
    },
    {
        id: "3",
        bio: "Bridal lehenga and heavy work specialist. I bring your dream wedding outfit to life with exquisite craftsmanship and attention to detail.",
        specialties: ["Lehenga", "Blouse", "Gown"],
        years_of_experience: 10,
        city: "Delhi",
        profile_image_url: null,
        is_verified: true,
        rating_avg: 4.7,
        total_reviews: 89,
        base_price_tier: "Designer",
        profiles: { full_name: "Sneha Reddy" }
    },
    {
        id: "4",
        bio: "Contemporary kurta and fusion wear designer. Perfect for those looking for modern ethnic styles with a twist.",
        specialties: ["Kurta", "Kurta Set", "Salwar"],
        years_of_experience: 8,
        city: "Chennai",
        profile_image_url: null,
        is_verified: true,
        rating_avg: 4.6,
        total_reviews: 104,
        base_price_tier: "Premium",
        profiles: { full_name: "Meera Patel" }
    },
    {
        id: "5",
        bio: "Traditional saree blouse master. Specialized in temple borders, kasu work, and Maggam embroidery.",
        specialties: ["Blouse", "Salwar"],
        years_of_experience: 20,
        city: "Bangalore",
        profile_image_url: null,
        is_verified: true,
        rating_avg: 4.9,
        total_reviews: 178,
        base_price_tier: "Premium",
        profiles: { full_name: "Arjun Verma" }
    },
    {
        id: "6",
        bio: "Expert in Kerala traditional wear - Kasavu sarees, set mundu, and ethnic blouses. Modern meets tradition.",
        specialties: ["Blouse", "Kurta"],
        years_of_experience: 7,
        city: "Kochi",
        profile_image_url: null,
        is_verified: false,
        rating_avg: 4.5,
        total_reviews: 56,
        base_price_tier: "Standard",
        profiles: { full_name: "Lakshmi Nair" }
    },
    {
        id: "7",
        bio: "Premium mens ethnic and Indo-western specialist. Sherwanis, achkans, and designer kurtas for special occasions.",
        specialties: ["Sherwani", "Kurta", "Indo-Western"],
        years_of_experience: 13,
        city: "Mumbai",
        profile_image_url: null,
        is_verified: true,
        rating_avg: 4.8,
        total_reviews: 142,
        base_price_tier: "Designer",
        profiles: { full_name: "Vikram Singh" }
    },
    {
        id: "8",
        bio: "Boutique-style blouse artisan with expertise in designer cuts, backless patterns, and trendy styles.",
        specialties: ["Blouse", "Crop Top"],
        years_of_experience: 6,
        city: "Bangalore",
        profile_image_url: null,
        is_verified: false,
        rating_avg: 4.4,
        total_reviews: 67,
        base_price_tier: "Premium",
        profiles: { full_name: "Divya Menon" }
    },
    {
        id: "9",
        bio: "General alterations and daily wear expert. Quick turnaround for simple repairs and basic stitching.",
        specialties: ["Blouse", "Kurta", "Salwar", "Pants"],
        years_of_experience: 18,
        city: "Delhi",
        profile_image_url: null,
        is_verified: false,
        rating_avg: 4.3,
        total_reviews: 234,
        base_price_tier: "Standard",
        profiles: { full_name: "Anil Desai" }
    },
    {
        id: "10",
        bio: "Designer wear specialist - saree draping styles, lehenga customization, and gown alterations.",
        specialties: ["Gown", "Lehenga", "Saree"],
        years_of_experience: 9,
        city: "Chennai",
        profile_image_url: null,
        is_verified: true,
        rating_avg: 4.7,
        total_reviews: 98,
        base_price_tier: "Designer",
        profiles: { full_name: "Kavita Joshi" }
    }
];

export default function TailorDirectoryPage() {
    const [tailors, setTailors] = useState<Tailor[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [cityFilter, setCityFilter] = useState("");
    const [specialtyFilter, setSpecialtyFilter] = useState("");

    useEffect(() => {
        // TEMPORARY: Using mock data for immediate UI preview
        // Once database is set up, uncomment the fetchTailors() call
        setTailors(MOCK_TAILORS);
        setLoading(false);
        // fetchTailors();
    }, [cityFilter, specialtyFilter]);

    const fetchTailors = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (cityFilter) params.append("city", cityFilter);
            if (specialtyFilter) params.append("specialty", specialtyFilter);
            params.append("sort", "rating");

            const response = await fetch(`/api/tailors?${params.toString()}`);
            const data = await response.json();
            setTailors(data);
        } catch (error) {
            console.error("Failed to fetch tailors:", error);
            // Fallback to mock data on error
            setTailors(MOCK_TAILORS);
        } finally {
            setLoading(false);
        }
    };

    const filteredTailors = tailors.filter((tailor) =>
        tailor.profiles.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background py-12 px-4 md:px-8">
            <div className="max-w-screen-xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold mb-4 border-primary/20 bg-primary/5 text-primary">
                        ✨ Browse 100+ verified tailors
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Find Your Perfect Tailor
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Browse verified professionals, view portfolios, and book instantly with transparent pricing.
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="bg-card border rounded-xl p-6 space-y-4">
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="md:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <select
                            value={cityFilter}
                            onChange={(e) => setCityFilter(e.target.value)}
                            className="px-3 py-2 border rounded-md bg-background"
                        >
                            <option value="">All Cities</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Chennai">Chennai</option>
                        </select>
                        <select
                            value={specialtyFilter}
                            onChange={(e) => setSpecialtyFilter(e.target.value)}
                            className="px-3 py-2 border rounded-md bg-background"
                        >
                            <option value="">All Specialties</option>
                            <option value="Blouse">Blouse</option>
                            <option value="Lehenga">Lehenga</option>
                            <option value="Suit">Suit</option>
                            <option value="Kurta">Kurta</option>
                        </select>
                    </div>
                </div>

                {/* Tailors Grid */}
                {loading ? (
                    <div className="text-center py-12 text-muted-foreground">Loading tailors...</div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {filteredTailors.map((tailor) => (
                            <TailorCard key={tailor.id} tailor={tailor} />
                        ))}
                    </div>
                )}

                {!loading && filteredTailors.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No tailors found. Try adjusting your filters.
                    </div>
                )}
            </div>
        </div>
    );
}

function TailorCard({ tailor }: { tailor: Tailor }) {
    return (
        <Link href={`/tailors/${tailor.id}`}>
            <div className="bg-card border rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {/* Profile Image */}
                <div className="relative h-48 bg-muted">
                    {tailor.profile_image_url ? (
                        <Image
                            src={tailor.profile_image_url}
                            alt={tailor.profiles.full_name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-4xl font-bold">
                            {tailor.profiles.full_name.charAt(0)}
                        </div>
                    )}
                    {tailor.is_verified && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1.5">
                            <Award className="h-4 w-4" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="relative p-5 space-y-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                                {tailor.profiles.full_name}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {tailor.city}
                            </div>
                        </div>
                        <button className="p-2 hover:bg-muted rounded-full transition-colors">
                            <Heart className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium text-foreground">
                                {tailor.rating_avg.toFixed(1)}
                            </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                            ({tailor.total_reviews} reviews)
                        </span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2">
                        {tailor.specialties.slice(0, 3).map((specialty) => (
                            <span
                                key={specialty}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                                {specialty}
                            </span>
                        ))}
                    </div>

                    {/* Price Tier */}
                    <div className="pt-3 border-t">
                        <span className="text-sm text-muted-foreground">Pricing: </span>
                        <span className="text-sm font-medium">{tailor.base_price_tier}</span>
                    </div>

                    {/* CTA */}
                    <Button className="w-full" size="sm">
                        View Profile
                    </Button>
                </div>
            </div>
        </Link>
    );
}
