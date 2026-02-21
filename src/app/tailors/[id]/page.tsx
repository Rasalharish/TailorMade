"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Award, Heart, Calendar, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TailorProfile {
    id: string;
    bio: string;
    specialties: string[];
    years_of_experience: number;
    city: string;
    profile_image_url: string | null;
    cover_image_url: string | null;
    is_verified: boolean;
    rating_avg: number;
    total_reviews: number;
    total_orders: number;
    base_price_tier: string;
    profiles: {
        full_name: string;
    };
}

interface PortfolioItem {
    id: string;
    image_url: string;
    garment_type: string;
    tags: string[];
    description: string;
    likes_count: number;
}

interface Review {
    id: string;
    rating: number;
    review_text: string;
    photos: string[];
    created_at: string;
    profiles: {
        full_name: string;
    };
}

export default function TailorProfilePage({ params }: { params: { id: string } }) {
    const [tailor, setTailor] = useState<TailorProfile | null>(null);
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetchTailorProfile();
    }, [params.id]);

    const fetchTailorProfile = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/tailors/${params.id}`);
            const data = await response.json();
            setTailor(data.tailor);
            setPortfolio(data.portfolio || []);
            setReviews(data.reviews || []);
        } catch (error) {
            console.error("Failed to fetch tailor profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // TODO: Call API to add/remove favorite
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!tailor) {
        return <div className="min-h-screen flex items-center justify-center">Tailor not found</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Cover Image */}
            <div className="relative h-64 bg-gradient-to-r from-primary/20 to-primary/5">
                {tailor.cover_image_url && (
                    <Image src={tailor.cover_image_url} alt="Cover" fill className="object-cover" />
                )}
            </div>

            {/* Profile Header */}
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 -mt-24 pb-8">
                <div className="bg-card border rounded-xl p-6 space-y-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Profile Image */}
                        <div className="relative shrink-0">
                            <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-muted">
                                {tailor.profile_image_url ? (
                                    <Image
                                        src={tailor.profile_image_url}
                                        alt={tailor.profiles.full_name}
                                        width={128}
                                        height={128}
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-4xl font-bold">
                                        {tailor.profiles.full_name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            {tailor.is_verified && (
                                <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2">
                                    <Award className="h-5 w-5" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-serif font-bold">{tailor.profiles.full_name}</h1>
                                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                        <MapPin className="h-4 w-4" />
                                        {tailor.city} • {tailor.years_of_experience} years experience
                                    </div>
                                </div>
                                <Button
                                    variant={isFavorite ? "default" : "outline"}
                                    size="sm"
                                    onClick={toggleFavorite}
                                    className="gap-2"
                                >
                                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                                    {isFavorite ? "Saved" : "Save"}
                                </Button>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star className="h-5 w-5 fill-current" />
                                        <span className="text-lg font-bold text-foreground">
                                            {tailor.rating_avg.toFixed(1)}
                                        </span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        ({tailor.total_reviews} reviews)
                                    </span>
                                </div>
                                <div className="h-4 w-px bg-border" />
                                <span className="text-sm text-muted-foreground">
                                    {tailor.total_orders} orders completed
                                </span>
                            </div>

                            {/* Specialties */}
                            <div className="flex flex-wrap gap-2">
                                {tailor.specialties.map((specialty) => (
                                    <span
                                        key={specialty}
                                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                                    >
                                        {specialty}
                                    </span>
                                ))}
                            </div>

                            {/* Bio */}
                            <p className="text-muted-foreground">{tailor.bio}</p>

                            {/* CTAs */}
                            <div className="flex gap-3 pt-2">
                                <Link href={`/book?tailor=${tailor.id}`} className="flex-1 md:flex-none">
                                    <Button size="lg" className="w-full md:w-auto gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Book Now
                                    </Button>
                                </Link>
                                <Button variant="outline" size="lg" className="gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-8">
                    <Tabs defaultValue="portfolio" className="w-full">
                        <TabsList className="grid w-full max-w-md grid-cols-2">
                            <TabsTrigger value="portfolio">Portfolio ({portfolio.length})</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                        </TabsList>

                        {/* Portfolio Tab */}
                        <TabsContent value="portfolio" className="mt-6">
                            {portfolio.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    No portfolio items yet
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-3 gap-4">
                                    {portfolio.map((item) => (
                                        <div key={item.id} className="group relative rounded-xl overflow-hidden border cursor-pointer hover:border-primary transition-colors">
                                            <div className="relative aspect-square bg-muted">
                                                <Image
                                                    src={item.image_url}
                                                    alt={item.description || item.garment_type}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-4 space-y-2">
                                                <h3 className="font-medium">{item.garment_type}</h3>
                                                {item.description && (
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {item.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Heart className="h-4 w-4" />
                                                    {item.likes_count} likes
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* Reviews Tab */}
                        <TabsContent value="reviews" className="mt-6">
                            {reviews.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    No reviews yet
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="bg-card border rounded-xl p-6 space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-medium">{review.profiles.full_name}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex items-center gap-1 text-yellow-500">
                                                            {Array.from({ length: review.rating }).map((_, i) => (
                                                                <Star key={i} className="h-4 w-4 fill-current" />
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(review.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground">{review.review_text}</p>
                                            {review.photos && review.photos.length > 0 && (
                                                <div className="flex gap-2">
                                                    {review.photos.map((photo, idx) => (
                                                        <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border">
                                                            <Image src={photo} alt="Review" fill className="object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
