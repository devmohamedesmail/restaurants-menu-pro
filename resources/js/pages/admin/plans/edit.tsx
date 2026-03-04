import AppLayout from '@/layouts/app-layout'
import { Head, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

interface Plan {
    id: number
    name_en: string
    name_ar: string
    description_en?: string
    description_ar?: string
    price: number
    interval: string
    duration_days: number
    max_menus: number
    max_categories: number
    max_items: number
    qr_code: boolean
    custom_domain: boolean
    is_active: boolean
}
declare function route(name: string, params?: any): string
export default function EditPlan({ plan }: { plan: Plan }) {
    const { t } = useTranslation()
    const [isSubmitting, setIsSubmitting] = useState(false)

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
        max_menus: Yup.number().required(t('plans.max-menus-required')).min(1),
        max_categories: Yup.number().required(t('plans.max-categories-required')).min(1),
        max_items: Yup.number().required(t('plans.max-items-required')).min(1),
    })

    const formik = useFormik({
        initialValues: {
            name_en: plan.name_en,
            name_ar: plan.name_ar,
            description_en: plan.description_en || '',
            description_ar: plan.description_ar || '',
            price: plan.price,
            interval: plan.interval,
            duration_days: plan.duration_days,
            max_menus: plan.max_menus,
            max_categories: plan.max_categories,
            max_items: plan.max_items,
            qr_code: plan.qr_code,
            custom_domain: plan.custom_domain,
            is_active: plan.is_active,
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true)
            try {
                await router.post(route('admin.plan.update', plan.id), values, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        router.visit(route('plans.page'))
                    },
                    onError: (errors) => {
                        Object.keys(errors).forEach((key) => {
                            formik.setFieldError(key, errors[key])
                        })
                        setIsSubmitting(false)
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
            <Head title={t('plans.edit')} />

            <div className=" mx-auto w-full p-8 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-6">{t('plans.edit')}</h1>

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
                            {formik.touched.description_ar && formik.errors.description_ar && (
                                <p className="text-red-500 text-sm">{formik.errors.description_ar}</p>
                            )}
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
                        <Button type="submit" disabled={isSubmitting}>
                            {t('common.save')}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}
