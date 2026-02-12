import React, { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import AppLayout from '@/layouts/app-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import CountryDialog from '@/components/country-dialog'

declare function route(name: string, params?: any): string
interface Country {
    id: number
    name_en: string
    name_ar: string
    currency_en: string
    currency_ar: string
    code: string
    created_at: string
}

interface Props {
    countries: Country[]
}

export default function CountriesPage({ countries }: Props) {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'
    const [searchTerm, setSearchTerm] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

    const filteredCountries = countries.filter((country) =>
        country.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.name_ar.includes(searchTerm) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAddClick = () => {
        setSelectedCountry(null)
        setDialogOpen(true)
    }

    const handleEditClick = (country: Country) => {
        setSelectedCountry(country)
        setDialogOpen(true)
    }

    const handleDelete = (id: number) => {
        if (confirm(t('countries.confirm-delete-country'))) {
            router.get(route('country.delete', id))
        }
    }

    return (
        <AppLayout>
            <Head title={t('countries.title')} />

            <div className="space-y-6 px-10 py-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t('countries.title')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {t('countries.manage-countries-desc')}
                        </p>
                    </div>
                    <Button onClick={handleAddClick}>
                        <Plus className="w-4 h-4 mr-2" />
                        {t('countries.add-country')}
                    </Button>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder={t('countries.search-countries')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Countries Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('countries.country-name-en')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('countries.country-name-ar')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('countries.currency-en')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('countries.currency-ar')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('countries.country-code')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('common.actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredCountries.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                {t('countries.no-countries')}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredCountries.map((country) => (
                                            <tr key={country.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    {country.name_en}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white" dir="rtl">
                                                    {country.name_ar}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {country.currency_en || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400" dir="rtl">
                                                    {country.currency_ar || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md font-mono">
                                                        {country.code}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleEditClick(country)}
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDelete(country.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Country Dialog */}
            <CountryDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                country={selectedCountry}
            />
        </AppLayout>
    )
}
