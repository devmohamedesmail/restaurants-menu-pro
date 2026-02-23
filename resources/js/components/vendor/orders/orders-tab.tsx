
import { TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag,Clock,CheckCircle2,XCircle} from 'lucide-react'
import EmptyState from '@/components/vendor/empty-state'
import { useTranslation } from 'react-i18next'
import OrderCard from '@/components/vendor/orders/order-card'



type OrderStatus = 'pending' | 'completed' | 'cancelled'

interface OrderItem {
  id: number
  name_en: string
  name_ar: string
  price: string | number
  quantity: number
}

interface Order {
  id: number
  store_id: number
  user_id: number | null
  table_id: number | null
  table: string | null
  name: string | null
  phone: string | null
  address: string | null
  location: string | null
  note: string | null
  order: OrderItem[]
  total: string
  status: OrderStatus
  created_at: string
}







export default function OrdersTab({ orders }: { orders: Order[] }) {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'

  const pending = orders?.filter(o => o.status === 'pending') ?? []
  const completed = orders?.filter(o => o.status === 'completed') ?? []
  const cancelled = orders?.filter(o => o.status === 'cancelled') ?? []

  return (
    <TabsContent value="orders">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              {t('dashboard.orders')}
            </CardTitle>
            <CardDescription>{t('dashboard.manage-orders')}</CardDescription>
          </div>

          {/* Summary pills */}
          {orders?.length > 0 && (
            <div className="flex gap-2 flex-wrap shrink-0">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
                <Clock className="w-3 h-3" /> {pending.length}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                <CheckCircle2 className="w-3 h-3" /> {completed.length}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                <XCircle className="w-3 h-3" /> {cancelled.length}
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {orders?.length > 0 ? (
            <div className="space-y-3">
              {/* Pending first, then completed, then cancelled */}
              {[...pending, ...completed, ...cancelled].map(order => (
                <OrderCard key={order.id} order={order} isAr={isAr} />
                
              ))}
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
