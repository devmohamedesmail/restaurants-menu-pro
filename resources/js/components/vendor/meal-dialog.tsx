import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import ImagePicker from '../ui/image-picker'

interface Category {
    id: number
    name_en: string
    name_ar: string
}

interface AttributeValue {
    id: number
    value_en: string
    value_ar: string
    price_modifier: number
}

interface Attribute {
    id: number
    name_en: string
    name_ar: string
    type: 'select' | 'radio' | 'checkbox'
    is_required: boolean
    values: AttributeValue[]
}

interface MealAttribute {
    attribute_id: number
    attribute_value_id: number
}

interface Meal {
    id?: number
    name_en: string
    name_ar: string
    description_en?: string
    description_ar?: string
    image: string
    price: number
    sale_price?: number
    category: {
        id: number
    }
    attributes?: MealAttribute[]
}

interface Props {
    open: boolean
    onClose: () => void
    categories: Category[]
    attributes?: Attribute[]
    meal?: Meal
}



declare function route(name: string, params?: any): string
export default function MealDialog({ open, onClose, categories, meal }: Props) {


    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedAttributes, setSelectedAttributes] = useState<Record<number, number>>(
        meal?.attributes?.reduce((acc, attr) => {
            acc[attr.attribute_id] = attr.attribute_value_id
            return acc
        }, {} as Record<number, number>) || {}
    )

    const validationSchema = Yup.object({
        category_id: Yup.number().required(t('common.required-field')),
        name_en: Yup.string().required(t('common.required-field')),
        name_ar: Yup.string().required(t('common.required-field')),
        description_en: Yup.string(),
        description_ar: Yup.string(),
        price: Yup.number().min(0, t('common.must-be-positive')).required(t('common.required-field')),
        sale_price: Yup.number().min(0, t('common.must-be-positive')),
    })

    const formik = useFormik({
        initialValues: {
            category_id: meal?.category.id || '',
            name_en: meal?.name_en || '',
            name_ar: meal?.name_ar || '',
            description_en: meal?.description_en || '',
            description_ar: meal?.description_ar || '',
            price: meal?.price || '',
            sale_price: meal?.sale_price || '',
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true)
            const formData = new FormData()
            formData.append('category_id', values.category_id.toString())
            formData.append('name_en', values.name_en)
            formData.append('name_ar', values.name_ar)
            formData.append('description_en', values.description_en)
            formData.append('description_ar', values.description_ar)
            formData.append('price', values.price.toString())
            if (values.sale_price) {
                formData.append('sale_price', values.sale_price.toString())
            }

            // Add attributes
            formData.append('attributes', JSON.stringify(selectedAttributes))

            if (imageFile) {
                formData.append('image', imageFile)
            } else if (!meal) {
                formik.setFieldError('image', t('common.required-field'))
                return
            }

            if (meal?.id) {
                formData.append('_method', 'PUT')
                router.post(route('store.meal.update', meal.id), formData, {
                    onSuccess: () => {
                        onClose()
                        formik.resetForm()
                        setImageFile(null)
                        setSelectedAttributes({})
                        setIsSubmitting(false)
                    },
                    onError: (errors) => {
                        formik.setErrors(errors)
                        setIsSubmitting(false)
                    },
                })
            } else {
                router.post(route('store.meal.store'), formData, {
                    onSuccess: () => {
                        onClose()
                        formik.resetForm()
                        setImageFile(null)
                        setSelectedAttributes({})
                        setIsSubmitting(false)
                    },
                    onError: (errors) => {
                        formik.setErrors(errors)
                        setIsSubmitting(false)
                    },
                })
            }
        },
    })

    const handleImageChange = (file: File | null) => {
        setImageFile(file)
    }

    return (
        <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {meal ? t('dashboard.edit-meal') : t('dashboard.add-meal')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('dashboard.fill-meal-details')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Category Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="category_id">{t('dashboard.category')}</Label>
                        <Select
                            value={formik.values.category_id.toString()}
                            onValueChange={(value) => formik.setFieldValue('category_id', parseInt(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={t('dashboard.select-category')} />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id.toString()}>
                                        {cat.name_en} - {cat.name_ar}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {formik.touched.category_id && formik.errors.category_id && (
                            <p className="text-sm text-red-500">{formik.errors.category_id}</p>
                        )}
                    </div>

                    {/* English Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name_en">{t('dashboard.meal-name-en')}</Label>
                        <Input
                            id="name_en"
                            name="name_en"
                            value={formik.values.name_en}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('dashboard.enter-meal-name-en')}
                        />
                        {formik.touched.name_en && formik.errors.name_en && (
                            <p className="text-sm text-red-500">{formik.errors.name_en}</p>
                        )}
                    </div>

                    {/* Arabic Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name_ar">{t('dashboard.meal-name-ar')}</Label>
                        <Input
                            id="name_ar"
                            name="name_ar"
                            value={formik.values.name_ar}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('dashboard.enter-meal-name-ar')}
                            dir="rtl"
                        />
                        {formik.touched.name_ar && formik.errors.name_ar && (
                            <p className="text-sm text-red-500">{formik.errors.name_ar}</p>
                        )}
                    </div>

                    {/* English Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description_en">{t('dashboard.description-en')}</Label>
                        <Textarea
                            id="description_en"
                            name="description_en"
                            value={formik.values.description_en}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('dashboard.enter-description-en')}
                            rows={3}
                        />
                    </div>

                    {/* Arabic Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description_ar">{t('dashboard.description-ar')}</Label>
                        <Textarea
                            id="description_ar"
                            name="description_ar"
                            value={formik.values.description_ar}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('dashboard.enter-description-ar')}
                            dir="rtl"
                            rows={3}
                        />
                    </div>

                    {/* Price and Sale Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">{t('dashboard.price')}</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="0.00"
                            />
                            {formik.touched.price && formik.errors.price && (
                                <p className="text-sm text-red-500">{formik.errors.price}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sale_price">{t('dashboard.sale-price')}</Label>
                            <Input
                                id="sale_price"
                                name="sale_price"
                                type="number"
                                step="0.01"
                                value={formik.values.sale_price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="0.00"
                            />
                            {formik.touched.sale_price && formik.errors.sale_price && (
                                <p className="text-sm text-red-500">{formik.errors.sale_price}</p>
                            )}
                        </div>
                    </div>

                    {/* Attributes Section */}
                

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <ImagePicker
                            id="meal-image"
                            label={t('dashboard.meal-image')}
                            onChange={handleImageChange}
                        />
                        {!imageFile && !meal && (
                            <p className="text-sm text-red-500">{t('common.image-required')}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={formik.isSubmitting}
                        >
                            {t('common.cancel')}
                        </Button>
                  
                        <Button
                            type="submit"
                            disabled={isSubmitting}

                        >
                            {formik.isSubmitting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {meal ? t('common.update') : t('common.create')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
