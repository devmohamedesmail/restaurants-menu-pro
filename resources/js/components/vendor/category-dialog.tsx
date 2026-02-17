import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import ImagePicker from '../ui/image-picker'

interface Category {
    id?: number
    name_en: string
    name_ar: string
    image: string
    position: number
}

interface Props {
    open: boolean
    onClose: () => void
    category?: Category
}
declare function route(name: string, params?: any): string

export default function CategoryDialog({ open, onClose, category }: Props) {
    const { t } = useTranslation()
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const validationSchema = Yup.object({
        name_en: Yup.string().required(t('common.required-field')),
        name_ar: Yup.string().required(t('common.required-field')),
        position: Yup.number().min(0, t('common.must-be-positive')),
    })

    const formik = useFormik({
        initialValues: {
            name_en: category?.name_en || '',
            name_ar: category?.name_ar || '',
            position: category?.position || 0,
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
             setLoading(true)
            const formData = new FormData()
            formData.append('name_en', values.name_en)
            formData.append('name_ar', values.name_ar)
            formData.append('position', values.position.toString())

            if (imageFile) {
                formData.append('image', imageFile)
            } else if (!category) {
                formik.setFieldError('image', t('required-field'))
                return
            }

            if (category?.id) {
                formData.append('_method', 'PUT')
                router.post(route('store.category.update', category.id), formData, {
                    onSuccess: () => {
                        onClose()
                        formik.resetForm()
                        setImageFile(null)
                        setLoading(false)
                    },
                    onError: (errors) => {
                        formik.setErrors(errors)
                        setLoading(false)
                    },
                })

            } else {

                router.post(route('store.category.store'), formData, {
                    onSuccess: () => {
                        onClose()
                        formik.resetForm()
                        setImageFile(null)
                        setLoading(false)
                    },
                    onError: (errors) => {
                        formik.setErrors(errors)
                        setLoading(false)
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
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>
                        {category ? t('dashboard.edit-category') : t('dashboard.add-category')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('dashboard.fill-category-details')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* English Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name_en">{t('dashboard.category-name-en')}</Label>
                        <Input
                            id="name_en"
                            name="name_en"
                            value={formik.values.name_en}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('dashboard.enter-category-name-en')}
                        />
                        {formik.touched.name_en && formik.errors.name_en && (
                            <p className="text-sm text-red-500">{formik.errors.name_en}</p>
                        )}
                    </div>

                    {/* Arabic Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name_ar">{t('dashboard.category-name-ar')}</Label>
                        <Input
                            id="name_ar"
                            name="name_ar"
                            value={formik.values.name_ar}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('dashboard.enter-category-name-ar')}
                            dir="rtl"
                        />
                        {formik.touched.name_ar && formik.errors.name_ar && (
                            <p className="text-sm text-red-500">{formik.errors.name_ar}</p>
                        )}
                    </div>

                    {/* Position */}
                    <div className="space-y-2">
                        <Label htmlFor="position">{t('dashboard.position')}</Label>
                        <Input
                            id="position"
                            name="position"
                            type="number"
                            value={formik.values.position}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={t('dashboard.enter-position')}
                        />
                        {formik.touched.position && formik.errors.position && (
                            <p className="text-sm text-red-500">{formik.errors.position}</p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <ImagePicker
                            id="category-image"
                            label={t('dashboard.category-image')}
                            onChange={handleImageChange}
                        />
                        {!imageFile && !category && (
                            <p className="text-sm text-red-500">{t('dashboard.image-required')}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}

                        >
                            {t('dashboard.cancel')}
                        </Button>
                        <Button
                            className='bg-primary hover:bg-primary/80'
                            type="submit"

                            disabled={loading}>
                            {loading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {category ? t('dashboard.update') : t('dashboard.create')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
