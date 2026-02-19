import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Settings } from '@/types/settings';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import {
    Shield,
    Info,
    Share2,
    Lock,
    Cookie,
    UserCheck,
    Phone,
    Mail,
    MapPin,
} from 'lucide-react';

interface AppPageProps extends PageProps {
    settings: Settings;
}

interface PolicySection {
    icon: React.ReactNode;
    titleKey: string;
    contentKey: string;
}

export default function PrivacyPolicy() {
    const { settings } = usePage<AppPageProps>().props;
    const { t } = useTranslation();

    const companyName =
        settings.title_en || settings.title_ar || 'Menu Pro';

    const sections: PolicySection[] = [
        {
            icon: <Info className="w-6 h-6" />,
            titleKey: 'privacy_policy.section1_title',
            contentKey: 'privacy_policy.section1_content',
        },
        {
            icon: <UserCheck className="w-6 h-6" />,
            titleKey: 'privacy_policy.section2_title',
            contentKey: 'privacy_policy.section2_content',
        },
        {
            icon: <Share2 className="w-6 h-6" />,
            titleKey: 'privacy_policy.section3_title',
            contentKey: 'privacy_policy.section3_content',
        },
        {
            icon: <Lock className="w-6 h-6" />,
            titleKey: 'privacy_policy.section4_title',
            contentKey: 'privacy_policy.section4_content',
        },
        {
            icon: <Cookie className="w-6 h-6" />,
            titleKey: 'privacy_policy.section5_title',
            contentKey: 'privacy_policy.section5_content',
        },
        {
            icon: <Shield className="w-6 h-6" />,
            titleKey: 'privacy_policy.section6_title',
            contentKey: 'privacy_policy.section6_content',
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
                            <Shield className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t('privacy_policy.title')}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {t('privacy_policy.last_updated')}: {today}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    {/* Intro Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-8 mb-8">
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {t('privacy_policy.intro', { company: companyName })}
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
                                            {t(section.contentKey)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            {t('privacy_policy.section7_title')}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {t('privacy_policy.section7_content')}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {settings.email && (
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Mail className="w-5 h-5 text-primary shrink-0" />
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-0.5">
                                            {t('privacy_policy.contact_email')}
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
                                            {t('privacy_policy.contact_phone')}
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
                                            {t('privacy_policy.contact_address')}
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