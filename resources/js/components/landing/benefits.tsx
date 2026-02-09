import React from 'react'
import { useTranslation } from 'react-i18next';
import {
    TrendingUp,
    Image,
    Globe,
    BarChart3,
    Leaf,
    Zap,

} from 'lucide-react';
export default function Benefits() {
    const { t } = useTranslation();
    const benefits = [
        {
            icon: TrendingUp,
            key: 'cost_effective'
        },
        {
            icon: Zap,
            key: 'easy_updates'
        },
        {
            icon: Image,
            key: 'visual_appeal'
        },
        {
            icon: Globe,
            key: 'multilingual'
        },
        {
            icon: BarChart3,
            key: 'analytics'
        },
        {
            icon: Leaf,
            key: 'eco_friendly'
        }
    ];
    return (
        <section className="py-12 sm:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        {t('landing.benefits.title')}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                        {t('landing.benefits.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={benefit.key}
                                className="group relative p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                                <div className="relative">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                                        {t(`landing.benefits.items.${benefit.key}.title`)}
                                    </h3>

                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                        {t(`landing.benefits.items.${benefit.key}.description`)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
