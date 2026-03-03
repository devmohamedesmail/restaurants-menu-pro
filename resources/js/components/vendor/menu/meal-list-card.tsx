

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_cart, decrease_quantity, increase_quantity } from '@/redux/reducers/cart-slice';
import { ShoppingBag, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Country, Meal } from '@/types/menu';







export default function MealListCard({ meal, country }: { meal: Meal; country: Country }) {
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
    )
}
