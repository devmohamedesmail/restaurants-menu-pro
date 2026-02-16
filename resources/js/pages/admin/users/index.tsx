import React, { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
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
import { Search, Pencil, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


// Declare global route function from Laravel
// @ts-ignore
declare var route: any;


interface Role {
    id: number
    name: string
    slug: string
}

interface User {
    id: number
    name: string
    email: string
    role: Role
    role_id: number
    avatar?: string
    created_at?: string
}

interface Props {
    users: User[]
    roles: Role[]
}

export default function UsersPage({ users, roles }: Props) {
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState('')
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role_id: '',
    })

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleEditClick = (user: User) => {
        setSelectedUser(user)
        setFormData({
            name: user.name,
            email: user.email,
            role_id: user.role_id.toString(),
        })
        setEditDialogOpen(true)
    }

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user)
        setDeleteDialogOpen(true)
    }

    const handleUpdate = () => {
        if (selectedUser) {
            router.post(route('admin.users.update', selectedUser.id), formData, {
                onSuccess: () => {
                    setEditDialogOpen(false)
                    setSelectedUser(null)
                },
            })
        }
    }

    const handleDelete = () => {
        if (selectedUser) {
            router.get(route('admin.users.delete', selectedUser.id), {}, {
                onSuccess: () => {
                    setDeleteDialogOpen(false)
                    setSelectedUser(null)
                },
            })
        }
    }

    const getRoleBadgeVariant = (roleSlug: string) => {
        switch (roleSlug) {
            case 'admin':
                return 'default'
            case 'manager':
                return 'secondary'
            case 'store_owner':
                return 'outline'
            default:
                return 'secondary'
        }
    }

    const getRoleLabel = (roleSlug: string) => {
        switch (roleSlug) {
            case 'user':
                return t('users.user-role')
            case 'admin':
                return t('users.admin-role')
            case 'manager':
                return t('users.manager-role')
            case 'store_owner':
                return t('users.store-owner-role')
            default:
                return roleSlug
        }
    }

    return (
        <AppLayout>
            <Head title={t('users.title')} />

            <div className="space-y-6 px-10 py-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t('users.title')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {t('users.description')}
                        </p>
                    </div>
                </div>

                {/* Search */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder={t('users.search-users')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-800 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('users.name')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('users.email')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('users.role')}
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {t('common.actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-3">
                                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                                        <Search className="w-8 h-8 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-900 dark:text-white font-medium">
                                                            {t('users.no-users-found')}
                                                        </p>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                                            {t('users.try-different-search')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage src={user.avatar} alt={user.name} />
                                                            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {user.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Badge variant={getRoleBadgeVariant(user.role?.slug)}>
                                                        {getRoleLabel(user.role?.slug)}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleEditClick(user)}
                                                        >
                                                            <Pencil className="w-4 h-4 mr-2" />
                                                            {t('common.edit')}
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleDeleteClick(user)}
                                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            {t('common.delete')}
                                                        </Button>
                                                    </div>
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

            {/* Edit User Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('users.edit-user')}</DialogTitle>
                        <DialogDescription>
                            {t('users.edit-user-details')}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t('users.name')}</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">{t('users.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">{t('users.role')}</Label>
                            <Select
                                value={formData.role_id}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, role_id: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('users.select-role')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.id.toString()}>
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setEditDialogOpen(false)}
                        >
                            {t('common.cancel')}
                        </Button>
                        <Button onClick={handleUpdate}>
                            {t('users.update-user')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('users.delete-user')}</DialogTitle>
                        <DialogDescription>
                            {t('users.confirm-delete-user')}
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
