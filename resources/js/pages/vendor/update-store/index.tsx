import React, { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import { CheckCircle2, Languages, Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ImagePicker from '@/components/ui/image-picker'
import Header from '@/components/vendor/header'

// @ts-ignore
declare var route: any;

export default function UpdateStore({ store, countries }: any) {
    const { t, i18n } = useTranslation()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validationSchema = Yup.object({
        store_name: Yup.string().required(t('common.store-name-required')),
        country_id: Yup.string().required(t('common.country-required')),
        store_email: Yup.string().email(t('common.invalid-email')).nullable(),
        store_phone: Yup.string().nullable(),
        store_address: Yup.string().nullable(),
        store_description: Yup.string().nullable(),
        image: Yup.mixed()
            .nullable()
            .test('fileSize', t('common.file-size-limit'), (value) => {
                if (!value) return true
                return value instanceof File && value.size <= 2 * 1024 * 1024 // 2MB
            }),
        banner: Yup.mixed()
            .nullable()
            .test('fileSize', t('store.file-size-limit'), (value) => {
                if (!value) return true
                return value instanceof File && value.size <= 2 * 1024 * 1024 // 2MB
            }),
    })

    const formik = useFormik({
        initialValues: {
            country_id: store.country_id ? String(store.country_id) : '',
            store_name: store.name || '',
            slug: store.slug || '',
            store_email: store.email || '',
            store_phone: store.phone || '',
            store_address: store.address || '',
            store_description: store.description || '',
            image: null as File | null,
            banner: null as File | null,
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true)
            const slug = values.store_name
                .trim()
                .toLowerCase()
                .replace(/[^\p{L}\p{N}]+/gu, '-')
                .replace(/^-+|-+$/g, '')

            const formData = new FormData()
            formData.append('country_id', values.country_id)
            formData.append('store_name', values.store_name)
            formData.append('slug', slug)
            if (values.store_email) formData.append('store_email', values.store_email)
            if (values.store_phone) formData.append('store_phone', values.store_phone)
            if (values.store_address) formData.append('store_address', values.store_address)
            if (values.store_description) formData.append('store_description', values.store_description)
            if (values.image) formData.append('image', values.image)
            if (values.banner) formData.append('banner', values.banner)

            // For method spoofing since Inertia doesn't support multipart/form-data with PUT/PATCH easily
            // Actually router.post is fine, we just update via POST on the backend route we made

            try {
                // @ts-ignore
                await router.post(route('register.store.save', store.id), formData, {
                    onSuccess: () => {
                        setIsSubmitting(false)
                    },
                    onError: (errors) => {
                        setIsSubmitting(false)
                        Object.keys(errors).forEach((key) => {
                            formik.setFieldError(key, errors[key])
                        })
                        console.log(errors)
                    },
                })
            } catch (error) {
                setIsSubmitting(false)
            }
        },
    })

    const getErrorMessage = (error: any): string | undefined => {
        if (typeof error === 'string') return error;
        if (Array.isArray(error)) return error.join(', ');
        return undefined;
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
            <Head title={`${t('common.update')} - ${store.name}`} />

            <Header store={store} />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('dashboard.edit-details')}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {t('store.update-description')}
                        </p>
                    </div>

                    <Card className="shadow-lg border-0 dark:bg-gray-800">
                        <CardContent className="pt-6">
                            <form onSubmit={formik.handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="store_name">{t('auth.store-name')}</Label>
                                        <Input
                                            id="store_name"
                                            name="store_name"
                                            type="text"
                                            value={formik.values.store_name}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                const value = e.target.value;
                                                const slug = value
                                                    .trim()
                                                    .toLowerCase()
                                                    .replace(/[^a-z0-9]+/g, '-')
                                                    .replace(/^-+|-+$/g, '');
                                                formik.setFieldValue('slug', slug);
                                            }}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            className="h-11"
                                        />
                                        {formik.touched.store_name && formik.errors.store_name && (
                                            <InputError message={getErrorMessage(formik.errors.store_name)} />
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <ImagePicker
                                            id="image"
                                            label={t('auth.store-logo')}
                                            accept="image/*"
                                            onChange={(file) => formik.setFieldValue('image', file)}
                                            disabled={isSubmitting}
                                            error={formik.touched.image && formik.errors.image ? getErrorMessage(formik.errors.image) : undefined}
                                            previewClassName="h-40 object-contain"
                                            initialPreview={store.image}
                                        />

                                        <ImagePicker
                                            id="banner"
                                            label={t('auth.store-banner')}
                                            accept="image/*"
                                            onChange={(file) => formik.setFieldValue('banner', file)}
                                            disabled={isSubmitting}
                                            error={formik.touched.banner && formik.errors.banner ? getErrorMessage(formik.errors.banner) : undefined}
                                            previewClassName="h-40 object-cover"
                                            initialPreview={store.banner}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="store_email">{t('auth.store-email')}</Label>
                                        <Input
                                            id="store_email"
                                            name="store_email"
                                            type="email"
                                            value={formik.values.store_email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            className="h-11"
                                        />
                                        {formik.touched.store_email && formik.errors.store_email && (
                                            <InputError message={getErrorMessage(formik.errors.store_email)} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="store_phone">{t('auth.store-phone')}</Label>
                                        <Input
                                            id="store_phone"
                                            name="store_phone"
                                            type="tel"
                                            value={formik.values.store_phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            className="h-11"
                                        />
                                        {formik.touched.store_phone && formik.errors.store_phone && (
                                            <InputError message={getErrorMessage(formik.errors.store_phone)} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="store_address">{t('auth.store-address')}</Label>
                                        <Input
                                            id="store_address"
                                            name="store_address"
                                            type="text"
                                            value={formik.values.store_address}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            className="h-11"
                                        />
                                        {formik.touched.store_address && formik.errors.store_address && (
                                            <InputError message={getErrorMessage(formik.errors.store_address)} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="store_description">{t('auth.store-description')}</Label>
                                        <textarea
                                            id="store_description"
                                            name="store_description"
                                            value={formik.values.store_description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            className="flex min-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            rows={4}
                                        />
                                        {formik.touched.store_description && formik.errors.store_description && (
                                            <InputError message={getErrorMessage(formik.errors.store_description)} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>{t('auth.choose-country')}</Label>
                                        <Select
                                            value={formik.values.country_id}
                                            onValueChange={(value) => formik.setFieldValue('country_id', value)}
                                        >
                                            <SelectTrigger className="w-full h-11">
                                                <Languages className="w-4 h-4 mr-2" />
                                                <SelectValue placeholder={t('common.choose-country')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countries && countries.map((country: any) => (
                                                    <SelectItem key={country.id} value={String(country.id)}>
                                                        {i18n.language === 'ar' ? country.name_ar : country.name_en}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {formik.touched.country_id && formik.errors.country_id && (
                                            <InputError message={getErrorMessage(formik.errors.country_id)} />
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                        disabled={isSubmitting}
                                    >
                                        {t('common.cancel')}
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="min-w-35"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                {t('common.saving')}...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                {t('common.save')}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
