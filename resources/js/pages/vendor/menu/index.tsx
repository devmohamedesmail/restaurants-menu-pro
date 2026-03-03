import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import { LayoutGrid, List, ShoppingBag, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_cart, decrease_quantity, increase_quantity } from '@/redux/reducers/cart-slice';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import HeroSection from '@/components/vendor/menu/hero-section';
import SearchSection from './search-section';
import FloatCart from './float-cart';
import MealListCard from '@/components/vendor/menu/meal-list-card';
import MealGridCard from '@/components/vendor/menu/meal-grid-card';
import { Category, MenuPageProps } from '@/types/menu';

type ViewMode = 'grid' | 'list';


export default function MenuPage({ store, categories, country, meals, table }: MenuPageProps) {
    const { i18n, t } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const mealsContainerRef = useRef<HTMLDivElement>(null);
    const isAnimating = useRef(false);
    const pendingCategoryRef = useRef<number | null | undefined>(undefined);
    const filteredMeals = selectedCategory
        ? meals.filter((m) => m.category_id === selectedCategory)
        : meals;

    // ── Animate cards IN after state change ──────────────────────────────────
    useEffect(() => {
        const container = mealsContainerRef.current;
        isAnimating.current = false;
        if (!container || container.children.length === 0) return;

        gsap.fromTo(
            container.children,
            { opacity: 0, y: 20, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.04, ease: 'power3.out' }
        );
    }, [filteredMeals, viewMode]);

    // ── Category click handler ────────────────────────────────────────────────
    const handleCategoryClick = useCallback((categoryId: number | null) => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        pendingCategoryRef.current = categoryId;

        const container = mealsContainerRef.current;

        const applyChange = () => {
            if (pendingCategoryRef.current === categoryId) {
                setSelectedCategory(categoryId);
            }
            isAnimating.current = false;
        };

        if (!container || container.children.length === 0) {
            applyChange();
            return;
        }

        gsap.to(container.children, {
            opacity: 0,
            y: -16,
            scale: 0.95,
            duration: 0.18,
            stagger: 0.015,
            ease: 'power2.in',
            onComplete: applyChange,
        });

        const timer = setTimeout(() => {
            if (isAnimating.current) applyChange();
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    const getCategoryName = (cat: Category) => isRTL ? cat.name_ar : cat.name_en;

    return (
        <div className="min-h-screen bg-background pb-28">
            <Head title={`${store.name} - Menu`} />

            <HeroSection store={store} table={table} />
            <SearchSection />

            {/* ── Category Swiper Bar ───────────────────────────────────── */}
            <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border shadow-sm px-4 py-3 overflow-clip">
                <Swiper
                    modules={[FreeMode]}
                    freeMode={{
                        enabled: true,
                        momentum: true,
                        momentumRatio: 0.6,
                        momentumVelocityRatio: 0.6,
                    }}
                    slidesPerView="auto"
                    spaceBetween={8}
                    grabCursor={true}
                    className="overflow-visible!"
                >
                  
                    <SwiperSlide style={{ width: 'auto' }}>
                        <button
                            onClick={() => handleCategoryClick(null)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
                                        whitespace-nowrap transition-all duration-300
                                        ${selectedCategory === null
                                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                                }`}
                        >
                            {t('menu.all')}
                        </button>
                    </SwiperSlide>

                    {categories.map((category) => (
                        <SwiperSlide key={category.id} style={{ width: 'auto'  }}>
                            <button
                                onClick={() => handleCategoryClick(category.id)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
                                            whitespace-nowrap transition-all duration-300
                                            ${selectedCategory === category.id
                                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                                    }`}
                            >
                                {category.image && (
                                    <img
                                        src={category.image}
                                        alt={getCategoryName(category)}
                                        className="w-5 h-5 rounded-full object-cover shrink-0"
                                    />
                                )}
                                {getCategoryName(category)}
                                {category.meals_count !== undefined && (
                                    <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium shrink-0
                                        ${selectedCategory === category.id
                                            ? 'bg-white/20 text-primary-foreground'
                                            : 'bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        {category.meals_count}
                                    </span>
                                )}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* ── Meals Section ────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 py-6">

                {/* Header: title + count + view toggle */}
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
                            title={t('menu.grid_view')}
                            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            title={t('menu.list_view')}
                            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Cards */}
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
