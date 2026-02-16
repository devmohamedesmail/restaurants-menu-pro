import React from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ShoppingBag } from 'lucide-react'
import EmptyState from './empty-state'
import { useTranslation } from 'react-i18next'

export default function OrdersTab({ orders }: any) {
    const { t } = useTranslation()
  return (
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
  )
}
