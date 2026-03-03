import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, Plus, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import MealAttributeDialog from './meal-attribute-dialog'

export default function MealCard({ meal, country, setEditingMeal, setMealDialogOpen, handleDeleteMeal, attributes }: any) {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'
    const [attrDialogOpen, setAttrDialogOpen] = useState(false)

    return (
        <>
            <Card key={meal.id}>
                <CardContent className="p-4">
                    {meal.image ? (
                        <img
                            src={meal.image}
                            alt={isArabic ? meal.name_ar : meal.name_en}
                            className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                    ) : (
                        <div className="w-full h-40 rounded-lg mb-3 bg-secondary flex items-center justify-center text-muted-foreground/30 text-xs">
                            {t('dashboard.no_image')}
                        </div>
                    )}

                    <h3 className="font-semibold text-lg line-clamp-1">
                        {isArabic ? meal.name_ar : meal.name_en}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                        {isArabic ? meal.category?.name_ar : meal.category?.name_en}
                    </p>

                    <div className="mt-2">
                        {meal.sale_price ? (
                            <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-emerald-600">
                                    {isArabic ? country?.currency_ar : country?.currency_en} {meal.sale_price}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                    {isArabic ? country?.currency_ar : country?.currency_en} {meal.price}
                                </span>
                            </div>
                        ) : (
                            <span className="text-base font-bold">
                                {isArabic ? country?.currency_ar : country?.currency_en} {meal.price}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2 mt-3">
                        {/* Edit meal */}
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                                setEditingMeal(meal)
                                setMealDialogOpen(true)
                            }}
                        >
                            <Edit className="w-3 h-3" />
                        </Button>

                        {/* Delete meal */}
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteMeal(meal.id)}
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>

                        {/* Manage attributes */}
                        <Button
                            size="sm"
                            variant="secondary"
                            className="flex items-center gap-1"
                            onClick={() => setAttrDialogOpen(true)}
                            title={t('dashboard.manage_attributes')}
                        >
                            <Plus className="w-3 h-3" />
                            {t('dashboard.attributes')}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Attribute dialog */}
            <MealAttributeDialog
                open={attrDialogOpen}
                onClose={() => setAttrDialogOpen(false)}
                meal={meal}
                attributes={attributes}
            />
        </>
    )
}
