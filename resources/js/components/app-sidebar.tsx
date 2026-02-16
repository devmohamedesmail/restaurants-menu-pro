import { Link } from '@inertiajs/react';
import { BookOpen, Flag, Folder, LayoutGrid, MapPinHouse, Settings, Store, Users } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';
import { useTranslation } from 'react-i18next';





export function AppSidebar() {
    const { t } = useTranslation();
    const mainNavItems: NavItem[] = [
        {
            title: t('dashboard.title'),
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: t('dashboard.setting'),
            href: '/admin/settings',
            icon: Settings,
        },
        {
            title: t('dashboard.users'),
            href: '/admin/users',
            icon: Users,
        },
        {
            title: t('dashboard.roles'),
            href: '/admin/roles',
            icon: Users,
        },
        {
            title: t('dashboard.countries'),
            href: '/admin/countries',
            icon: MapPinHouse,
        },
        {
            title: t('dashboard.banners'),
            href: '/admin/banners',
            icon: Flag,
        },
        {
            title: t('dashboard.stores'),
            href: '/admin/stores',
            icon: Store,
        },
    ];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
