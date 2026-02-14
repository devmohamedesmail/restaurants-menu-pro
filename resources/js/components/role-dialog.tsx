import React from 'react'
import { router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

declare function route(name: string, params?: any): string

interface Role {
    id: number
    name: string
    slug: string
}

interface RoleDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    role: Role | null
}

export default function RoleDialog({ open, onOpenChange, role }: RoleDialogProps) {
    const { t } = useTranslation()
    const isEditing = !!role

    const validationSchema = Yup.object({
        name: Yup.string().required(t('roles.role-name-required')),
        slug: Yup.string().required(t('roles.role-slug-required')),
    })

    const initialValues = {
        name: role?.name || '',
        slug: role?.slug || '',
    }

    const handleSubmit = (values: typeof initialValues, { setSubmitting }: any) => {
        if (isEditing) {
            // Update existing role using Inertia
            router.post(route('roles.update', role.id), values, {
                onSuccess: () => {
                    onOpenChange(false)
                    setSubmitting(false)
                },
                onError: () => {
                    setSubmitting(false)
                }
            })
        } else {
            // Create new role using Inertia
            router.post(route('roles.store'), values, {
                onSuccess: () => {
                    onOpenChange(false)
                    setSubmitting(false)
                },
                onError: () => {
                    setSubmitting(false)
                }
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? t('roles.edit-role') : t('roles.add-role')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('roles.fill-role-details')}
                    </DialogDescription>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('roles.role-name')}</Label>
                                <Field
                                    as={Input}
                                    id="name"
                                    name="name"
                                    placeholder={t('roles.enter-role-name')}
                                />
                                <ErrorMessage name="name" component="p" className="text-sm text-red-500" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">{t('roles.role-slug')}</Label>
                                <Field
                                    as={Input}
                                    id="slug"
                                    name="slug"
                                    placeholder={t('roles.enter-role-slug')}
                                />
                                <ErrorMessage name="slug" component="p" className="text-sm text-red-500" />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    disabled={isSubmitting}
                                >
                                    {t('common.cancel')}
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? t('common.saving') : (isEditing ? t('common.update') : t('common.create'))}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}
