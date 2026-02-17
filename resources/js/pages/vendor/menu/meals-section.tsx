import React from 'react'
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Heart } from 'lucide-react';
import { add_to_cart, decrease_quantity, increase_quantity } from '@/redux/reducers/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import MealCard from '@/components/vendor/menu/mead-card';
export default function MealsSection({ meals, categories, country }: {
    meals: any[];
    categories: any[];
    country: any;
}) {
    const { t, i18n } = useTranslation();








    return (
        <main className="container mx-auto  px-4 py-8 space-y-10">

            {/* Popular Meals Section - Only show if no search/filter active */}
            {meals.length > 0 && (
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-8 w-1 bg-primary rounded-full" />
                        <h2 className="text-2xl font-bold">{t('menu.popular_choices')}</h2>
                    </div>
                    <div className="overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-4 scrollbar-hide">
                        {meals.map((meal) => (
                            <MealCard key={meal.id} meal={meal} country={country} />
                        ))}
                    </div>
                </section>
            )}



        </main>
    )
}
