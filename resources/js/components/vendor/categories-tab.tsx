import React from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ListFilter } from 'lucide-react'
import EmptyState from './empty-state'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

export default function CategoriesTab({ categories, country }: any) {
    const { t } = useTranslation()
  return (
     <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t('dashboard.categories')}</CardTitle>
                  <CardDescription>{t('dashboard.manage-categories')}</CardDescription>
                </div>
                <Button>
                  <ListFilter className="w-4 h-4 mr-2" />
                  {t('dashboard.add-new-category')}
                </Button>
              </CardHeader>
              <CardContent>
                {categories?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map((category: any) => (
                      <div key={category.id} className="group relative rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                        <div className="aspect-video rounded-md bg-muted mb-3 overflow-hidden">
                          {category.image ? (
                            <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                              <ListFilter className="w-8 h-8 opacity-20" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold truncate">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.meals_count} {t('dashboard.total-meals')}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<ListFilter className="w-12 h-12" />}
                    title={t('dashboard.no-categories')}
                    description={t('dashboard.create-first-category')}
                    actionText={t('dashboard.add-new-category')}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
  )
}
