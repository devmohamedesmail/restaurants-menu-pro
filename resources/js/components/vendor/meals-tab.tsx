import React, { useState } from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Edit, Trash2, UtensilsCrossed } from 'lucide-react'
import EmptyState from './empty-state'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import MealDialog from './meal-dialog'
import { router } from '@inertiajs/react'

interface Meal {
  id: number
  name_en: string
  name_ar: string
  description_en?: string
  description_ar?: string
  image: string
  price: number
  sale_price?: number
  category: {
    id: number
    name_en: string
    name_ar: string
  }
}



declare function route(name: string, params?: any): string
export default function MealsTab({ meals, categories, country }: any) {
  const { t, i18n } = useTranslation()
  const [mealDialogOpen, setMealDialogOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState<Meal | undefined>()
  const isArabic = i18n.language === 'ar'


   const handleDeleteMeal = (id: number) => {
        if (confirm(t('confirm-delete-meal'))) {
            router.delete(route('store.meal.delete', id))
        }
    }



  return (
    <TabsContent value="meals">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t('dashboard.meals')}</CardTitle>
            <CardDescription>{t('dashboard.manage-meals')}</CardDescription>
          </div>
          <Button onClick={() => setMealDialogOpen(true)}>
            <UtensilsCrossed className="w-4 h-4 mr-2" />
            {t('dashboard.add-new-meal')}
          </Button>
        </CardHeader>
        <CardContent>
          {meals?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {meals.map((meal: any) => (
                // <div key={meal.id} className="flex gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                //   <div className="w-20 h-20 rounded-md bg-muted overflow-hidden shrink-0">
                //     {meal.image ? (
                //       <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                //     ) : (
                //       <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                //         <UtensilsCrossed className="w-8 h-8 opacity-20" />
                //       </div>
                //     )}
                //   </div>
                //   <div className="flex-1 min-w-0">
                //     <h3 className="font-semibold truncate">{meal.name}</h3>
                //     <p className="text-sm text-muted-foreground truncate">{meal.category?.name}</p>
                //     <p className="font-medium mt-1">{meal.price} {country?.currency_symbol}</p>
                //   </div>
                // </div>

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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<UtensilsCrossed className="w-12 h-12" />}
              title={t('dashboard.no-meals')}
              description={t('dashboard.create-first-meal')}
              actionText={t('dashboard.add-new-meal')}
            />
          )}
        </CardContent>
      </Card>



      <MealDialog
        open={mealDialogOpen}
        onClose={() => {
          setMealDialogOpen(false)
          setEditingMeal(undefined)
        }}
        categories={categories}
        meal={editingMeal}
      />

    </TabsContent>
  )
}
