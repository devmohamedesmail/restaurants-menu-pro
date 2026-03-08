
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
interface Category {
    id: number;
    name_ar: string;
    name_en: string;
    image: string | null;
    meals_count?: number;
}
export default function CategoriesSection({ categories, selectedCategory,handleCategoryClick }: any) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
   



   
    const getCategoryName = (cat: Category) => isRTL ? cat.name_ar : cat.name_en;
    return (
        <div className="sticky  mx-auto top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border shadow-sm px-4 py-3 overflow-clip">
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
                                ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                            }`}
                    >
                        {t('menu.all')}
                    </button>
                </SwiperSlide>

                {categories.map((category: any) => (
                    <SwiperSlide key={category.id} style={{ width: 'auto' }}>
                        <button
                            onClick={() => handleCategoryClick(category.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
                                            whitespace-nowrap transition-all duration-300
                                            ${selectedCategory === category.id
                                    ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
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
                                        ? 'bg-white/20 text-white'
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
    )
}
