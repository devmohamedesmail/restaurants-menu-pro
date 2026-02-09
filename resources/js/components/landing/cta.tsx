import {

    ArrowRight,
    Check
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CTA() {
    const { t } = useTranslation();
    return (
        <section className="py-12 sm:py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-primary/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                        {t('landing.cta_section.title')}
                    </h2>

                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 px-4">
                        {t('landing.cta_section.description')}
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:gap-6">
                        <button className="group relative px-8 sm:px-12 py-4 sm:py-5 bg-primary text-white rounded-xl font-bold text-base sm:text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 w-full sm:w-auto">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {t('landing.cta_section.button')}
                                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            <span>{t('landing.cta_section.no_credit_card')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
