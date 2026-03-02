import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import { LayoutGrid, List, ShoppingBag, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_cart, decrease_quantity, increase_quantity } from '@/redux/reducers/cart-slice';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';
import HeroSection from '@/components/vendor/menu/hero-section';
import SearchSection from './search-section';
import FloatCart from './float-cart';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Country {
    id: number;
    name: string;
    currency_symbol: string;
    currency_en?: string;
    currency_ar?: string;
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
}

interface MenuPageProps {
    store: Store;
    categories: Category[];
    country: Country;
    meals: Meal[];
    table: string;
}

type ViewMode = 'grid' | 'list';

// ─── Meal Grid Card ───────────────────────────────────────────────────────────
function MealGridCard({ meal, country }: { meal: Meal; country: Country }) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.meals || []);
    const inCart = cart.find((item: any) => item.id === meal.id);

    const addToCart = () => {
        dispatch(add_to_cart({ ...meal, quantity: 1 }));
        toast.success(t('menu.added_to_cart'), { position: 'top-center', duration: 2000 });
    };

    return (
        <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col">
            <div className="relative h-44 overflow-hidden bg-secondary">
                {meal.image ? (
                    <img
                        src={meal.image}
                        alt={isRTL ? meal.name_ar : meal.name_en}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                        <ShoppingBag className="w-10 h-10 text-muted-foreground/30" />
                    </div>
                )}
                {(meal.sale_price || meal.is_popular) && (
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {meal.sale_price && (
                            <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                                {t('menu.sale')}
                            </span>
                        )}
                        {meal.is_popular ? (
                            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3 fill-white" /> {t('menu.popular')}
                            </span>
                        ) : null}
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors flex-1">
                        {isRTL ? meal.name_ar : meal.name_en}
                    </h3>
                    <div className="flex flex-col items-end shrink-0">
                        {meal.sale_price ? (
                            <>
                                <span className="text-xs line-through text-muted-foreground">
                                    {isRTL ? country?.currency_ar : country?.currency_en} {meal.price}
                                </span>
                                <span className="font-bold text-primary text-sm">
                                    {isRTL ? country?.currency_ar : country?.currency_en} {meal.sale_price}
                                </span>
                            </>
                        ) : (
                            <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-sm">
                                {isRTL ? country?.currency_ar : country?.currency_en} {meal.price}
                            </span>
                        )}
                    </div>
                </div>

                <p className="text-muted-foreground text-xs line-clamp-2 flex-1 mb-3">
                    {isRTL ? meal.description_ar : meal.description_en}
                </p>

                {inCart ? (
                    <div className="flex items-center justify-between bg-secondary rounded-xl p-1">
                        <button
                            onClick={() => dispatch(decrease_quantity(meal.id))}
                            className="w-9 h-9 flex items-center justify-center bg-background rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors text-lg font-bold"
                        >
                            −
                        </button>
                        <span className="font-bold">{inCart.quantity}</span>
                        <button
                            onClick={() => dispatch(increase_quantity(meal.id))}
                            className="w-9 h-9 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-bold"
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={addToCart}
                        className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground font-medium py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        {t('menu.add_to_order')}
                    </button>
                )}
            </div>
        </div>
    );
}

// ─── Meal List Card ───────────────────────────────────────────────────────────
function MealListCard({ meal, country }: { meal: Meal; country: Country }) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.meals || []);
    const inCart = cart.find((item: any) => item.id === meal.id);

    const addToCart = () => {
        dispatch(add_to_cart({ ...meal, quantity: 1 }));
        toast.success(t('menu.added_to_cart'), { position: 'top-center', duration: 2000 });
    };

    return (
        <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 group cursor-pointer flex gap-4 p-3 items-center">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-secondary shrink-0">
                {meal.image ? (
                    <img
                        src={meal.image}
                        alt={isRTL ? meal.name_ar : meal.name_en}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                        <ShoppingBag className="w-7 h-7 text-muted-foreground/30" />
                    </div>
                )}
                {meal.is_popular ? (
                    <span className="absolute top-1 left-1 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-white" />
                    </span>
                ) : null}
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base line-clamp-1 group-hover:text-primary transition-colors">
                    {isRTL ? meal.name_ar : meal.name_en}
                </h3>
                <p className="text-muted-foreground text-xs line-clamp-2 mt-0.5">
                    {isRTL ? meal.description_ar : meal.description_en}
                </p>
                <div className="flex items-center justify-between mt-2 gap-2 flex-wrap">
                    <div>
                        {meal.sale_price ? (
                            <div className="flex items-center gap-1">
                                <span className="text-xs line-through text-muted-foreground">
                                    {isRTL ? country?.currency_ar : country?.currency_en} {meal.price}
                                </span>
                                <span className="font-bold text-primary text-sm">
                                    {isRTL ? country?.currency_ar : country?.currency_en} {meal.sale_price}
                                </span>
                            </div>
                        ) : (
                            <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg text-sm">
                                {isRTL ? country?.currency_ar : country?.currency_en} {meal.price}
                            </span>
                        )}
                    </div>

                    {inCart ? (
                        <div className="flex items-center gap-1 bg-secondary rounded-xl p-0.5">
                            <button
                                onClick={() => dispatch(decrease_quantity(meal.id))}
                                className="w-7 h-7 flex items-center justify-center bg-background rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors text-sm font-bold"
                            >
                                −
                            </button>
                            <span className="font-bold text-sm w-5 text-center">{inCart.quantity}</span>
                            <button
                                onClick={() => dispatch(increase_quantity(meal.id))}
                                className="w-7 h-7 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-bold"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={addToCart}
                            className="bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground font-medium py-1.5 px-3 rounded-xl transition-all duration-300 flex items-center gap-1.5 text-xs"
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            {t('menu.add_to_order')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MenuPage({ store, categories, country, meals, table }: MenuPageProps) {
    const { i18n, t } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const mealsContainerRef = useRef<HTMLDivElement>(null);

    const filteredMeals = selectedCategory
        ? meals.filter((m) => m.category_id === selectedCategory)
        : meals;

    // GSAP: animate meals out → update → animate in
    const animateMeals = useCallback((categoryId: number | null) => {
        const container = mealsContainerRef.current;
        if (!container) return;

        gsap.to(container.children, {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.2,
            stagger: 0.03,
            ease: 'power2.in',
            onComplete: () => setSelectedCategory(categoryId),
        });
    }, []);

    // Animate in when filteredMeals changes
    useEffect(() => {
        const container = mealsContainerRef.current;
        if (!container) return;

        gsap.fromTo(
            container.children,
            { opacity: 0, y: 24, scale: 0.96 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.35,
                stagger: 0.05,
                ease: 'power3.out',
            }
        );
    }, [filteredMeals, viewMode]);

    const handleCategoryClick = (categoryId: number | null) => {
        if (categoryId === selectedCategory) return;
        animateMeals(categoryId);
    };

    const getCategoryName = (cat: Category) =>
        isRTL ? cat.name_ar : cat.name_en;

    return (
        <div className="min-h-screen bg-background pb-28">
            <Head title={`${store.name} - Menu`} />

            <HeroSection store={store} table={table} />
            <SearchSection />

            {/* ── Category Filter Bar ───────────────────────────────────────── */}
            <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
                        {/* All button */}
                        <button
                            onClick={() => handleCategoryClick(null)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shrink-0 ${selectedCategory === null
                                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                                }`}
                        >
                            {t('menu.all')}
                        </button>

                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shrink-0 ${selectedCategory === category.id
                                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                                    }`}
                            >
                                {category.image && (
                                    <img
                                        src={category.image}
                                        alt={getCategoryName(category)}
                                        className="w-6 h-6 rounded-full object-cover"
                                    />
                                )}
                                {getCategoryName(category)}
                                {category.meals_count !== undefined && (
                                    <span
                                        className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${selectedCategory === category.id
                                                ? 'bg-white/20 text-primary-foreground'
                                                : 'bg-muted text-muted-foreground'
                                            }`}
                                    >
                                        {category.meals_count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Meals Section ─────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 py-6">
                {/* Header row: count + view toggle */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 bg-primary rounded-full" />
                        <h2 className="font-bold text-lg">
                            {selectedCategory
                                ? getCategoryName(categories.find((c) => c.id === selectedCategory)!)
                                : t('menu.all_meals')}
                        </h2>
                        <span className="text-xs text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
                            {filteredMeals.length}
                        </span>
                    </div>

                    {/* Grid / List toggle */}
                    <div className="flex items-center bg-secondary rounded-xl p-1 gap-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                            title={t('menu.grid_view')}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list'
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                            title={t('menu.list_view')}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Meals grid / list */}
                {filteredMeals.length > 0 ? (
                    <div
                        ref={mealsContainerRef}
                        className={
                            viewMode === 'grid'
                                ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                                : 'flex flex-col gap-3'
                        }
                    >
                        {filteredMeals.map((meal) =>
                            viewMode === 'grid' ? (
                                <MealGridCard key={meal.id} meal={meal} country={country} />
                            ) : (
                                <MealListCard key={meal.id} meal={meal} country={country} />
                            )
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                        <h3 className="font-semibold text-lg text-muted-foreground">{t('menu.no_items_found')}</h3>
                        <p className="text-sm text-muted-foreground/60 mt-1">{t('menu.adjust_filters')}</p>
                    </div>
                )}
            </div>

            <FloatCart store={store} table={table} />
        </div>
    );
}
