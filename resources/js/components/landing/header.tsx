import LangToggle from '@/components/ui/lang-toggle';
import ThemeToggle from '@/components/ui/theme-toggle';
import { usePage, Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { LogOut, LayoutDashboard, User } from 'lucide-react';
import Logo from '@/components/ui/logo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
    const { auth }: any = usePage().props;
    const { t } = useTranslation();

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
            {/* Top Header */}
            <div className="border-b border-border/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        <Logo />
                        <div className="flex items-center gap-2 sm:gap-3">
                            <LangToggle />
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Header - Navigation */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12 sm:h-14">
                    <nav className="flex items-center gap-4 sm:gap-6">
                        {/* Add navigation links here if needed */}
                    </nav>

                    {/* User Dropdown or Login/Register Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {auth?.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg hover:bg-accent/50 transition-all duration-200 outline-none">
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-semibold text-sm">
                                            {auth.user.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="hidden sm:block text-left">
                                            <p className="text-sm font-medium text-foreground">{auth.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{t('header.my-account')}</p>
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-64 sm:w-72">
                                    {/* User Info Section */}
                                    <div className="p-4 border-b border-border bg-accent/20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-lg">
                                                {auth.user.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-foreground truncate">{auth.user.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{auth.user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="cursor-pointer">
                                            <LayoutDashboard className="w-5 h-5 text-primary" />
                                            <span>{t('header.dashboard')}</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <User className="w-5 h-5 text-primary" />
                                            <span>{t('header.profile')}</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem variant="destructive" onClick={handleLogout} className="cursor-pointer">
                                        <LogOut className="w-5 h-5" />
                                        <span>{t('auth.logout')}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-3 sm:px-4 py-2 rounded-lg border border-border hover:bg-accent/50 font-medium text-sm transition-colors duration-200"
                                >
                                    {t('auth.login')}
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors duration-200"
                                >
                                    {t('auth.register')}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
