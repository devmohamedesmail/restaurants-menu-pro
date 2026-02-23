import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Users, Store, ShoppingCart } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    users: any[];
    stores: any[];
    orders: any[];
}

const stats = [
    {
        key: 'users',
        label: 'Total Users',
        icon: Users,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
    },
    {
        key: 'stores',
        label: 'Total Stores',
        icon: Store,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
    },
    {
        key: 'orders',
        label: 'Total Orders',
        icon: ShoppingCart,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
    },
];

export default function Dashboard({ users, stores, orders }: DashboardProps) {
    const counts: Record<string, number> = {
        users: users?.length ?? 0,
        stores: stores?.length ?? 0,
        orders: orders?.length ?? 0,
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-3">
                    {stats.map(({ key, label, icon: Icon, color, bg }) => (
                        <div
                            key={key}
                            className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 bg-white p-5 shadow-sm dark:border-sidebar-border dark:bg-sidebar"
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${bg}`}>
                                <Icon className={`h-6 w-6 ${color}`} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{label}</p>
                                <p className="text-3xl font-bold">{counts[key]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
