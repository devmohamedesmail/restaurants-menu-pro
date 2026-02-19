import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Settings } from '@/types/settings';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
    FileText,
    CheckCircle,
    AlertTriangle,
    User,
    BookOpen,
    XCircle,
    RefreshCw,
    Phone,
    Mail,
    MapPin,
} from 'lucide-react';

interface AppPageProps extends PageProps {
    settings: Settings;
}

interface TermsSection {
    icon: React.ReactNode;
    titleKey: string;
    contentKey: string;
}

export default function TermsOfService() {
    const { settings } = usePage<AppPageProps>().props;
    const { t } = useTranslation();

    const companyName =
        settings.title_en || settings.title_ar || 'Menu Pro';

    const sections: TermsSection[] = [
        {
            icon: <CheckCircle className="w-6 h-6" />,
            titleKey: 'terms_of_service.section1_title',
            contentKey: 'terms_of_service.section1_content',
        },
        {
            icon: <FileText className="w-6 h-6" />,
            titleKey: 'terms_of_service.section2_title',
            contentKey: 'terms_of_service.section2_content',
        },
        {
            icon: <User className="w-6 h-6" />,
            titleKey: 'terms_of_service.section3_title',
            contentKey: 'terms_of_service.section3_content',
        },
        {
            icon: <BookOpen className="w-6 h-6" />,
            titleKey: 'terms_of_service.section4_title',
            contentKey: 'terms_of_service.section4_content',
        },
        {
            icon: <AlertTriangle className="w-6 h-6" />,
            titleKey: 'terms_of_service.section5_title',
            contentKey: 'terms_of_service.section5_content',
        },
        {
            icon: <XCircle className="w-6 h-6" />,
            titleKey: 'terms_of_service.section6_title',
            contentKey: 'terms_of_service.section6_content',
        },
        {
            icon: <RefreshCw className="w-6 h-6" />,
            titleKey: 'terms_of_service.section7_title',
            contentKey: 'terms_of_service.section7_content',
        },
    ];

    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Spacer for fixed header */}
            <div className="h-28" />

            <main className="grow">
                {/* Hero Section */}
                <div className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent py-16 md:py-20 border-b border-border/30">
                    <div className="container mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 text-primary mx-auto">
                            <FileText className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t('terms_of_service.title')}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {t('terms_of_service.last_updated')}: {today}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    {/* Intro Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-8 mb-8">
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t('terms_of_service.intro', { company: companyName })}
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-5">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-sm border border-border/50 p-8 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        {section.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                            {t(section.titleKey)}
                                        </h2>
                                        <p className="text-gray-600 leading-relaxed">
                                            {t(section.contentKey, { company: companyName })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            {t('terms_of_service.section8_title')}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {t('terms_of_service.section8_content')}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {settings.email && (
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Mail className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-0.5">
                                            {t('terms_of_service.contact_email')}
                                        </p>
                                        <p className="text-sm font-medium break-all">
                                            {settings.email}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {settings.phone && (
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Phone className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-0.5">
                                            {t('terms_of_service.contact_phone')}
                                        </p>
                                        <p className="text-sm font-medium" dir="ltr">
                                            {settings.phone}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {settings.address && (
                                <div className="flex items-center gap-3 text-gray-700">
                                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-0.5">
                                            {t('terms_of_service.contact_address')}
                                        </p>
                                        <p className="text-sm font-medium">
                                            {settings.address}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
