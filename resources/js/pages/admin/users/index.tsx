import React, { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import AppLayout from '@/layouts/app-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, UserCog } from 'lucide-react'

// Declare global route function from Laravel
declare function route(name: string, params?: any): string


interface User {
    id: number
    name: string
    email: string
    role: string
    created_at?: string
}

interface Props {
    users: User[]
}

export default function UsersPage({ users }: Props) {
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState('')

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleRoleChange = (userId: number) => {
        router.get(route('admin.users.change.role', userId))
    }

    const getRoleBadgeVariant = (role: string) => {
        return role === 'admin' ? 'default' : 'secondary'
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
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                            <span className="text-primary font-semibold text-sm">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="ml-4">
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
                                                    <Badge variant={getRoleBadgeVariant(user.role)}>
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleRoleChange(user.id)}
                                                    >
                                                        <UserCog className="w-4 h-4 mr-2" />
                                                        {t('users.change-role')}
                                                    </Button>
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
        </AppLayout>
    )
}
