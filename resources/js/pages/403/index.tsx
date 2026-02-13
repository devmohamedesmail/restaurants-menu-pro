import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Home, ShieldAlert, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error403() {
    const { t } = useTranslation()

    return (
        <>
            <Head title={t('errors.403.title')} />

            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
                <div className="max-w-2xl w-full text-center">
                    {/* Animated Shield Icon */}
                    <div className="relative mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
                            <div className="relative bg-white dark:bg-gray-800 p-8 rounded-full shadow-2xl">
                                <ShieldAlert className="w-32 h-32 text-red-500 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Error Code */}
                    <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-6 animate-in fade-in duration-500">
                        403
                    </div>

                    {/* Error Message */}
                    <div className="space-y-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            {t('errors.403.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
                            {t('errors.403.subtitle')}
                        </p>
                        <p className="text-base md:text-lg text-gray-500 dark:text-gray-500 max-w-xl mx-auto">
                            {t('errors.403.description')}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Link href="/">
                            <Button size="lg" className="gap-2 min-w-[200px]">
                                <Home className="w-5 h-5" />
                                {t('errors.403.go-home')}
                            </Button>
                        </Link>

                        <Button
                            size="lg"
                            variant="outline"
                            className="gap-2 min-w-[200px]"
                        >
                            <Mail className="w-5 h-5" />
                            {t('errors.403.contact-admin')}
                        </Button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="mt-16 flex justify-center gap-2 opacity-50">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
