import React, { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AppLayout from '@/layouts/app-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import ImagePicker from '@/components/ui/image-picker'
import InputError from '@/components/input-error'
import { Search, Plus, MoreVertical, Pencil, Trash2, Store as StoreIcon, Mail, Phone, CheckCircle, XCircle, Star } from 'lucide-react'

// Declare global route function from Laravel
declare function route(name: string, params?: any): string

interface User {
    id: number
    name: string
    email: string
}

interface Country {
    id: number
    name_en: string
    name_ar: string
}

interface Store {
    id: number
    name: string
    email?: string
    phone?: string
    address?: string
    description?: string
    image?: string
    banner?: string
    user_id: number
    country_id: number
    is_active: boolean
    is_featured: boolean
    is_verified: boolean
    user?: User
    country?: Country
    created_at?: string
}

interface Props {
    stores: Store[]
    users?: User[]
    countries?: Country[]
}

export default function StoresPage({ stores, users = [], countries = [] }: Props) {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'
    const [searchTerm, setSearchTerm] = useState('')
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedStore, setSelectedStore] = useState<Store | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const filteredStores = stores.filter((store) =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required(t('stores.store-name') + ' ' + t('common.required-field')),
        email: Yup.string().email(t('auth.invalid-email')).nullable(),
        phone: Yup.string().nullable(),
        address: Yup.string().nullable(),
        description: Yup.string().nullable(),
        user_id: Yup.string().required(t('stores.store-owner') + ' ' + t('common.required-field')),
        country_id: Yup.string().required(t('stores.store-country') + ' ' + t('common.required-field')),
        image: Yup.mixed()
            .nullable()
            .test('fileSize', t('common.file-size-limit'), (value) => {
                if (!value) return true
                return value instanceof File && value.size <= 2 * 1024 * 1024 // 2MB
            }),
        banner: Yup.mixed()
            .nullable()
            .test('fileSize', t('common.file-size-limit'), (value) => {
                if (!value) return true
                return value instanceof File && value.size <= 2 * 1024 * 1024 // 2MB
            }),
    })

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            description: '',
            user_id: '',
            country_id: '',
            image: null as File | null,
            banner: null as File | null,
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true)

            const formData = new FormData()
            formData.append('name', values.name)
            if (values.email) formData.append('email', values.email)
            if (values.phone) formData.append('phone', values.phone)
            if (values.address) formData.append('address', values.address)
            if (values.description) formData.append('description', values.description)
            formData.append('user_id', values.user_id)
            formData.append('country_id', values.country_id)
            if (values.image) formData.append('image', values.image)
            if (values.banner) formData.append('banner', values.banner)

            try {
                if (selectedStore) {
                    await router.post(route('store.update', selectedStore.id), formData, {
                        onSuccess: () => {
                            setEditDialogOpen(false)
                            setSelectedStore(null)
                            formik.resetForm()
                            setIsSubmitting(false)
                        },
                        onError: (errors) => {
                            setIsSubmitting(false)
                            Object.keys(errors).forEach((key) => {
                                formik.setFieldError(key, errors[key])
                            })
                        },
                    })
                } else {
                    await router.post(route('store.store'), formData, {
                        onSuccess: () => {
                            setEditDialogOpen(false)
                            formik.resetForm()
                            setIsSubmitting(false)
                        },
                        onError: (errors) => {
                            setIsSubmitting(false)
                            Object.keys(errors).forEach((key) => {
                                formik.setFieldError(key, errors[key])
                            })
                        },
                    })
                }
            } catch (error) {
                setIsSubmitting(false)
            }
        },
    })

    const handleAddClick = () => {
        setSelectedStore(null)
        formik.resetForm()
        setEditDialogOpen(true)
    }

    const handleEditClick = (store: Store) => {
        setSelectedStore(store)
        formik.setValues({
            name: store.name,
            email: store.email || '',
            phone: store.phone || '',
            address: store.address || '',
            description: store.description || '',
            user_id: store.user_id.toString(),
            country_id: store.country_id.toString(),
            image: null,
            banner: null,
        })
        setEditDialogOpen(true)
    }

    const handleDeleteClick = (store: Store) => {
        setSelectedStore(store)
        setDeleteDialogOpen(true)
    }

    const handleDelete = () => {
        if (selectedStore) {
            router.get(route('store.delete', selectedStore.id), {}, {
                onSuccess: () => {
                    setDeleteDialogOpen(false)
                    setSelectedStore(null)
                },
            })
        }
    }

    const toggleStatus = (storeId: number, field: 'is_active' | 'is_featured' | 'is_verified', currentValue: boolean) => {
        router.post(route('store.toggle-status', storeId), {
            field,
            value: !currentValue,
        }, {
            preserveScroll: true,
        })
    }

    return (
        <AppLayout>
            <Head title={t('stores.title')} />

            <div className="space-y-6 px-10 py-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t('stores.title')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {t('stores.manage-stores-desc')}
                        </p>
                    </div>
                    <Button onClick={handleAddClick}>
                        <Plus className="w-4 h-4 mr-2" />
                        {t('stores.add-store')}
                    </Button>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder={t('stores.search-stores')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Stores Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('stores.store-name')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('stores.owner')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('stores.store-country')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('common.status')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('common.actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredStores.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-3">
                                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                                        <Search className="w-8 h-8 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-900 dark:text-white font-medium">
                                                            {t('stores.no-stores-found')}
                                                        </p>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                                            {t('stores.try-different-search')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredStores.map((store) => (
                                            <tr key={store.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {store.image ? (
                                                            <img
                                                                src={store.image}
                                                                alt={store.name}
                                                                className="w-12 h-12 rounded-lg object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                                                <StoreIcon className="w-6 h-6 text-primary" />
                                                            </div>
                                                        )}
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {store.name}
                                                            </div>
                                                            {store.email && (
                                                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                    <Mail className="w-3 h-3 mr-1" />
                                                                    {store.email}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                            <span className="text-blue-600 dark:text-blue-300 font-semibold text-xs">
                                                                {store.user?.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm text-gray-900 dark:text-white">
                                                                {store.user?.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {store.user?.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {isArabic ? store.country?.name_ar : store.country?.name_en}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-wrap gap-1">
                                                        <Badge
                                                            variant={store.is_active ? 'default' : 'secondary'}
                                                            className="text-xs"
                                                        >
                                                            {store.is_active ? t('common.active') : t('common.inactive')}
                                                        </Badge>
                                                        {store.is_featured && (
                                                            <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-xs">
                                                                <Star className="w-3 h-3 mr-1" />
                                                                {t('common.featured')}
                                                            </Badge>
                                                        )}
                                                        {store.is_verified && (
                                                            <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-xs">
                                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                                {t('common.verified')}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <MoreVertical className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-56">
                                                            <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => handleEditClick(store)}>
                                                                <Pencil className="w-4 h-4 mr-2" />
                                                                {t('common.edit')}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => toggleStatus(store.id, 'is_active', store.is_active)}
                                                            >
                                                                {store.is_active ? (
                                                                    <>
                                                                        <XCircle className="w-4 h-4 mr-2" />
                                                                        {t('common.deactivate')}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                                        {t('common.activate')}
                                                                    </>
                                                                )}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => toggleStatus(store.id, 'is_featured', store.is_featured)}
                                                            >
                                                                <Star className="w-4 h-4 mr-2" />
                                                                {store.is_featured ? t('common.unfeature') : t('common.feature')}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => toggleStatus(store.id, 'is_verified', store.is_verified)}
                                                            >
                                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                                {store.is_verified ? t('common.unverify') : t('common.verify')}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => handleDeleteClick(store)}
                                                                className="text-red-600 focus:text-red-600"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                {t('common.delete')}
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
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

            {/* Edit/Add Store Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedStore ? t('stores.edit-store') : t('stores.add-store')}
                        </DialogTitle>
                        <DialogDescription>
                            {t('stores.fill-store-details')}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={formik.handleSubmit} className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('stores.store-name')}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={isSubmitting}
                                    placeholder={t('stores.enter-store-name')}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <InputError message={formik.errors.name} />
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('stores.store-email')}</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={isSubmitting}
                                    placeholder={t('stores.enter-store-email')}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <InputError message={formik.errors.email} />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('stores.store-phone')}</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={isSubmitting}
                                    placeholder={t('stores.enter-store-phone')}
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <InputError message={formik.errors.phone} />
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">{t('stores.store-address')}</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    disabled={isSubmitting}
                                    placeholder={t('stores.enter-store-address')}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <InputError message={formik.errors.address} />
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="user_id">{t('stores.store-owner')}</Label>
                                <Select
                                    value={formik.values.user_id}
                                    onValueChange={(value) => formik.setFieldValue('user_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('stores.select-owner')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user) => (
                                            <SelectItem key={user.id} value={user.id.toString()}>
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formik.touched.user_id && formik.errors.user_id && (
                                    <InputError message={formik.errors.user_id} />
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country_id">{t('stores.store-country')}</Label>
                                <Select
                                    value={formik.values.country_id}
                                    onValueChange={(value) => formik.setFieldValue('country_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('stores.select-country')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem key={country.id} value={country.id.toString()}>
                                                {isArabic ? country.name_ar : country.name_en}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formik.touched.country_id && formik.errors.country_id && (
                                    <InputError message={formik.errors.country_id} />
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">{t('stores.store-description')}</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={isSubmitting}
                                placeholder={t('stores.enter-store-description')}
                                rows={3}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <InputError message={formik.errors.description} />
                            )}
                        </div>

                        <ImagePicker
                            id="image"
                            label={t('stores.store-image')}
                            accept="image/*"
                            onChange={(file) => formik.setFieldValue('image', file)}
                            disabled={isSubmitting}
                            error={formik.touched.image && formik.errors.image ? String(formik.errors.image) : undefined}
                            previewClassName="h-40 object-contain"
                        />

                        <ImagePicker
                            id="banner"
                            label={t('stores.store-banner')}
                            accept="image/*"
                            onChange={(file) => formik.setFieldValue('banner', file)}
                            disabled={isSubmitting}
                            error={formik.touched.banner && formik.errors.banner ? String(formik.errors.banner) : undefined}
                            previewClassName="h-48 object-cover"
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setEditDialogOpen(false)
                                    formik.resetForm()
                                }}
                                disabled={isSubmitting}
                            >
                                {t('common.cancel')}
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        {t('common.saving')}
                                    </>
                                ) : (
                                    selectedStore ? t('stores.update-store') : t('stores.create-store')
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('stores.delete-store')}</DialogTitle>
                        <DialogDescription>
                            {t('stores.confirm-delete-store')}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            {t('common.cancel')}
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                        >
                            {t('common.delete')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}
