import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Edit, Plus, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function MealCard({ meal, country, setEditingMeal, setMealDialogOpen, handleDeleteMeal }: any) {
    const { t, i18n } = useTranslation()
    const isArabic = i18n.language === 'ar'
    return (
        <Card key={meal.id}>
            <CardContent className="p-4">
                <img
                    src={meal.image}
                    alt={isArabic ? meal.name_ar : meal.name_en}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold text-lg">
                    {isArabic ? meal.name_ar : meal.name_en}
                </h3>
                <p className="text-sm text-gray-500">
                    {isArabic ? meal.category.name_ar : meal.category.name_en}
                </p>
                <div className="flex items-center justify-between mt-3">
                    <div>
                        {meal.sale_price ? (
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-green-600">
                                    {i18n.language === 'ar' ? country.currency_ar : country.currency_en} {meal.sale_price}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    {i18n.language === 'ar' ? country.currency_ar : country.currency_en} {meal.price}
                                </span>
                            </div>
                        ) : (
                            <span className="text-lg font-bold">
                                {i18n.language === 'ar' ? country.currency_ar : country.currency_en} {meal.price}
                            </span>
                        )}
                    </div>
                    
                </div>

                <div className="flex gap-2">
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
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteMeal(meal.id)}
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>

                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteMeal(meal.id)}
                        >
                            <Plus className="w-3 h-3" />
                        </Button>
                    </div>
            </CardContent>
        </Card>
    )
}
