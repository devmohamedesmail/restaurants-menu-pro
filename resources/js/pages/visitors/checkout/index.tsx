import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    BadgeCheck,
    Calendar,
    Check,
    ChevronRight,
    CreditCard,
    Globe,
    LayoutGrid,
    Lock,
    QrCode,
    ShieldCheck,
    Smartphone,
    Utensils,
} from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Plan {
    id: number;
    name_en: string;
    name_ar: string;
    description_en: string;
    description_ar: string;
    price: string;
    interval: 'monthly' | 'quarterly' | 'yearly';
    duration_days: number;
    max_menus: number;
    max_categories: number;
    max_items: number;
    qr_code: number;
    custom_domain: number;
    is_active: number;
    slug: string;
}

interface PaymentMethod {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
}

// ─── Checkout Page ─────────────────────────────────────────────────────────────
export default function Checkout({ plan }: { plan: Plan }) {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';
    const [selectedPayment, setSelectedPayment] = useState<string>('card');

    const planName = isAr ? plan.name_ar : plan.name_en;
    const planDescription = isAr ? plan.description_ar : plan.description_en;

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

    const planFeatures = [
        { icon: <Utensils className="w-4 h-4" />, label: `${plan.max_menus} ${t('plans.features.menus')}` },
        { icon: <LayoutGrid className="w-4 h-4" />, label: `${plan.max_categories} ${t('plans.features.categories')}` },
        { icon: <BadgeCheck className="w-4 h-4" />, label: `${plan.max_items} ${t('plans.features.items')}` },
        ...(plan.qr_code ? [{ icon: <QrCode className="w-4 h-4" />, label: t('plans.features.qr') }] : []),
        ...(plan.custom_domain ? [{ icon: <Globe className="w-4 h-4" />, label: t('plans.features.custom-domain') }] : []),
    ];

    return (
        <div className="min-h-screen bg-background">
            <Head title={t('checkout.title')} />
            <Header />

            {/* Hero bar */}
            <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 via-violet-600 to-purple-700 py-10">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
                    <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4 backdrop-blur-sm">
                        <ShieldCheck className="w-4 h-4" />
                        {t('checkout.secure_checkout')}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold">{t('checkout.title')}</h1>
                    <p className="mt-2 text-indigo-200 text-sm">{t('checkout.subtitle')}</p>
                </div>
            </div>

            {/* Main content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                {/* Back link */}
                <Link
                    href="/plans"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t('checkout.back_to_plans')}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                    {/* ── LEFT: Plan Summary ── */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Plan card */}
                        <div className="relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-linear-to-br from-indigo-950 via-violet-950 to-purple-950 p-6 text-white shadow-2xl">
                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl z-0 pointer-events-none" />

                            <div className="relative z-10">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-1.5 bg-indigo-500/30 border border-indigo-400/30 rounded-full px-3 py-1 text-xs font-semibold text-indigo-300 mb-4">
                                    <Check className="w-3 h-3" />
                                    {t('checkout.selected_plan')}
                                </div>

                                {/* Name */}
                                <h2 className="text-2xl font-extrabold tracking-tight">{planName}</h2>
                                <p className="mt-1 text-sm text-indigo-300 leading-relaxed">{planDescription}</p>

                                {/* Price */}
                                <div className="mt-6 flex items-end gap-1">
                                    <span className="text-5xl font-black">${plan.price}</span>
                                    <span className="text-indigo-300 mb-1.5 text-sm">/ {t(`plans.interval.${plan.interval}`)}</span>
                                </div>

                                {/* Duration */}
                                <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-400">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {plan.duration_days} {t('checkout.days_duration')}
                                </div>

                                {/* Divider */}
                                <div className="my-5 border-t border-white/10" />

                                {/* Features */}
                                <ul className="space-y-2.5">
                                    {planFeatures.map((f, i) => (
                                        <li key={i} className="flex items-center gap-2.5 text-sm text-indigo-200">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/25 text-indigo-300 shrink-0">
                                                {f.icon}
                                            </span>
                                            {f.label}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
                            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">{t('checkout.order_summary')}</h3>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{planName}</span>
                                <span className="font-medium">${plan.price}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{t('checkout.tax')}</span>
                                <span className="font-medium">{t('checkout.tax_included')}</span>
                            </div>
                            <div className="border-t border-border pt-3 flex justify-between font-bold">
                                <span>{t('checkout.total')}</span>
                                <span className="text-indigo-600">${plan.price}</span>
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div className="flex gap-3 flex-wrap">
                            {[
                                { icon: <Lock className="w-4 h-4 text-green-500" />, label: t('checkout.trust.secure') },
                                { icon: <ShieldCheck className="w-4 h-4 text-blue-500" />, label: t('checkout.trust.guaranteed') },
                                { icon: <Smartphone className="w-4 h-4 text-violet-500" />, label: t('checkout.trust.instant') },
                            ].map((b, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 rounded-full px-3 py-1.5 border border-border">
                                    {b.icon} {b.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: Payment Methods ── */}
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
                                                ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-500/10'
                                                : 'border-border bg-card hover:border-indigo-400/50 hover:bg-accent/30'
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
                                            ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-muted-foreground/40 bg-transparent'}
                                        `}>
                                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                        </div>

                                        {/* Icon */}
                                        <div className={`
                                            flex items-center justify-center w-11 h-11 rounded-xl shrink-0 transition-all
                                            ${isSelected ? 'bg-indigo-500 text-white' : 'bg-muted text-muted-foreground group-hover:bg-indigo-500/10 group-hover:text-indigo-500'}
                                        `}>
                                            {method.icon}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className={`font-semibold text-sm ${isSelected ? 'text-indigo-600' : 'text-foreground'}`}>
                                                    {method.name}
                                                </span>
                                                {method.badge && (
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold
                                                        ${method.badge === t('checkout.payment.popular')
                                                            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
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
                        <button
                            type="button"
                            className="w-full relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-6 py-4 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-500/40 flex items-center justify-center gap-2"
                        >
                            <Lock className="w-4 h-4" />
                            {t('checkout.pay_now', { amount: `$${plan.price}` })}
                        </button>

                        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                            {t('checkout.secure_note')}
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
