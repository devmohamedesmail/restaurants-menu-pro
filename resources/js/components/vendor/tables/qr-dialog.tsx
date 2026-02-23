import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, Printer } from 'lucide-react'
interface QRCodeViewModalProps {
    open: boolean
    table: any
    store: any
    onClose: () => void
}
export default function QrDialog({ open, table, store, onClose }: QRCodeViewModalProps) {
    const { t } = useTranslation()

    const handleDownload = () => {
        if (table?.qr_code) {
            const link = document.createElement('a')
            link.href = table?.qr_code
            link.download = `${table?.name}_QR_Code.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const handlePrint = () => {
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
                                color: #333;
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
                                    padding: 20px;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <h1>${store?.name}</h1>
                        <h2>${table?.name}</h2>
                        <img src="${table?.qr_code}" alt="${table?.name} QR Code" />
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
        <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>

                    </DialogTitle>

                </DialogHeader>

                <div className="text-center">
                    <h3 className="font-bold text-2xl mb-2">{store?.name}</h3>
                    <h4 className="text-xl text-gray-600 mb-6">{table?.name}</h4>

                    {table?.qr_code ? (
                        <div className="flex flex-col items-center">
                            <div className="bg-white p-6 rounded-lg border-4 border-gray-300 mb-6">
                                <img
                                    src={table?.qr_code}
                                    alt={`${table?.name} QR Code`}
                                    className="w-80 h-80 object-contain"
                                />
                            </div>

                            <p className="text-lg text-gray-600 mb-6">{t('tables.scan-to-order')}</p>

                            <div className="flex gap-3 w-full max-w-md">
                                <Button
                                    onClick={handleDownload}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    {t('tables.download')}
                                </Button>
                                <Button
                                    onClick={handlePrint}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    <Printer className="w-5 h-5 mr-2" />
                                    {t('tables.print')}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="py-12">
                            <p className="text-gray-500">{t('store.no-qr-code')}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
