
import LangToggle from '@/components/ui/lang-toggle';
import ThemeToggle from '@/components/ui/theme-toggle';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { PageProps } from '@inertiajs/core'
import { Settings } from '@/types/settings';
interface AppPageProps extends PageProps {
    settings: Settings
}

export default function Header() {
    const {settings}:any=usePage<AppPageProps>().props;
    const {auth}=usePage().props;
    const {t,i18n}=useTranslation();
   
    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                           <img src={settings?.logo} className='w-12 h-12' alt={settings.title_en} />
                        </div>
                        <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                           {i18n.language === 'ar' ? settings.title_ar : settings.title_en}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <LangToggle />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}
