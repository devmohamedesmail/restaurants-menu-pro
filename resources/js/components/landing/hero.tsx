import React from 'react'
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';

export default function Hero() {
    const { t } = useTranslation();
    return (
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8 animate-fade-in-up">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        <span className="text-xs sm:text-sm font-medium text-primary">{t('landing.hero.subtitle')}</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in-up delay-100">
                        <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
                            {t('landing.hero.title')}
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto animate-fade-in-up delay-200 px-4">
                        {t('landing.hero.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up delay-300 px-4">
                        <Link href={'/login'} className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-xl font-semibold text-sm sm:text-base overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-105">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {t('landing.hero.cta')}
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>

                        <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-border rounded-xl font-semibold text-sm sm:text-base hover:border-primary/50 hover:bg-primary/5 transition-all">
                            {t('landing.hero.cta_secondary')}
                        </button>
                    </div>
                </div>
            </div>

            <div className='flex justify-end items-center p-4 bg-red-500 w-full'>
                <Link href='/register/store' className='bg-primary text-white px-4 py-2 rounded-md'>Register Store</Link>
            </div>
        </section>
    )
}
