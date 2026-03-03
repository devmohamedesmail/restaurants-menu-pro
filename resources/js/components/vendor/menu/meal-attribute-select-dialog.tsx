import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { add_to_cart } from '@/redux/reducers/cart-slice';
import toast from 'react-hot-toast';
import { ShoppingBag, Check, ChevronDown } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Meal, MealAttribute, AttributeValue, Country } from '@/types/menu';

interface Props {
    open: boolean;
    onClose: () => void;
    meal: Meal;
    country: Country;
}

export default function MealAttributeSelectDialog({ open, onClose, meal, country }: Props) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const dispatch = useDispatch();

    const attributes: MealAttribute[] = meal.attributes ?? [];

    // selected: { [attribute_id]: AttributeValue }
    const [selected, setSelected] = useState<Record<number, AttributeValue>>({});
    const [errors, setErrors] = useState<Record<number, boolean>>({});

    /* ── Computed total price ─────────────────────────────────── */
    const extraPrice = useMemo(() =>
        Object.values(selected).reduce((sum, v) => sum + Number(v.price), 0),
        [selected]
    );
    const basePrice = Number(meal.sale_price || meal.price);
    const totalPrice = basePrice + extraPrice;

    const currencyLabel = isRTL ? country?.currency_ar : country?.currency_en;

    /* ── Select a value ─────────────────────────────────────────── */
    const pickValue = (attr: MealAttribute, value: AttributeValue) => {
        setSelected(prev => ({ ...prev, [attr.id]: value }));
        setErrors(prev => ({ ...prev, [attr.id]: false }));
    };

    /* ── Validate + add to cart ─────────────────────────────── */
    const handleAdd = () => {
        const newErrors: Record<number, boolean> = {};
        let hasError = false;

        attributes.forEach(attr => {
            if (attr.values?.length > 0 && !selected[attr.id]) {
                newErrors[attr.id] = true;
                hasError = true;
            }
        });

        setErrors(newErrors);
        if (hasError) return;

        // Build cart item with selections embedded
        dispatch(add_to_cart({
            ...meal,
            quantity: 1,
            selected_attributes: selected,
            computed_price: totalPrice,
        } as any));

        toast.success(t('menu.added_to_cart'), { position: 'top-center', duration: 2000 });
        setSelected({});
        setErrors({});
        onClose();
    };

    const getAttrName = (attr: MealAttribute) => isRTL ? (attr as any).name_ar : attr.name_en;

    return (
        <Dialog open={open} onOpenChange={v => !v && onClose()}>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        <span className="line-clamp-1">
                            {isRTL ? meal.name_ar : meal.name_en}
                        </span>
                    </DialogTitle>
                </DialogHeader>

                {/* ── Meal image + price ─────────────────────────── */}
                {meal.image && (
                    <div className="relative h-40 rounded-xl overflow-hidden bg-secondary mb-2">
                        <img
                            src={meal.image}
                            alt={isRTL ? meal.name_ar : meal.name_en}
                            className="w-full h-full object-cover"
                        />
                        {meal.sale_price && (
                            <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                                {t('menu.sale')}
                            </span>
                        )}
                    </div>
                )}

                {/* ── Attribute selectors ────────────────────────── */}
                <div className="space-y-5">
                    {attributes.map(attr => (
                        <div key={attr.id}>
                            <div className="flex items-center gap-1.5 mb-2">
                                <ChevronDown className="w-4 h-4 text-primary" />
                                <span className="font-semibold text-sm">
                                    {getAttrName(attr)}
                                </span>
                                {errors[attr.id] && (
                                    <span className="text-destructive text-xs ml-auto">
                                        {t('menu.required')}
                                    </span>
                                )}
                            </div>

                            {/* Value pills */}
                            <div className="flex flex-wrap gap-2">
                                {attr.values?.map(val => {
                                    const isSelected = selected[attr.id]?.id === val.id;
                                    return (
                                        <button
                                            key={val.id}
                                            onClick={() => pickValue(attr, val)}
                                            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-200
                                                ${isSelected
                                                    ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25'
                                                    : errors[attr.id]
                                                        ? 'border-destructive/60 bg-destructive/5 text-foreground hover:border-primary'
                                                        : 'border-border bg-secondary text-foreground hover:border-primary hover:bg-secondary/70'
                                                }`}
                                        >
                                            {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                                            <span>{val.value}</span>
                                            {Number(val.price) > 0 && (
                                                <span className={`text-xs ${isSelected ? 'text-primary-foreground/80' : 'text-emerald-600'}`}>
                                                    +{currencyLabel} {Number(val.price).toFixed(2)}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Footer: total + add ────────────────────────── */}
                <div className="border-t pt-4 mt-2 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs text-muted-foreground">{t('menu.total')}</p>
                        <p className="font-bold text-lg text-primary">
                            {currencyLabel} {totalPrice.toFixed(2)}
                        </p>
                        {extraPrice > 0 && (
                            <p className="text-xs text-muted-foreground">
                                {t('menu.includes_extras')} +{currencyLabel} {extraPrice.toFixed(2)}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all duration-200 shadow-md shadow-primary/30"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        {t('menu.add_to_order')}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
