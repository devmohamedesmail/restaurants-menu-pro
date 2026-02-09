import {
    QrCode,
    Zap,
    Palette,
    Smartphone,
    FolderTree,
    AlertCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Features() {
    const { t } = useTranslation()
    const features = [
        {
            icon: QrCode,
            key: 'qr_code'
        },
        {
            icon: Zap,
            key: 'real_time'
        },
        {
            icon: Palette,
            key: 'customizable'
        },
        {
            icon: Smartphone,
            key: 'responsive'
        },
        {
            icon: FolderTree,
            key: 'categories'
        },
        {
            icon: AlertCircle,
            key: 'allergens'
        }
    ];
    return (
        <section className="py-12 sm:py-20 bg-muted/30 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        {t('landing.features.title')}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                        {t('landing.features.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.key}
                                className="group relative p-6 sm:p-8 rounded-2xl backdrop-blur-sm bg-background/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                                <div className="relative">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                                        {t(`landing.features.items.${feature.key}.title`)}
                                    </h3>

                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                        {t(`landing.features.items.${feature.key}.description`)}
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
