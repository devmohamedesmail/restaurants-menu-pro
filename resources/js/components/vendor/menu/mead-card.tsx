import { add_to_cart, decrease_quantity, increase_quantity, remove_from_cart } from '@/redux/reducers/cart-slice';
import { Heart, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';


interface Meal {
    id: number;
    name_en: string;
    name_ar: string;
    description_en?: string;
    description_ar?: string;
    image: string;
    price: number;
    sale_price?: number;
    category: {
        id: number;
        name_en: string;
        name_ar: string;
    };
}

interface CartItem extends Meal {
    quantity: number;
}
export default function MealCard({ meal, country }: any) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';



    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.meals || []);

    const inCart = cart.find((item: any) => item.id === meal.id);

    const addToCart = (meal: any) => {
        dispatch(add_to_cart({ ...meal, quantity: 1 }));
        toast.success(t('Meal added to cart'), {
            position: "top-center",
            duration: 2000,
        });
    };

    // const removeFromCartHandler = (mealId: number) => {
    //     dispatch(remove_from_cart(mealId))
    // }

    const updateQuantity = (mealId: number, newQuantity: number) => {
        const currentItem = cart.find((item: CartItem) => item.id === mealId);
        if (!currentItem) return;

        if (newQuantity > currentItem.quantity) {
            // Increase quantity
            dispatch(increase_quantity(mealId));
        } else if (newQuantity < currentItem.quantity) {
            // Decrease quantity
            dispatch(decrease_quantity(mealId));
        }
    };
    return (
        <div key={meal.id} className="min-w-70 w-70 bg-card rounded-3xl p-4 border border-border shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 group cursor-pointer">
            <div className="relative h-40 rounded-2xl overflow-hidden mb-4 bg-secondary">
                {meal.image ? (
                    <img
                        src={meal.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                        <ShoppingBag className="w-10 h-10 text-muted-foreground/30" />
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-background/90 backdrop-blur p-2 rounded-full shadow-sm text-primary">
                    <Heart className="w-4 h-4" />
                </div>
            </div>
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                        {isRTL ? meal.name_ar : meal.name_en}
                    </h3>
                    <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg text-sm whitespace-nowrap">
                        {isRTL ? country?.currency_ar : country?.currency_en}
                        {meal.sale ? meal.sale : meal.price}
                    </span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
                    {isRTL ? meal.description_ar : meal.description_en}
                </p>
                {inCart ? (
                    <div className="flex items-center justify-between w-full bg-secondary rounded-xl p-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(decrease_quantity(meal.id));
                            }}
                            className="w-10 h-10 flex items-center justify-center bg-background rounded-lg text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors shadow-sm"
                        >
                            -
                        </button>
                        <span className="font-bold text-lg">{inCart.quantity}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(increase_quantity(meal.id));
                            }}
                            className="w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(meal);
                        }}
                        className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground font-medium py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {t('common.add_to_order')}
                    </button>
                )}
            </div>
        </div>
    )
}
