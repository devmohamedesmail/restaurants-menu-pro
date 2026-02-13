import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error404() {
    const { t } = useTranslation()

    return (
        <>
            <Head title={t('errors.404.title')} />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
                <div className="max-w-2xl w-full text-center">
                    {/* Animated 404 Number */}
                    <div className="relative mb-8">
                        <div className="text-[180px] md:text-[240px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/20 to-purple-500/20 dark:from-primary/30 dark:to-purple-500/30 leading-none select-none animate-pulse">
                            404
                        </div>

                        {/* Floating Search Icon */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-full shadow-2xl animate-bounce">
                                    <Search className="w-12 h-12 text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    <div className="space-y-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            {t('errors.404.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
                            {t('errors.404.subtitle')}
                        </p>
                        <p className="text-base md:text-lg text-gray-500 dark:text-gray-500 max-w-xl mx-auto">
                            {t('errors.404.description')}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Link href="/">
                            <Button size="lg" className="gap-2 min-w-[200px]">
                                <Home className="w-5 h-5" />
                                {t('errors.404.go-home')}
                            </Button>
                        </Link>

                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => window.history.back()}
                            className="gap-2 min-w-[200px]"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            {t('errors.404.go-back')}
                        </Button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="mt-16 flex justify-center gap-2 opacity-50">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
