import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { router } from '@inertiajs/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
interface TableDialogProps {
    table?: any
    onClose: () => void
    open: boolean
    isEdit: boolean
}
declare function route(name: string, params?: any): string
export default function TableDialog({ open, isEdit, table, onClose }: TableDialogProps) {
    const { t } = useTranslation()
    // const isEdit = Boolean(table)

    const validationSchema = Yup.object({
        name: Yup.string().required(t('tables.table-name-required')),
        capacity: Yup.number()
            .required(t('tables.capacity-required'))
            .min(1, t('tables.capacity-min'))
            .integer(t('tables.capacity-integer')),
    })

    const formik = useFormik({
        initialValues: {
            name: table?.name || '',
            capacity: table?.capacity || 4,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (isEdit) {
                router.put(route('store.table.update', table.id), values, {
                    onSuccess: () => {
                        onClose()
                        formik.resetForm()
                    },
                    onError: (errors) => {
                        console.error('Update failed:', errors)
                    }
                })
            } else {
                router.post(route('store.table.store'), values, {
                    onSuccess: () => {
                        onClose()
                        formik.resetForm()
                    },
                    onError: (errors) => {
                        console.error('Creation failed:', errors)
                    }
                })
            }
        },
    })

    return (
      
            <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? t('tables.edit-table') : t('tables.add-table')}
                        </DialogTitle>
                       
                    </DialogHeader>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                {t('tables.table-name')}
                            </label>
                            <Input
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder={t('tables.enter-table-name')}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm mt-1">{String(formik.errors.name)}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                {t('tables.capacity')}
                            </label>
                            <Input
                                type="number"
                                name="capacity"
                                value={formik.values.capacity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                min="1"
                                placeholder={t('tables.enter-capacity')}
                            />
                            {formik.touched.capacity && formik.errors.capacity && (
                                <p className="text-red-500 text-sm mt-1">{String(formik.errors.capacity)}</p>
                            )}
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-500 hover:bg-gray-600"
                            >
                                {t('common.cancel')}
                            </Button>
                            <Button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="flex-1"
                            >
                                {formik.isSubmitting ? t('common.saving') : isEdit ? t('common.update') : t('common.save')}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
  
    )
}
