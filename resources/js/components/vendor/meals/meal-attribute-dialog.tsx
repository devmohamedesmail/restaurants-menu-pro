import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { router } from '@inertiajs/react'
import { Plus, Trash2, X, Tag } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface Attribute {
    id: number
    name_en: string
    name_ar: string
    slug_en: string
    slug_ar: string
}

interface AttributeValue {
    id: number
    attribute_id: number
    meal_id: number
    value: string
    price: number
    attribute?: Attribute
}

interface MealAttributeDialogProps {
    open: boolean
    onClose: () => void
    meal: any
    attributes: Attribute[]
}

interface ValueRow {
    attribute_id: string
    value: string
    price: string
}

const emptyRow = (): ValueRow => ({ attribute_id: '', value: '', price: '0' })

declare function route(name: string, params?: any): string

export default function MealAttributeDialog({
    open,
    onClose,
    meal,
    attributes,
}: MealAttributeDialogProps) {
    const { t, i18n } = useTranslation()
    const isAr = i18n.language === 'ar'

    // Rows being composed by the user before saving
    const [rows, setRows] = useState<ValueRow[]>([emptyRow()])
    const [submitting, setSubmitting] = useState(false)

    // Existing saved attribute values for this meal
    const existingValues: AttributeValue[] = meal?.attribute_values ?? []

    const getAttrName = (attr: Attribute) =>
        isAr ? attr.name_ar : attr.name_en

    /* ── Row helpers ─────────────────────────────────────────────────── */
    const updateRow = (index: number, field: keyof ValueRow, val: string) => {
        setRows((prev) =>
            prev.map((r, i) => (i === index ? { ...r, [field]: val } : r))
        )
    }

    const addRow = () => setRows((prev) => [...prev, emptyRow()])

    const removeRow = (index: number) =>
        setRows((prev) => prev.filter((_, i) => i !== index))

    /* ── Submit new values ───────────────────────────────────────────── */
    const handleSubmit = () => {
        const valid = rows.filter((r) => r.attribute_id && r.value.trim())
        if (valid.length === 0) return

        setSubmitting(true)
        router.post(
            route('store.meal.attribute_values.store', meal.id),
            { values: valid } as any,
            {
                onSuccess: () => {
                    setRows([emptyRow()])
                    setSubmitting(false)
                },
                onError: () => setSubmitting(false),
                preserveScroll: true,
            }
        )
    }

    /* ── Delete an existing value ────────────────────────────────────── */
    const handleDeleteValue = (valueId: number) => {
        if (!confirm(t('dashboard.confirm-delete-attr-value'))) return
        router.delete(route('store.meal.attribute_values.delete', valueId), {
            preserveScroll: true,
        })
    }

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-primary" />
                        {t('dashboard.manage_attributes')} —{' '}
                        <span className="text-primary font-bold">
                            {isAr ? meal?.name_ar : meal?.name_en}
                        </span>
                    </DialogTitle>
                </DialogHeader>

                {/* ── Existing values ─────────────────────────────────── */}
                {existingValues.length > 0 && (
                    <div className="space-y-2 mb-4">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            {t('dashboard.saved_values')}
                        </p>
                        {existingValues.map((av) => (
                            <div
                                key={av.id}
                                className="flex items-center justify-between bg-secondary/60 rounded-xl px-3 py-2 gap-2"
                            >
                                <div className="flex-1 min-w-0">
                                    <span className="text-xs font-semibold text-primary">
                                        {av.attribute
                                            ? getAttrName(av.attribute)
                                            : `#${av.attribute_id}`}
                                    </span>
                                    <span className="mx-2 text-muted-foreground">·</span>
                                    <span className="text-sm">{av.value}</span>
                                    {Number(av.price) > 0 && (
                                        <span className="ml-2 text-xs text-emerald-600 font-bold">
                                            +{av.price}
                                        </span>
                                    )}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-7 h-7 text-destructive hover:bg-destructive/10 shrink-0"
                                    onClick={() => handleDeleteValue(av.id)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Add new rows ─────────────────────────────────────── */}
                <div className="space-y-3">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        {t('dashboard.add_attribute_values')}
                    </p>

                    {rows.map((row, idx) => (
                        <div key={idx} className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-end">
                            {/* Attribute selector */}
                            <div>
                                {idx === 0 && (
                                    <Label className="text-xs mb-1 block">
                                        {t('dashboard.attribute')}
                                    </Label>
                                )}
                                <Select
                                    value={row.attribute_id}
                                    onValueChange={(v) => updateRow(idx, 'attribute_id', v)}
                                >
                                    <SelectTrigger className="h-9 text-sm">
                                        <SelectValue placeholder={t('dashboard.select_attribute')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {attributes.map((attr) => (
                                            <SelectItem key={attr.id} value={String(attr.id)}>
                                                {getAttrName(attr)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Value text */}
                            <div>
                                {idx === 0 && (
                                    <Label className="text-xs mb-1 block">
                                        {t('dashboard.value')}
                                    </Label>
                                )}
                                <Input
                                    className="h-9 text-sm"
                                    placeholder={t('dashboard.value_placeholder')}
                                    value={row.value}
                                    onChange={(e) => updateRow(idx, 'value', e.target.value)}
                                />
                            </div>

                            {/* Extra price */}
                            <div>
                                {idx === 0 && (
                                    <Label className="text-xs mb-1 block">
                                        {t('dashboard.extra_price')}
                                    </Label>
                                )}
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="h-9 text-sm w-20"
                                    value={row.price}
                                    onChange={(e) => updateRow(idx, 'price', e.target.value)}
                                />
                            </div>

                            {/* Remove row */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-destructive hover:bg-destructive/10"
                                onClick={() => removeRow(idx)}
                                disabled={rows.length === 1}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}

                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-1.5 text-xs"
                        onClick={addRow}
                    >
                        <Plus className="w-3.5 h-3.5" />
                        {t('dashboard.add_another_row')}
                    </Button>
                </div>

                {/* ── Footer ──────────────────────────────────────────── */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>
                        {t('common.cancel')}
                    </Button>
                    <Button onClick={handleSubmit} disabled={submitting}>
                        {submitting ? t('common.saving') : t('dashboard.save_attributes')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
