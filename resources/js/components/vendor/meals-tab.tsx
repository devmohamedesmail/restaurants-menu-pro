import React from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { UtensilsCrossed } from 'lucide-react'
import EmptyState from './empty-state'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

export default function MealsTab({ meals, country }: any) {
    const { t } = useTranslation()
  return (
     <TabsContent value="meals">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t('dashboard.meals')}</CardTitle>
                  <CardDescription>{t('dashboard.manage-meals')}</CardDescription>
                </div>
                <Button>
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  {t('dashboard.add-new-meal')}
                </Button>
              </CardHeader>
              <CardContent>
                {meals?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {meals.map((meal: any) => (
                      <div key={meal.id} className="flex gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                        <div className="w-20 h-20 rounded-md bg-muted overflow-hidden shrink-0">
                          {meal.image ? (
                            <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                              <UtensilsCrossed className="w-8 h-8 opacity-20" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{meal.name}</h3>
                          <p className="text-sm text-muted-foreground truncate">{meal.category?.name}</p>
                          <p className="font-medium mt-1">{meal.price} {country?.currency_symbol}</p>
                        </div>
                      </div>
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
          </TabsContent>
  )
}
