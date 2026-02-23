import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { router } from '@inertiajs/react'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, ChevronDown, ChevronUp, Clock, FileText, MapPin, Navigation, Phone, Table2, User, XCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'



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

const STATUS_CONFIG: Record<OrderStatus, { label_en: string; label_ar: string; variant: string; icon: React.ReactNode }> = {
    pending: {
        label_en: 'Pending',
        label_ar: 'قيد الانتظار',
        variant: 'warning',
        icon: <Clock className="w-3 h-3" />,
    },
    completed: {
        label_en: 'Completed',
        label_ar: 'مكتمل',
        variant: 'success',
        icon: <CheckCircle2 className="w-3 h-3" />,
    },
    cancelled: {
        label_en: 'Cancelled',
        label_ar: 'ملغى',
        variant: 'destructive',
        icon: <XCircle className="w-3 h-3" />,
    },
}


function StatusBadge({ status, isAr }: { status: OrderStatus; isAr: boolean }) {
    const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending
    const colorMap: Record<string, string> = {
        warning: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
        success: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
        destructive: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
    }
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorMap[cfg.variant]}`}>
            {cfg.icon}
            {isAr ? cfg.label_ar : cfg.label_en}
        </span>
    )
}




declare function route(name: string, params?: any): string
export default function OrderCard({ order, isAr }: { order: Order; isAr: boolean }) {
    const { t } = useTranslation()
    const [expanded, setExpanded] = useState(false)
    const [updating, setUpdating] = useState(false)
    const isDelivery = !order.table_id && !order.table

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleString(isAr ? 'ar-SA' : 'en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        })

    const changeStatus = (status: OrderStatus) => {
        setUpdating(true)
        router.post(
            route('store.order.update.status', order.id),
            { status },
            {
                preserveScroll: true,
                onFinish: () => setUpdating(false),
            }
        )
    }

    return (
        <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-0">
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDelivery ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-primary/10'}`}>
                            {isDelivery
                                ? <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                : <Table2 className="w-5 h-5 text-primary" />
                            }
                        </div>
                        <div>
                            <p className="font-bold text-sm">
                                {t('dashboard.order')} #{order.id}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatDate(order.created_at)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <StatusBadge status={order.status} isAr={isAr} />
                        <span className="font-bold text-primary text-sm">
                            {parseFloat(order.total).toFixed(2)}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 rounded-full"
                            onClick={() => setExpanded(v => !v)}
                        >
                            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>

                    </div>
                </div>

                {expanded && (
                    <>
                        <Separator />
                        <div className="p-4 space-y-4">
                            {/* Customer / Table info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {isDelivery ? (
                                    <>
                                        {order.name && (
                                            <div className="flex items-start gap-2 text-sm">
                                                <User className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                                <span>{order.name}</span>
                                            </div>
                                        )}
                                        {order.phone && (
                                            <div className="flex items-start gap-2 text-sm">
                                                <Phone className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                                <a href={`tel:${order.phone}`} className="hover:underline text-primary">
                                                    {order.phone}
                                                </a>
                                            </div>
                                        )}
                                        {order.address && (
                                            <div className="flex items-start gap-2 text-sm sm:col-span-2">
                                                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                                <span>{order.address}</span>
                                            </div>
                                        )}
                                        {order.location && (
                                            <div className="flex items-start gap-2 text-sm sm:col-span-2">
                                                <Navigation className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                                <a
                                                    href={order.location}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline truncate"
                                                >
                                                    {t('menu.location_link')}
                                                </a>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Table2 className="w-4 h-4 text-muted-foreground shrink-0" />
                                        <span>{t('dashboard.table')}: <strong>{order.table}</strong></span>
                                    </div>
                                )}

                                {order.note && (
                                    <div className="flex items-start gap-2 text-sm sm:col-span-2">
                                        <FileText className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                        <span className="italic text-muted-foreground">{order.note}</span>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            {/* Order items */}
                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                    {t('dashboard.orders')} ({order.order?.length ?? 0} {t('menu.items')})
                                </p>
                                <div className="space-y-1.5">
                                    {order.order?.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="w-6 h-6 bg-secondary text-xs rounded-md flex items-center justify-center font-bold shrink-0">
                                                    {item.quantity}×
                                                </span>
                                                <span className="text-foreground">
                                                    {isAr ? item.name_ar : item.name_en}
                                                </span>
                                            </div>
                                            <span className="font-medium text-primary shrink-0">
                                                {(parseFloat(String(item.price)) * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between font-bold text-sm pt-1 border-t border-dashed border-border">
                                    <span>{t('menu.total')}</span>
                                    <span className="text-primary">{parseFloat(order.total).toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Status actions */}
                            {order.status === 'pending' && (
                                <>
                                    <Separator />
                                    <div className="flex gap-2 flex-wrap">
                                        <Button
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700 text-white gap-1.5"
                                            disabled={updating}
                                            onClick={() => changeStatus('completed')}
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            {t('menu.mark_completed')}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="gap-1.5"
                                            disabled={updating}
                                            onClick={() => changeStatus('cancelled')}
                                        >
                                            <XCircle className="w-4 h-4" />
                                            {t('menu.mark_cancelled')}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
