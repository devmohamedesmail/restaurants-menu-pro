import React from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LayoutGrid, QrCode } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import EmptyState from './empty-state'

export default function TableTab({ tables, country }: any) {
    const { t } = useTranslation()
    return (
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
    )
}
