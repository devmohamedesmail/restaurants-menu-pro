import React, { useState } from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Edit, ListFilter, Trash2 } from 'lucide-react'
import EmptyState from './empty-state'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import CategoryDialog from './category-dialog'
import { router } from '@inertiajs/react'


interface Category {
  id: number
  name_en: string
  name_ar: string
  image: string
  position: number
  meals_count?: number
}

declare function route(name: string, params?: any): string

export default function CategoriesTab({ categories, country }: any) {
  const { t, i18n } = useTranslation()
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | undefined>()
  const isArabic = i18n.language === 'ar'



  const handleDeleteCategory = (id: number) => {
    if (confirm(t('stores.confirm-delete-category'))) {
      router.delete(route('store.category.delete', id))
    }
  }
  return (
    <TabsContent value="categories">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t('dashboard.categories')}</CardTitle>
            <CardDescription>{t('dashboard.manage-categories')}</CardDescription>
          </div>
          <Button onClick={() => setCategoryDialogOpen(true)}>
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
                  <h3 className="font-semibold truncate">{isArabic ? category.name_ar : category.name_en}</h3>
                  <p className="text-sm text-muted-foreground">{category.meals_count} {t('dashboard.total-meals')}</p>

                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCategory(category)
                        setCategoryDialogOpen(true)
                      }}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
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

      <CategoryDialog
        open={categoryDialogOpen}
        onClose={() => setCategoryDialogOpen(false)}
        category={editingCategory}

      />
    </TabsContent>
  )
}
