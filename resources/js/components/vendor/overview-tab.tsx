import React from 'react'
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, UtensilsCrossed, ListFilter, QrCode } from 'lucide-react';


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


interface OverviewTabProps {
    stats: {
        totalOrders: number;
        totalRevenue: number;
        totalMeals: number;
        totalCategories: number;
    };
    country: {
        currency_symbol: string;
    };
    orders: any[];
}

export default function OverviewTab({ stats, country,orders }: OverviewTabProps) {
    const { t } = useTranslation();
    return (
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
    )
}
