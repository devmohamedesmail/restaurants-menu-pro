import React from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Calendar, Utensils, LayoutGrid, BadgeCheck, QrCode, Globe, Lock, ShieldCheck, Smartphone } from 'lucide-react'
import { PageProps } from '@inertiajs/core';
import { Settings } from '@/types/settings';
import { usePage } from '@inertiajs/react';
interface AppPageProps extends PageProps {
    settings: Settings;
}
export default function PlanSummary({ plan }: any) {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';
    const planName = isAr ? plan.name_ar : plan.name_en;
    const planDescription = isAr ? plan.description_ar : plan.description_en;
    const { settings } = usePage<AppPageProps>().props;


    const planFeatures = [
        { icon: <Utensils className="w-4 h-4" />, label: `${plan.max_menus} ${t('plans.features.menus')}` },
        { icon: <LayoutGrid className="w-4 h-4" />, label: `${plan.max_categories} ${t('plans.features.categories')}` },
        { icon: <BadgeCheck className="w-4 h-4" />, label: `${plan.max_items} ${t('plans.features.items')}` },
        ...(plan.qr_code ? [{ icon: <QrCode className="w-4 h-4" />, label: t('plans.features.qr') }] : []),
        ...(plan.custom_domain ? [{ icon: <Globe className="w-4 h-4" />, label: t('plans.features.custom-domain') }] : []),
    ];
    return (
        <div className="lg:col-span-2 space-y-4">
            {/* Plan card */}
            <div className="relative rounded-2xl border border-border bg-card p-5 space-y-3">
                {/* Glow */}
                {/* <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl z-0 pointer-events-none" /> */}

                <div className="relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 bg-white rounded-full px-3 py-1 text-xs font-semibold text-black mb-4">
                        <Check className="w-3 h-3" />
                        {t('checkout.selected_plan')}
                    </div>

                    {/* Name */}
                    <h2 className="text-2xl font-extrabold tracking-tight">{planName}</h2>
                    <p className="mt-1 text-sm text-black dark:text-white leading-relaxed">{planDescription}</p>

                    {/* Price */}
                    <div className="mt-6 flex items-end gap-1">
                        <span className="text-5xl font-black">{i18n.language === 'ar' ? settings.currency_ar : settings.currency_en}{plan.price}</span>
                        <span className="text-black dark:text-white mb-1.5 text-sm">/ {t(`plans.interval.${plan.interval}`)}</span>
                    </div>

                    {/* Duration */}
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-black dark:text-white">
                        <Calendar className="w-3.5 h-3.5" />
                        {plan.duration_days} {t('checkout.days_duration')}
                    </div>

                    {/* Divider */}
                    <div className="my-5 border-t border-white/10" />

                    {/* Features */}
                    <ul className="space-y-2.5">
                        {planFeatures.map((f, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-sm text-black dark:text-white">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/25 text-black dark:text-white shrink-0">
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
                    <span className="font-medium">{i18n.language === 'ar' ? settings.currency_ar : settings.currency_en}{plan.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('checkout.tax')}</span>
                    <span className="font-medium">{t('checkout.tax_included')}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold">
                    <span>{t('checkout.total')}</span>
                    <span className="text-black dark:text-white">{i18n.language === 'ar' ? settings.currency_ar : settings.currency_en}{plan.price}</span>
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
    )
}
