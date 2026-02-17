import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, ChevronRight, Plus, Minus, Trash2, X } from 'lucide-react';
import { Link } from '@inertiajs/react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
} from '@/components/ui/sheet';
import { increase_quantity, decrease_quantity, remove_from_cart } from '@/redux/reducers/cart-slice';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';


export default function FloatCart() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.meals || []);
    const [isOpen, setIsOpen] = useState(false);

    // Calculate total items and price
    const totalItems = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc: number, item: any) => {
        const price = item.sale_price || item.price;
        return acc + (parseFloat(price) * item.quantity);
    }, 0);

    const getLocalized = (obj: any, field: string) => {
        const en = obj[`${field}_en`];
        const ar = obj[`${field}_ar`];
        return isRTL ? (ar || en) : (en || ar);
    };

    if (totalItems === 0) return null;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 cursor-pointer">
                    <div
                        className="bg-primary text-primary-foreground p-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-between backdrop-blur-md bg-opacity-95 border border-primary/20 max-w-md mx-auto hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg leading-tight">
                                    {totalItems} {t('menu.items')}
                                </span>
                                <span className="text-primary-foreground/80 text-sm font-medium">
                                    {totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 font-bold bg-white/20 px-4 py-2 rounded-xl text-sm">
                            {t('menu.view_order')}
                            <ChevronRight className={`w-4 h-4 ml-1 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-4xl p-0 flex flex-col bg-background/95 backdrop-blur-xl border-t border-border/50">
                <SheetHeader className="p-6 border-b border-border/50">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                            <ShoppingBag className="w-6 h-6 text-primary" />
                            {t('menu.your_order')}
                        </SheetTitle>
                        <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary">
                                <X className="w-5 h-5" />
                            </Button>
                        </SheetClose>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.map((item: any) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-card rounded-2xl border border-border shadow-sm animate-in slide-in-from-bottom-2 duration-300">
                            <div className="w-20 h-20 bg-secondary rounded-xl overflow-hidden shrink-0">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={getLocalized(item, 'name')}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        <ShoppingBag className="w-8 h-8 opacity-20" />
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-foreground line-clamp-1">
                                        {getLocalized(item, 'name')}
                                    </h3>
                                    <button
                                        onClick={() => dispatch(remove_from_cart(item.id))}
                                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-bold text-primary">
                                        {((item.sale_price || item.price) * item.quantity).toFixed(2)}
                                    </span>

                                    <div className="flex items-center gap-3 bg-secondary rounded-lg p-1">
                                        <button
                                            onClick={() => dispatch(decrease_quantity(item.id))}
                                            className="w-8 h-8 flex items-center justify-center bg-background rounded-md shadow-sm hover:scale-105 active:scale-95 transition-all text-foreground"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => dispatch(increase_quantity(item.id))}
                                            className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-md shadow-sm hover:scale-105 active:scale-95 transition-all"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 bg-background border-t border-border/50 space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-muted-foreground">
                            <span>{t('menu.subtotal')}</span>
                            <span>{totalPrice.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-xl font-bold">
                            <span>{t('menu.total')}</span>
                            <span className="text-primary">{totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <Button className="w-full py-6 text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        {t('menu.checkout')}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
