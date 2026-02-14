import React from 'react'
import { usePage } from '@inertiajs/react'
import { Settings } from '@/types/settings'
import { PageProps } from '@inertiajs/core'
import { useTranslation } from 'react-i18next'

interface AppPageProps extends PageProps {
    settings: Settings
}
export default function Logo() {
    const { settings }: any = usePage<AppPageProps>().props;
    const { i18n } = useTranslation();
    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center overflow-hidden">
                <img src={settings?.logo} className='w-full h-full object-cover' alt={settings.title_en} />
            </div>
            <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {i18n.language === 'ar' ? settings.title_ar : settings.title_en}
            </span>
        </div>
    )
}
