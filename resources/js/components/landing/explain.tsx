
import { useTranslation } from 'react-i18next';

export default function Explain() {
    const { t } = useTranslation();
    const steps = [
        { key: 'step1', number: '01' },
        { key: 'step2', number: '02' },
        { key: 'step3', number: '03' }
    ];
    return (
        <section className="py-12 sm:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        {t('landing.how_it_works.title')}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                        {t('landing.how_it_works.subtitle')}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
                        {/* Connection Line - Hidden on mobile */}
                        <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" style={{ top: '4rem' }} />

                        {steps.map((step, index) => (
                            <div key={step.key} className="relative">
                                <div className="text-center">
                                    <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-6 shadow-lg shadow-primary/25 z-10">
                                        {step.number}
                                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                                        {t(`landing.how_it_works.steps.${step.key}.title`)}
                                    </h3>

                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
                                        {t(`landing.how_it_works.steps.${step.key}.description`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
