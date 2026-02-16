import React from 'react';
// @ts-ignore
declare var route: any;
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import {
  LayoutDashboard,
  User,
  LogOut,
  UtensilsCrossed,
  ListFilter,
  ShoppingBag,
  LayoutGrid,
  MapPin,
  Phone,
  Mail,
  Edit,
  QrCode,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Assuming you created this or use Radix

export default function Dashboard({ store, categories, meals, orders, tables, country, stats }: any) {
  const { auth }: any = usePage().props;
  const { t } = useTranslation();

  const handleLogout = () => {
    router.post(route('logout'));
  };

  if (!store) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
      <Head title={`${store.name} - ${t('header.dashboard')}`} />

      {/* Header Section */}
      <div className="relative bg-white dark:bg-gray-800 border-b border-border shadow-sm">
        {/* Banner Background */}
        <div className="h-48 w-full relative overflow-hidden bg-gray-100 dark:bg-gray-700">
          {store.banner ? (
            <img
              src={store.banner}
              alt="Store Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <StoreBannerPlaceholder />
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 pb-6">
          <div className="relative -mt-16 flex flex-col md:flex-row items-end md:items-center gap-6">
            {/* Store Logo */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 rounded-xl border-4 border-white dark:border-gray-800 shadow-lg bg-white overflow-hidden">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <Badge variant={store.is_active ? "default" : "destructive"} className="shadow-sm">
                  {store.is_active ? t('common.active') : t('common.inactive')}
                </Badge>
              </div>
            </div>

            {/* Store Info */}
            <div className="flex-1 text-white md:text-gray-900 md:dark:text-white mb-2 md:mb-0 w-full">
              <h1 className="text-3xl font-bold drop-shadow-md md:drop-shadow-none">{store.name}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-200 md:text-gray-500 dark:text-gray-400 font-medium">
                {store.address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{store.address}</span>
                  </div>
                )}
                {store.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    <span>{store.phone}</span>
                  </div>
                )}
                {store.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    <span>{store.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions & User Menu */}
            <div className="flex items-center gap-3 self-center md:self-end mb-2 md:mb-6">
              <Button variant="outline" size="sm" asChild className="hidden md:flex">
                <Link href={route('register.store.page')}>
                  <Edit className="w-4 h-4 mr-2" />
                  {t('dashboard.edit-details')}
                </Link>
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {auth.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{auth.user.name}</p>
                      <p className="w-50 truncate text-sm text-muted-foreground">
                        {auth.user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={route('dashboard')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>{t('header.dashboard')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={route('profile.edit')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>{t('header.profile')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('auth.logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full space-y-6">
          <div className="flex items-center justify-between pb-4 overflow-x-auto">
            <TabsList className="bg-white dark:bg-gray-800 p-1 border border-border shadow-sm rounded-lg h-auto">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2.5 px-4 h-auto">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                {t('dashboard.overview')}
              </TabsTrigger>
              <TabsTrigger value="categories" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2.5 px-4 h-auto">
                <ListFilter className="w-4 h-4 mr-2" />
                {t('dashboard.categories')}
              </TabsTrigger>
              <TabsTrigger value="meals" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2.5 px-4 h-auto">
                <UtensilsCrossed className="w-4 h-4 mr-2" />
                {t('dashboard.meals')}
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2.5 px-4 h-auto">
                <ShoppingBag className="w-4 h-4 mr-2" />
                {t('dashboard.orders')}
              </TabsTrigger>
              <TabsTrigger value="tables" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary py-2.5 px-4 h-auto">
                <LayoutGrid className="w-4 h-4 mr-2" />
                {t('dashboard.tables')}
              </TabsTrigger>
            </TabsList>

            {/* Mobile Edit Button (visible only on small screens) */}
            <Button variant="outline" size="sm" asChild className="md:hidden ml-2">
              <Link href={route('register.store.page')}>
                <Edit className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title={t('dashboard.total-orders')}
                value={stats?.totalOrders || 0}
                icon={<ShoppingBag className="w-5 h-5 text-blue-500" />}
                className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
              />
              <StatsCard
                title={t('dashboard.total-revenue')}
                value={`${stats?.totalRevenue || 0} ${country?.currency_symbol || '$'}`}
                icon={<span className="text-xl font-bold text-green-500">$</span>}
                className="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800"
              />
              <StatsCard
                title={t('dashboard.total-meals')}
                value={stats?.totalMeals || 0}
                icon={<UtensilsCrossed className="w-5 h-5 text-orange-500" />}
                className="bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800"
              />
              <StatsCard
                title={t('dashboard.total-categories')}
                value={stats?.totalCategories || 0}
                icon={<ListFilter className="w-5 h-5 text-purple-500" />}
                className="bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800"
              />
            </div>

            {/* Recent Activity / Quick Actions could go here */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>{t('dashboard.recent-orders')}</CardTitle>
                  <CardDescription>{t('dashboard.recent-orders-desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders?.length > 0 ? (
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order: any) => (
                        <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                          <div>
                            <p className="font-medium">#{order.id}</p>
                            <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                          <Badge variant="outline">{order.status}</Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>{t('dashboard.no-orders-yet')}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard.quick-actions')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="#">
                      <UtensilsCrossed className="w-4 h-4 mr-2" />
                      {t('dashboard.add-new-meal')}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="#">
                      <ListFilter className="w-4 h-4 mr-2" />
                      {t('dashboard.add-new-category')}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="#">
                      <QrCode className="w-4 h-4 mr-2" />
                      {t('dashboard.generate-qr')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t('dashboard.categories')}</CardTitle>
                  <CardDescription>{t('dashboard.manage-categories')}</CardDescription>
                </div>
                <Button>
                  <ListFilter className="w-4 h-4 mr-2" />
                  {t('dashboard.add-new-category')}
                </Button>
              </CardHeader>
              <CardContent>
                {categories?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category: any) => (
                      <div key={category.id} className="group relative rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                        <div className="aspect-video rounded-md bg-muted mb-3 overflow-hidden">
                          {category.image ? (
                            <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                              <ListFilter className="w-8 h-8 opacity-20" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold truncate">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.meals_count} {t('dashboard.total-meals')}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<ListFilter className="w-12 h-12" />}
                    title={t('dashboard.no-categories')}
                    description={t('dashboard.create-first-category')}
                    actionText={t('dashboard.add-new-category')}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meals Tab */}
          <TabsContent value="meals">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t('dashboard.meals')}</CardTitle>
                  <CardDescription>{t('dashboard.manage-meals')}</CardDescription>
                </div>
                <Button>
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  {t('dashboard.add-new-meal')}
                </Button>
              </CardHeader>
              <CardContent>
                {meals?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {meals.map((meal: any) => (
                      <div key={meal.id} className="flex gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                        <div className="w-20 h-20 rounded-md bg-muted overflow-hidden shrink-0">
                          {meal.image ? (
                            <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                              <UtensilsCrossed className="w-8 h-8 opacity-20" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{meal.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{meal.category?.name}</p>
                          <p className="font-medium mt-1">{meal.price} {country?.currency_symbol}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<UtensilsCrossed className="w-12 h-12" />}
                    title={t('dashboard.no-meals')}
                    description={t('dashboard.create-first-meal')}
                    actionText={t('dashboard.add-new-meal')}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.orders')}</CardTitle>
                <CardDescription>{t('dashboard.manage-orders')}</CardDescription>
              </CardHeader>
              <CardContent>
                {orders?.length > 0 ? (
                  <div className="space-y-4">
                    {/* Order list implementation */}
                    <p>Orders list here...</p>
                  </div>
                ) : (
                  <EmptyState
                    icon={<ShoppingBag className="w-12 h-12" />}
                    title={t('dashboard.no-orders')}
                    description={t('dashboard.wait-for-orders')}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tables Tab */}
          <TabsContent value="tables">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t('dashboard.tables')}</CardTitle>
                  <CardDescription>{t('dashboard.manage-tables')}</CardDescription>
                </div>
                <Button>
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  {t('dashboard.add-table')}
                </Button>
              </CardHeader>
              <CardContent>
                {tables?.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {tables.map((table: any) => (
                      <div key={table.id} className="flex flex-col items-center justify-center p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                          {table.number || table.name}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{t('dashboard.table')} {table.number}</p>
                          <QrCode className="w-8 h-8 mt-2 mx-auto text-muted-foreground opacity-50" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<LayoutGrid className="w-12 h-12" />}
                    title={t('dashboard.no-tables')}
                    description={t('dashboard.create-tables-qr')}
                    actionText={t('dashboard.add-table')}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, className }: any) {
  return (
    <Card className={`border-l-4 shadow-sm ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/50 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ icon, title, description, actionText, onAction }: any) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted/50 p-4 rounded-full mb-4 text-muted-foreground">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mb-6">{description}</p>
      {actionText && (
        <Button onClick={onAction} variant="outline">
          {actionText}
        </Button>
      )}
    </div>
  );
}

function StoreBannerPlaceholder() {
  return (
    <svg className="w-full h-full opacity-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M4 6h16v12H4z" />
    </svg>
  )
}
