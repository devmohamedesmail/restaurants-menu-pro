import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function FloatCart() {
    const { t } = useTranslation();
    const cart = useSelector((state: any) => state.cart.meals || []);

    // Calculate total items and price
    const totalItems = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc: number, item: any) => {
        const price = item.sale_price || item.price
        return acc + (parseFloat(price) * item.quantity);
    }, 0);

    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <Link
                href="/cart"
                className="bg-primary text-primary-foreground p-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-between backdrop-blur-md bg-opacity-95 border border-primary/20 max-w-md mx-auto hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-tight">
                            {totalItems} {t('Items')}
                        </span>
                        <span className="text-primary-foreground/80 text-sm font-medium">
                            {totalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1 font-bold bg-white/20 px-4 py-2 rounded-xl text-sm">
                    {t('View Order')}
                    <ChevronRight className="w-4 h-4 ml-1" />
                </div>
            </Link>
        </div>
    );
}
