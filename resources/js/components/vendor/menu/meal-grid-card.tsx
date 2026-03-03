import { useState } from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_cart, decrease_quantity, increase_quantity } from '@/redux/reducers/cart-slice';
import toast from 'react-hot-toast';
import { Country, Meal } from '@/types/menu';
import MealAttributeSelectDialog from './meal-attribute-select-dialog';

export default function MealGridCard({ meal, country }: { meal: Meal; country: Country }) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.meals || []);
    const inCart = cart.find((item: any) => item.id === meal.id);

    const [attrDialogOpen, setAttrDialogOpen] = useState(false);

    const hasAttributes = (meal.attributes?.length ?? 0) > 0;

    const handleAddClick = () => {
        if (hasAttributes) {
            setAttrDialogOpen(true);
        } else {
            dispatch(add_to_cart({ ...meal, quantity: 1 }));
            toast.success(t('menu.added_to_cart'), { position: 'top-center', duration: 2000 });
        }
    };

    return (
        <>
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
                                <span className="bg-destructive  text-xs font-bold px-2 py-0.5 rounded-full text-white">
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
                    {/* Attributes badge */}
                    {hasAttributes && (
                        <span className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {t('menu.customizable')}
                        </span>
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

                    {inCart && !hasAttributes ? (
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
                            onClick={handleAddClick}
                            className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground font-medium py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            {t('menu.add_to_order')}
                        </button>
                    )}
                </div>
            </div>

            {hasAttributes && (
                <MealAttributeSelectDialog
                    open={attrDialogOpen}
                    onClose={() => setAttrDialogOpen(false)}
                    meal={meal}
                    country={country}
                />
            )}
        </>
    );
}
