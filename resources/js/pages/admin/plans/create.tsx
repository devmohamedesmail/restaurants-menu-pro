
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

import { useFormik } from 'formik'
import * as Yup from 'yup'


declare function route(name: string, params?: any): string
export default function CreatePlanPage() {
    const { t } = useTranslation()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('plans.title'),
            href: '/dashboard',
        },
    ];



    /* =======================
         Validation Schema
      ======================= */
    const validationSchema = Yup.object({
        name_en: Yup.string().required(t('plans.name-en-required')),
        name_ar: Yup.string().required(t('plans.name-ar-required')),

        price: Yup.number()
            .typeError(t('plans.price-number'))
            .required(t('plans.price-required'))
            .min(0, t('plans.price-min')),

        interval: Yup.string().required(t('plans.interval-required')),

        duration_days: Yup.number()
            .typeError(t('plans.duration-number'))
            .required(t('plans.duration-required'))
            .min(1, t('plans.duration-min')),

        max_menus: Yup.number()
            .typeError(t('plans.max-menus-required'))
            .required(t('plans.max-menus-required'))
            .min(1),

        max_categories: Yup.number()
            .typeError(t('plans.max-categories-required'))
            .required(t('plans.max-categories-required'))
            .min(1),

        max_items: Yup.number()
            .typeError(t('plans.max-items-required'))
            .required(t('plans.max-items-required'))
            .min(1),

        // Toggles are optional
        qr_code: Yup.boolean(),
        custom_domain: Yup.boolean(),
        is_active: Yup.boolean(),

        description_en: Yup.string().nullable(),
        description_ar: Yup.string().nullable(),
    })


    /* =======================
       Formik
    ======================= */
    const formik = useFormik({
        initialValues: {
            name_en: '',
            name_ar: '',
            description_en: '',
            description_ar: '',
            price: '',
            interval: '',
            duration_days: '',
            max_menus: '',
            max_categories: '',
            max_items: '',
            qr_code: false,
            custom_domain: false,
            is_active: false,
        }
        ,
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true)

            try {
                await router.post(route('admin.plan.store'), values, {
                    onError: (errors) => {
                        Object.keys(errors).forEach((key) => {
                            formik.setFieldError(key, errors[key])
                        })
                        setIsSubmitting(false)
                    },
                    onSuccess: () => {
                        router.visit(route('plans.page'))
                    },
                    onFinish: () => setIsSubmitting(false),
                })
            } catch {
                setIsSubmitting(false)
            }
        },
    })

    return (
        <AppLayout>
            <Head title={t('plans.create')} />

            <div className="px-10 py-5 w-full mx-auto p-8 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-6">
                    {t('plans.create')}
                </h1>

                <form onSubmit={formik.handleSubmit} className="space-y-6">

                    {/* Name */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>{t('plans.name-en')}</Label>
                            <Input
                                name="name_en"
                                value={formik.values.name_en}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.name_en && formik.errors.name_en && (
                                <p className="text-red-500 text-sm">{formik.errors.name_en}</p>
                            )}
                        </div>

                        <div>
                            <Label>{t('plans.name-ar')}</Label>
                            <Input
                                name="name_ar"
                                value={formik.values.name_ar}
                                onChange={formik.handleChange}
                                className="text-right"
                            />
                            {formik.touched.name_ar && formik.errors.name_ar && (
                                <p className="text-red-500 text-sm">{formik.errors.name_ar}</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>{t('plans.description-en')}</Label>
                            <Textarea
                                name="description_en"
                                value={formik.values.description_en}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.description_en && formik.errors.description_en && (
                                <p className="text-red-500 text-sm">{formik.errors.description_en}</p>
                            )}
                        </div>

                        <div>
                            <Label>{t('plans.description-ar')}</Label>
                            <Textarea
                                name="description_ar"
                                value={formik.values.description_ar}
                                onChange={formik.handleChange}
                                className="text-right"
                            />
                        </div>
                    </div>

                    {/* Price & Interval */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label>{t('plans.price')}</Label>
                            <Input
                                type="number"
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.price && formik.errors.price && (
                                <p className="text-red-500 text-sm">{formik.errors.price}</p>
                            )}
                        </div>

                        <div>
                            <Label>{t('plans.interval-label')}</Label>
                            <select
                                name="interval"
                                value={formik.values.interval}
                                onChange={formik.handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="monthly">{t('plans.monthly')}</option>
                                <option value="quarterly">{t('plans.quarterly')}</option>
                                <option value="yearly">{t('plans.yearly')}</option>
                            </select>
                            {formik.touched.interval && formik.errors.interval && (
                                <p className="text-red-500 text-sm">{formik.errors.interval}</p>
                            )}
                        </div>

                        <div>
                            <Label>{t('plans.duration')}</Label>
                            <Input
                                type="number"
                                name="duration_days"
                                value={formik.values.duration_days}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.duration_days && formik.errors.duration_days && (
                                <p className="text-red-500 text-sm">{formik.errors.duration_days}</p>
                            )}
                        </div>
                    </div>

                    {/* Limits */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label>{t('plans.max-menus')}</Label>
                            <Input
                                type="number"
                                name="max_menus"
                                value={formik.values.max_menus}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.max_menus && formik.errors.max_menus && (
                                <p className="text-red-500 text-sm">{formik.errors.max_menus}</p>
                            )}
                        </div>

                        <div>
                            <Label>{t('plans.max-categories')}</Label>
                            <Input
                                type="number"
                                name="max_categories"
                                value={formik.values.max_categories}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.max_categories && formik.errors.max_categories && (
                                <p className="text-red-500 text-sm">{formik.errors.max_categories}</p>
                            )}
                        </div>

                        <div>
                            <Label>{t('plans.max-items')}</Label>
                            <Input
                                type="number"
                                name="max_items"
                                value={formik.values.max_items}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.max_items && formik.errors.max_items && (
                                <p className="text-red-500 text-sm">{formik.errors.max_items}</p>
                            )}
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <Checkbox
                                checked={formik.values.qr_code}
                                onCheckedChange={(v) => formik.setFieldValue('qr_code', v)}
                            />
                            {t('plans.qr-code')}
                        </label>
                        {formik.touched.qr_code && formik.errors.qr_code && (
                            <p className="text-red-500 text-sm">{formik.errors.qr_code}</p>
                        )}

                        <label className="flex items-center gap-2">
                            <Checkbox
                                checked={formik.values.custom_domain}
                                onCheckedChange={(v) => formik.setFieldValue('custom_domain', v)}
                            />
                            {t('plans.custom-domain')}
                        </label>
                        {formik.touched.custom_domain && formik.errors.custom_domain && (
                            <p className="text-red-500 text-sm">{formik.errors.custom_domain}</p>
                        )}

                        <label className="flex items-center gap-2">
                            <Checkbox
                                checked={formik.values.is_active}
                                onCheckedChange={(v) => formik.setFieldValue('is_active', v)}
                            />
                            {t('plans.active')}
                        </label>
                        {formik.touched.is_active && formik.errors.is_active && (
                            <p className="text-red-500 text-sm">{formik.errors.is_active}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <Button
                            type="submit" disabled={formik.isSubmitting}>
                            {t('common.save')}
                        </Button>
                    </div>

                </form>
            </div>
        </AppLayout>
    )
}
