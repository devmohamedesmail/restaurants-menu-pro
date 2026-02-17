import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Eye, Printer, QrCode, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { router } from '@inertiajs/react'
import toast from 'react-hot-toast'




interface Table {
    id: number
    store_id: number
    name: string
    capacity: number
    qr_code: string | null
    created_at: string
    updated_at: string
}

declare function route(name: string, params?: any): string
export default function TableCard({ table ,setSelectedTable,setShowDialog,setQrTable ,setShowQRModal}: any) {
    const {t}=useTranslation();


       const handleEditTable = (table: Table) => {
        setSelectedTable(table)
        setShowDialog(true)
    }

    const handleDeleteTable = (tableId: number) => {
        if (confirm(t('tables.confirm-delete-table'))) {
            router.delete(route('store.table.delete', tableId), {
                onSuccess: () => {
                    toast.success(t('tables.table-deleted-successfully'))
                },
                onError: (errors) => {
                    toast.error(t('tables.table-deleted-failed'))
                }
            })
        }
    }


    const handleViewQR = (table: Table) => {
        setQrTable(table)
        setShowQRModal(true)
    }

    const handlePrintQR = (table: Table) => {
        const printWindow = window.open('', '', 'height=600,width=800')
        if (printWindow && table.qr_code) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>${t('store.print-qr-code')} - ${table.name}</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                padding: 40px;
                                text-align: center;
                            }
                            h1 {
                                margin-bottom: 10px;
                                font-size: 32px;
                            }
                            h2 {
                                color: #666;
                                margin-bottom: 30px;
                                font-size: 24px;
                            }
                            img {
                                max-width: 400px;
                                border: 4px solid #333;
                                border-radius: 10px;
                                margin-bottom: 20px;
                            }
                            p {
                                font-size: 18px;
                                color: #888;
                            }
                            @media print {
                                body {
                                    padding: 0;
                                }
                            }
                        </style>
                    </head>
                    <body>
                   
                        <h2>${table.name}</h2>
                        <img src="${table.qr_code}" alt="${table.name} QR Code" />
                        <p>${t('store.scan-to-order')}</p>
                    </body>
                </html>
            `)
            printWindow.document.close()
            setTimeout(() => {
                printWindow.print()
            }, 500)
        }
    }

    return (
        <Card key={table.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-r from-main to-second p-4 text-white">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-black text-xl">{table.name}</h3>
                    <Badge className="text-black">
                        {table.capacity}        
                    </Badge>

                </div>
            </div>

            <CardContent className="p-4">
                {table.qr_code ? (
                    <div className="mb-4">
                        <div className="bg-white p-3 rounded border-2 border-gray-200 flex items-center justify-center">
                            <img
                                src={table.qr_code}
                                alt={`${table.name} QR Code`}
                                className="w-32 h-32 object-contain"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="mb-4 text-center py-8 bg-gray-50 rounded">
                        <QrCode className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        <p className="text-sm text-gray-500">{t('store.generating-qr')}</p>
                    </div>
                )}

                <div className="space-y-2">
                    {table.qr_code && (
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                onClick={() => handleViewQR(table)}
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                <Eye className="w-4 h-4 mr-1" />
                                {t('tables.view-qr')}
                            </Button>
                            <Button
                                onClick={() => handlePrintQR(table)}
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white"
                            >
                                <Printer className="w-4 h-4 mr-1" />
                                {t('tables.print-qr')}
                            </Button>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            onClick={() => handleEditTable(table)}
                            size="sm"
                            variant="outline"
                            className="w-full"
                        >
                            <Edit className="w-4 h-4 mr-1" />
                            {t('common.edit')}
                        </Button>
                        <Button
                            onClick={() => handleDeleteTable(table.id)}
                            size="sm"
                            variant="outline"
                            className="w-full text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4 mr-1" />
                            {t('common.delete')}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
