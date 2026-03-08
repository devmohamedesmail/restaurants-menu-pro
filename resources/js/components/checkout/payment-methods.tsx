import React from 'react'
import { useTranslation } from 'react-i18next';
import {CreditCard,ChevronRight,Lock,ShieldCheck} from 'lucide-react'
import { Button } from '../ui/button';


interface PaymentMethod {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
}
export default function PaymentMethods({selectedPayment,setSelectedPayment,plan}:any) {
    const { t } = useTranslation();

       const paymentMethods: PaymentMethod[] = [
        {
            id: 'card',
            name: t('checkout.payment.card'),
            description: t('checkout.payment.card_desc'),
            icon: <CreditCard className="w-6 h-6" />,
            badge: t('checkout.payment.popular'),
        },
        {
            id: 'paypal',
            name: t('checkout.payment.paypal'),
            description: t('checkout.payment.paypal_desc'),
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.286 5.12-6.83 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.504l.97-6.148h1.572c4.194 0 7.08-1.683 7.986-6.548.367-1.96.18-3.6-.383-4.826z" />
                    <path d="M9.07 7.01c.12-.786.65-1.44 1.4-1.728.332-.131.695-.2 1.087-.2h5.175c.614 0 1.186.04 1.701.128A6.357 6.357 0 0 1 20.068 8.478c-.9-1.6-2.6-2.383-5.093-2.383H9.8a1.6 1.6 0 0 0-1.582 1.352l-.857 5.43C7.97 10.082 8.66 8.02 9.07 7.01z" />
                    <path d="M5.888 3.66A1.6 1.6 0 0 1 7.47 2.31h7.198c2.79 0 4.76.9 5.4 2.87a6.657 6.657 0 0 0-.998-.498 8.61 8.61 0 0 0-1.7-.128H12.97c-1.21 0-2.234.433-2.94 1.216C9.33 6.564 9 7.42 8.84 8.428L7.982 13.855A1.6 1.6 0 0 1 6.4 12.503H5.888V3.66z" />
                </svg>
            ),
        },
        {
            id: 'bank',
            name: t('checkout.payment.bank'),
            description: t('checkout.payment.bank_desc'),
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10h20v2H2zm1 4h2v5H3zm4 0h2v5H7zm4 0h2v5h-2zm4 0h2v5h-2zm4 0h2v5h-2zM12 1L2 6v2h20V6z" />
                </svg>
            ),
        },
        {
            id: 'crypto',
            name: t('checkout.payment.crypto'),
            description: t('checkout.payment.crypto_desc'),
            badge: t('checkout.payment.new'),
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                </svg>
            ),
        },
    ];
    return (
        <div className="lg:col-span-3 space-y-6">
            <div>
                <h2 className="text-xl font-bold">{t('checkout.payment_method')}</h2>
                <p className="text-sm text-muted-foreground mt-1">{t('checkout.payment_method_desc')}</p>
            </div>

            {/* Payment option list */}
            <div className="space-y-3">
                {paymentMethods.map((method) => {
                    const isSelected = selectedPayment === method.id;
                    return (
                        <label
                            key={method.id}
                            htmlFor={`payment-${method.id}`}
                            className={`
                                            group relative flex items-center gap-4 rounded-2xl border-2 p-4 cursor-pointer
                                            transition-all duration-200
                                            ${isSelected
                                    ? 'border-primary bg-indigo-500/5 shadow-lg shadow-indigo-500/10'
                                    : 'border-border bg-card hover:border-primary/50 hover:bg-accent/30'
                                }
                                        `}
                        >
                            {/* Hidden radio */}
                            <input
                                id={`payment-${method.id}`}
                                type="radio"
                                name="payment_method"
                                value={method.id}
                                checked={isSelected}
                                onChange={() => setSelectedPayment(method.id)}
                                className="sr-only"
                            />

                            {/* Custom radio ring */}
                            <div className={`
                                            shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                                            ${isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/40 bg-transparent'}
                                        `}>
                                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>

                            {/* Icon */}
                            <div className={`
                                            flex items-center justify-center w-11 h-11 rounded-xl shrink-0 transition-all
                                            ${isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground group-hover:bg-indigo-500/10 group-hover:text-primary'}
                                        `}>
                                {method.icon}
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className={`font-semibold text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                        {method.name}
                                    </span>
                                    {method.badge && (
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold
                                                        ${method.badge === t('checkout.payment.popular')
                                                ? 'bg-indigo-100 text-primary dark:bg-indigo-900/50 dark:text-indigo-300'
                                                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                                            }`}>
                                            {method.badge}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5 truncate">{method.description}</p>
                            </div>

                            {/* Arrow */}
                            <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-indigo-500 translate-x-0.5' : 'text-muted-foreground/30'}`} />
                        </label>
                    );
                })}
            </div>

            {/* Card form (shown only when card selected) */}
            {selectedPayment === 'card' && (
                <div className="rounded-2xl border border-border bg-card p-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="font-semibold text-sm">{t('checkout.card_details')}</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">{t('checkout.card_number')}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pr-10 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                />
                                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">{t('checkout.expiry')}</label>
                                <input
                                    type="text"
                                    placeholder="MM / YY"
                                    maxLength={7}
                                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">{t('checkout.cvv')}</label>
                                <input
                                    type="password"
                                    placeholder="•••"
                                    maxLength={4}
                                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1">{t('checkout.card_holder')}</label>
                            <input
                                type="text"
                                placeholder={t('checkout.card_holder_placeholder')}
                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* CTA */}

            <Button className='w-full px-6 py-4'>
                <Lock className="w-4 h-4" />
                {t('checkout.pay_now', { amount: `$${plan.price}` })}
            </Button>

            <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                {t('checkout.secure_note')}
            </p>
        </div>
    )
}
