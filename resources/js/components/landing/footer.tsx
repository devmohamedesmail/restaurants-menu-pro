import { Link, usePage } from '@inertiajs/react';
import Logo from '../ui/logo';
import { PageProps } from '@inertiajs/core';
import { Settings } from '@/types/settings';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail } from 'lucide-react';

interface AppPageProps extends PageProps {
    settings: Settings;
}

export default function Footer() {
    const { settings } = usePage<AppPageProps>().props;
    const { t } = useTranslation();

    const companyName = settings?.title_en || settings?.title_ar || 'Menu Pro';
    const year = new Date().getFullYear();

    return (
        <footer className="bg-muted/30 border-t border-border">
            {/* Main Footer Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    {/* Column 1: Brand */}
                    <div className="flex flex-col gap-4">
                        <Logo />
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            {t('footer.tagline')}
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                            {t('footer.quick_links')}
                        </h3>
                        <nav className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                {t('footer.home')}
                            </Link>
                            <Link
                                href="/contact-us"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                {t('footer.contact_us')}
                            </Link>
                            <Link
                                href="/privacy-policy"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                {t('footer.privacy_policy')}
                            </Link>
                            <Link
                                href="/terms-of-service"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                {t('footer.terms_of_service')}
                            </Link>
                        </nav>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                            {t('footer.contact')}
                        </h3>
                        <div className="flex flex-col gap-3">
                            {settings?.address && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                    <span className="text-sm text-muted-foreground">
                                        {settings.address}
                                    </span>
                                </div>
                            )}
                            {settings?.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-sm text-muted-foreground" dir="ltr">
                                        {settings.phone}
                                    </span>
                                </div>
                            )}
                            {settings?.email && (
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-sm text-muted-foreground break-all">
                                        {settings.email}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border/60">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <p className="text-xs text-muted-foreground text-center">
                        {t('footer.copyright', { year, company: companyName })}
                    </p>
                </div>
            </div>
        </footer>
    );
}
