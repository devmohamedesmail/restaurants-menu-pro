import React from 'react'
import { useTranslation } from 'react-i18next'
import { ShieldCheck } from 'lucide-react'
export default function Hero() {
    const { t } = useTranslation();
    return (
        <div className="relative overflow-hidden bg-gray-100 dark:bg-black py-10">
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4 backdrop-blur-sm text-black dark:text-white">
                    <ShieldCheck className="w-4 h-4" />
                    {t('checkout.secure_checkout')}
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white">{t('checkout.title')}</h1>
                <p className="mt-2 text-sm text-black dark:text-white">{t('checkout.subtitle')}</p>
            </div>
        </div>
    )
}
