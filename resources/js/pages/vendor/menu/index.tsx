import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Search,
    MapPin,
    Phone,
    Clock,
    Star,
    ChevronRight,
    ShoppingBag,
    Info,
    Share2,
    Heart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import HeroSection from '@/components/vendor/menu/hero-section';
import CategoriesSection from './categories-section';
import MealsSection from './meals-section';
import FloatCart from './float-cart';
import SearchSection from './search-section';

// Types
interface Country {
    id: number;
    name: string;
    currency_symbol: string;
}

interface Category {
    id: number;
    name_ar: string;
    name_en: string;
    image: string | null;
    meals_count?: number;
}

interface Meal {
    id: number;
    name_ar: string;
    name_en: string;
    description_ar: string | null;
    description_en: string | null;
    price: string | number;
    sale_price: string | number | null;
    image: string | null;
    category_id: number;
    is_popular?: number | boolean;
    // Add other fields as necessary
}

interface Store {
    id: number;
    name: string;
    slug: string;
    description: string;
    banner: string | null;
    image: string | null;
    address: string | null;
    phone: string | null;
    is_verified: number;
    // Add other fields from backend
}

interface MenuPageProps {
    store: Store;
    categories: Category[];
    country: Country;
    meals: Meal[];
}

export default function MenuPage({ store, categories, country, meals }: MenuPageProps) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

 
    const [searchQuery, setSearchQuery] = useState('');
 

    

   






 

    return (
        <div className="min-h-screen bg-background pb-20">
            <Head title={`${store.name} - Menu`} />
            <HeroSection store={store} />
            <SearchSection />
             <CategoriesSection categories={categories}  />
             <MealsSection meals={meals} categories={categories} country={country} />
             <FloatCart />
        </div>
    );
}

// End of file
