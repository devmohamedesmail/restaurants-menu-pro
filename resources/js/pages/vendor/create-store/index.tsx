import React, { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import { CheckCircle2, Store, User, ArrowRight, ArrowLeft, Languages } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select'
import ImagePicker from '@/components/ui/image-picker'
import Header from '@/components/landing/header'





declare function route(name: string, params?: any): string
export default function RegisterStore({ countries }: any) {
    const { t, i18n } = useTranslation()
    const { settings }: any = usePage().props;
    const [isSubmitting, setIsSubmitting] = useState(false)


    const validationSchema = Yup.object({
        store_name: Yup.string().required(t('common.store-name-required')),
        country_id: Yup.string().required(t('common.country-required')),
        store_email: Yup.string().email(t('common.invalid-email')).nullable(),
        store_phone: Yup.string().nullable(),
        store_address: Yup.string().nullable(),
        store_description: Yup.string().nullable(),
        image: Yup.mixed()
            .required(t('common.store-logo-required'))
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
            country_id: '',
            store_name: '',
            slug: '',
            store_email: '',
            store_phone: '',
            store_address: '',
            store_description: '',
            image: null as File | null,
            banner: null as File | null,
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true)
            const slug =
                values.store_name
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

            try {

                await router.post(route('create.store'), formData, {
                    onSuccess: () => {
                        // router.visit('/store/dashboard')
                    },
                    onError: (errors) => {
                        setIsSubmitting(false)
                        Object.keys(errors).forEach((key) => {
                            formik.setFieldError(key, errors[key])
                        })
                    },
                })
            } catch (error) {
                setIsSubmitting(false)
            }
        },
    })





    return (
        <>
            <Head title={t('auth.register-store')} />
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
                            <img src={settings?.logo} alt={settings?.title_ar} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {t('auth.register-store')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('auth.store-registration')}
                        </p>
                    </div>

                    {/* Progress Indicator */}


                    {/* Registration Form */}
                    <Card className="shadow-xl border-0">


                        <CardContent>
                            <form onSubmit={formik.handleSubmit} className="space-y-6">


                                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">


                                    <div className="grid gap-2">
                                        <Label htmlFor="store_name">{t('auth.store-name')}</Label>
                                        <Input
                                            id="store_name"
                                            name="store_name"
                                            type="text"
                                            autoFocus
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
                                            placeholder={t('auth.enter-store-name')}
                                            className="h-11"
                                        />
                                        {formik.touched.store_name && formik.errors.store_name && (
                                            <InputError message={formik.errors.store_name} />
                                        )}
                                    </div>

                                    <ImagePicker
                                        id="image"
                                        label={t('auth.store-logo')}
                                        required
                                        accept="image/*"
                                        onChange={(file) => formik.setFieldValue('image', file)}
                                        disabled={isSubmitting}
                                        error={formik.touched.image && formik.errors.image ? String(formik.errors.image) : undefined}
                                        previewClassName="h-40 object-contain"
                                    />

                                    <ImagePicker
                                        id="banner"
                                        label={`${t('auth.store-banner')} (${t('auth.optional')})`}
                                        accept="image/*"
                                        onChange={(file) => formik.setFieldValue('banner', file)}
                                        disabled={isSubmitting}
                                        error={formik.touched.banner && formik.errors.banner ? String(formik.errors.banner) : undefined}
                                        previewClassName="h-48 object-cover"
                                    />

                                    <div className="grid gap-2">
                                        <Label htmlFor="store_email">
                                            {t('auth.store-email')} <span className="text-gray-400 text-xs">({t('auth.optional')})</span>
                                        </Label>
                                        <Input
                                            id="store_email"
                                            name="store_email"
                                            type="email"
                                            value={formik.values.store_email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            placeholder={t('auth.enter-store-email')}
                                            className="h-11"
                                        />
                                        {formik.touched.store_email && formik.errors.store_email && (
                                            <InputError message={formik.errors.store_email} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="store_phone">
                                            {t('auth.store-phone')} <span className="text-gray-400 text-xs">({t('auth.optional')})</span>
                                        </Label>
                                        <Input
                                            id="store_phone"
                                            name="store_phone"
                                            type="tel"
                                            value={formik.values.store_phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            placeholder={t('auth.enter-store-phone')}
                                            className="h-11"
                                        />
                                        {formik.touched.store_phone && formik.errors.store_phone && (
                                            <InputError message={formik.errors.store_phone} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="store_address">
                                            {t('auth.store-address')} <span className="text-gray-400 text-xs">({t('auth.optional')})</span>
                                        </Label>
                                        <Input
                                            id="store_address"
                                            name="store_address"
                                            type="text"
                                            value={formik.values.store_address}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            placeholder={t('auth.enter-store-address')}
                                            className="h-11"
                                        />
                                        {formik.touched.store_address && formik.errors.store_address && (
                                            <InputError message={formik.errors.store_address} />
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="store_description">
                                            {t('auth.store-description')} <span className="text-gray-400 text-xs">({t('auth.optional')})</span>
                                        </Label>
                                        <textarea
                                            id="store_description"
                                            name="store_description"
                                            value={formik.values.store_description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={isSubmitting}
                                            placeholder={t('auth.enter-store-description')}
                                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            rows={4}
                                        />
                                        {formik.touched.store_description && formik.errors.store_description && (
                                            <InputError message={formik.errors.store_description} />
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
                                            <InputError message={formik.errors.country_id} />
                                        )}
                                    </div>

                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex gap-3 pt-4">


                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                {t('auth.submit')}...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                {t('auth.complete-registration')}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t('auth.already-account')}{' '}
                            <Link href={'login'} className="text-primary font-medium hover:underline">
                                {t('auth.login')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

