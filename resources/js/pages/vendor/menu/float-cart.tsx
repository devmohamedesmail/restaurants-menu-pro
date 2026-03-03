import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingBag, ChevronRight, Plus, Minus, Trash2, X, MapPin, Phone, User, Navigation } from 'lucide-react';
import { router } from '@inertiajs/react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose
} from '@/components/ui/sheet';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { increase_quantity, decrease_quantity, remove_from_cart, reset_cart } from '@/redux/reducers/cart-slice';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import toast from 'react-hot-toast';

interface DeliveryInfo {
    name: string;
    phone: string;
    address: string;
    location: string;
    note: string;
}


declare function route(name: string, params?: any): string
export default function FloatCart({ store, table }: any) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.meals || []);
    const [isOpen, setIsOpen] = useState(false);
    const [showDeliveryModal, setShowDeliveryModal] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        name: '',
        phone: '',
        address: '',
        location: '',
        note: '',
    });
    const [errors, setErrors] = useState<Partial<DeliveryInfo>>({});


    console.log("cart", cart);

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

    const validateDelivery = (): boolean => {
        const newErrors: Partial<DeliveryInfo> = {};
        if (!deliveryInfo.name.trim()) newErrors.name = t('common.required-field');
        if (!deliveryInfo.phone.trim()) newErrors.phone = t('common.required-field');
        if (!deliveryInfo.address.trim()) newErrors.address = t('common.required-field');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitOrder = (extraData: Partial<DeliveryInfo> = {}) => {
        setIsSending(true);

        const orderItems = cart.map((item: any) => ({
            id: item.id,
            name_en: item.name_en,
            name_ar: item.name_ar,
            quantity: item.quantity,
            price: item.sale_price || item.price,
        }));

        const payload: Record<string, any> = {
            store_id: store.id,
            order: JSON.stringify(orderItems),
            total: totalPrice.toFixed(2),
            note: extraData.note || '',
        };

        // Table order
        if (table) {
            payload.table = table;
        } else {
            // Delivery order
            payload.name = extraData.name || deliveryInfo.name;
            payload.phone = extraData.phone || deliveryInfo.phone;
            payload.address = extraData.address || deliveryInfo.address;
            payload.location = extraData.location || deliveryInfo.location;
        }

        router.post(route('store.create.order'), payload, {
            onSuccess: () => {
                dispatch(reset_cart());
                setIsOpen(false);
                setShowDeliveryModal(false);
                setDeliveryInfo({ name: '', phone: '', address: '', location: '', note: '' });
                toast.success(t('menu.order_placed_successfully'));
            },
            onError: () => {
                // errors handled by backend redirect
            },
            onFinish: () => {
                setIsSending(false);
            },
        });
    };

    const sendOrder = () => {
        // If table is provided → table order, submit directly
        if (table) {
            submitOrder();
        } else {
            // No table → delivery order, show modal first
            setShowDeliveryModal(true);
        }
    };

    const handleDeliverySubmit = () => {
        if (!validateDelivery()) return;
        submitOrder(deliveryInfo);
    };

    if (totalItems === 0) return null;

    return (
        <>
            {/* Delivery Info Modal */}
            <Dialog open={showDeliveryModal} onOpenChange={setShowDeliveryModal}>
                <DialogContent className="max-w-md" dir={isRTL ? 'rtl' : 'ltr'}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl">
                            <MapPin className="w-5 h-5 text-primary" />
                            {t('menu.delivery_info')}
                        </DialogTitle>
                        <DialogDescription>
                            {t('menu.delivery_info_desc')}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <Label htmlFor="delivery-name" className="flex items-center gap-1.5">
                                <User className="w-4 h-4 text-muted-foreground" />
                                {t('auth.name')} *
                            </Label>
                            <Input
                                id="delivery-name"
                                value={deliveryInfo.name}
                                onChange={e => setDeliveryInfo(p => ({ ...p, name: e.target.value }))}
                                placeholder={t('auth.name-placeholder')}
                                className={errors.name ? 'border-destructive' : ''}
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                            <Label htmlFor="delivery-phone" className="flex items-center gap-1.5">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                {t('common.phone')} *
                            </Label>
                            <Input
                                id="delivery-phone"
                                type="tel"
                                value={deliveryInfo.phone}
                                onChange={e => setDeliveryInfo(p => ({ ...p, phone: e.target.value }))}
                                placeholder="+966 5xx xxx xxx"
                                className={errors.phone ? 'border-destructive' : ''}
                            />
                            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                        </div>

                        {/* Address */}
                        <div className="space-y-1.5">
                            <Label htmlFor="delivery-address" className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                {t('common.address')} *
                            </Label>
                            <Textarea
                                id="delivery-address"
                                value={deliveryInfo.address}
                                onChange={e => setDeliveryInfo(p => ({ ...p, address: e.target.value }))}
                                placeholder={t('stores.enter-store-address')}
                                rows={2}
                                className={errors.address ? 'border-destructive' : ''}
                            />
                            {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
                        </div>

                        {/* Location (optional) */}
                        <div className="space-y-1.5">
                            <Label htmlFor="delivery-location" className="flex items-center gap-1.5">
                                <Navigation className="w-4 h-4 text-muted-foreground" />
                                {t('menu.location_link')}
                                <span className="text-muted-foreground text-xs">({t('auth.optional')})</span>
                            </Label>
                            <Input
                                id="delivery-location"
                                value={deliveryInfo.location}
                                onChange={e => setDeliveryInfo(p => ({ ...p, location: e.target.value }))}
                                placeholder="https://maps.google.com/..."
                            />
                        </div>

                        {/* Note (optional) */}
                        <div className="space-y-1.5">
                            <Label htmlFor="delivery-note">
                                {t('menu.note')}
                                <span className="text-muted-foreground text-xs ms-1">({t('auth.optional')})</span>
                            </Label>
                            <Textarea
                                id="delivery-note"
                                value={deliveryInfo.note}
                                onChange={e => setDeliveryInfo(p => ({ ...p, note: e.target.value }))}
                                placeholder={t('menu.note_placeholder')}
                                rows={2}
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setShowDeliveryModal(false)}
                            disabled={isSending}
                        >
                            {t('dashboard.cancel')}
                        </Button>
                        <Button
                            onClick={handleDeliverySubmit}
                            disabled={isSending}
                            className="shadow-lg shadow-primary/20"
                        >
                            {isSending ? t('common.saving') : t('menu.send_order')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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

                        <Button
                            onClick={() => sendOrder()}
                            disabled={isSending}
                            className="w-full py-6 text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            {isSending ? t('common.saving') : t('menu.send_order')}
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
