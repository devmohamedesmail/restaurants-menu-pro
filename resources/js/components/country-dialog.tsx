import React, { useEffect } from 'react'
import { router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Declare global route function from Laravel
declare function route(name: string, params?: any): string


interface Country {
    id: number
    name_en: string
    name_ar: string
    currency_en: string
    currency_ar: string
    code: string
}

interface CountryDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    country?: Country | null
}

export default function CountryDialog({ open, onOpenChange, country }: CountryDialogProps) {
    const { t } = useTranslation()
    const isEditMode = !!country

    // Validation schema
    const validationSchema = Yup.object({
        name_en: Yup.string()
            .min(2, t('countries.validation.name-en-min'))
            .required(t('countries.validation.name-en-required')),
        name_ar: Yup.string()
            .min(2, t('countries.validation.name-ar-min'))
            .required(t('countries.validation.name-ar-required')),
        currency_en: Yup.string()
            .min(2, t('countries.validation.currency-en-min')),
        currency_ar: Yup.string()
            .min(2, t('countries.validation.currency-ar-min')),
        code: Yup.string()
            .min(2, t('countries.validation.code-min'))
            .max(10, t('countries.validation.code-max'))
            .required(t('countries.validation.code-required')),
    })

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name_en: country?.name_en || '',
            name_ar: country?.name_ar || '',
            currency_en: country?.currency_en || '',
            currency_ar: country?.currency_ar || '',
            code: country?.code || '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            const url = isEditMode
                ? route('country.update', country.id)
                : route('country.store')

            router.post(url, values, {
                onSuccess: () => {
                    formik.resetForm()
                    onOpenChange(false)
                },
            })
        },
    })

    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            formik.resetForm()
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-150">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? t('countries.edit-country') : t('countries.add-new-country')}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditMode
                            ? t('countries.update-country-info-desc')
                            : t('countries.fill-country-details')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name English */}
                        <div className="space-y-2">
                            <Label htmlFor="name_en">{t('countries.country-name-en')}</Label>
                            <Input
                                id="name_en"
                                name="name_en"
                                value={formik.values.name_en}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t('countries.enter-country-name-en')}
                                className={
                                    formik.touched.name_en && formik.errors.name_en
                                        ? 'border-red-500'
                                        : ''
                                }
                            />
                            {formik.touched.name_en && formik.errors.name_en && (
                                <p className="text-sm text-red-500">{formik.errors.name_en}</p>
                            )}
                        </div>

                        {/* Name Arabic */}
                        <div className="space-y-2">
                            <Label htmlFor="name_ar">{t('countries.country-name-ar')}</Label>
                            <Input
                                id="name_ar"
                                name="name_ar"
                                value={formik.values.name_ar}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t('countries.enter-country-name-ar')}
                                dir="rtl"
                                className={
                                    formik.touched.name_ar && formik.errors.name_ar
                                        ? 'border-red-500'
                                        : ''
                                }
                            />
                            {formik.touched.name_ar && formik.errors.name_ar && (
                                <p className="text-sm text-red-500" dir="rtl">
                                    {formik.errors.name_ar}
                                </p>
                            )}
                        </div>

                        {/* Currency English */}
                        <div className="space-y-2">
                            <Label htmlFor="currency_en">{t('countries.currency-en')}</Label>
                            <Input
                                id="currency_en"
                                name="currency_en"
                                value={formik.values.currency_en}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t('countries.enter-currency-en')}
                                className={
                                    formik.touched.currency_en && formik.errors.currency_en
                                        ? 'border-red-500'
                                        : ''
                                }
                            />
                            {formik.touched.currency_en && formik.errors.currency_en && (
                                <p className="text-sm text-red-500">{formik.errors.currency_en}</p>
                            )}
                        </div>

                        {/* Currency Arabic */}
                        <div className="space-y-2">
                            <Label htmlFor="currency_ar">{t('countries.currency-ar')}</Label>
                            <Input
                                id="currency_ar"
                                name="currency_ar"
                                value={formik.values.currency_ar}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t('countries.enter-currency-ar')}
                                dir="rtl"
                                className={
                                    formik.touched.currency_ar && formik.errors.currency_ar
                                        ? 'border-red-500'
                                        : ''
                                }
                            />
                            {formik.touched.currency_ar && formik.errors.currency_ar && (
                                <p className="text-sm text-red-500" dir="rtl">
                                    {formik.errors.currency_ar}
                                </p>
                            )}
                        </div>

                        {/* Country Code */}
                        <div className="space-y-2">
                            <Label htmlFor="code">{t('countries.country-code')}</Label>
                            <Input
                                id="code"
                                name="code"
                                value={formik.values.code}
                                onChange={(e) => {
                                    formik.setFieldValue('code', e.target.value.toUpperCase())
                                }}
                                onBlur={formik.handleBlur}
                                placeholder={t('countries.enter-country-code')}
                                maxLength={10}
                                className={
                                    formik.touched.code && formik.errors.code
                                        ? 'border-red-500'
                                        : ''
                                }
                            />
                            {formik.touched.code && formik.errors.code && (
                                <p className="text-sm text-red-500">{formik.errors.code}</p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit" disabled={formik.isSubmitting}>
                            {isEditMode ? t('common.update') : t('common.create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
