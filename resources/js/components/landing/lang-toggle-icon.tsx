import React from 'react'
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LangToggleIcon() {
    const { i18n } = useTranslation();
    function changeLanguage(lang: string) {
        i18n.changeLanguage(lang);
    }
    const switch_language = () => {
        if (i18n.language === 'en') {
            changeLanguage('ar');
        } else {
            changeLanguage('en');
        }
    }
    return (
        <button onClick={() => switch_language()} className="flex-1 sm:flex-none btn bg-background/80 backdrop-blur text-foreground border border-border hover:bg-background transition-colors py-1 px-2 rounded-md flex items-center justify-center gap-2">
            <Languages className="w-4 h-4" />
            <span className="sm:hidden text-xs">{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
        </button>
    )
}
