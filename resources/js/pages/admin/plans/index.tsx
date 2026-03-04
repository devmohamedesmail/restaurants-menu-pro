
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast';



declare function route(name: string, params?: any): string
export default function PlansPage({ plans }: { plans: any }) {
  const { t } = useTranslation()


  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('plans.title'),
      href: '/dashboard',
    },
  ];



  const handleDelete = (id: number) => {
    if (confirm(t('plans.confirm-delete'))) {
      router.delete(route('admin.plan.delete', id), {
        onSuccess: () => {
          toast.success(t('plans.plan-deleted'))
        },
      })
    }
  }

  return (
    <AppLayout>
      <Head title={t('plans.create')} />



      <div className="px-10 py-5 w-full mx-auto p-8 rounded-xl shadow">

        <div className="flex justify-end">
          <Button onClick={() => router.visit(route('plans.create.page'))}>
            {t('plans.create')}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.length > 0 ? (
            plans.map((plan: any) => (
              <div
                key={plan.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-xl text-center text-black font-bold mb-2">{plan.name_en} / {plan.name_ar}</h2>
                <p className="text-gray-600 mb-4">{plan.description_en || plan.description_ar}</p>

                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">{t('plans.price')}: ${plan.price}</span>
                  <span className="text-sm text-gray-500">{t(`plans.${plan.interval}`)}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-500">
                  <div>{t('plans.max-menus')}: {plan.max_menus}</div>
                  <div>{t('plans.max-categories')}: {plan.max_categories}</div>
                  <div>{t('plans.max-items')}: {plan.max_items}</div>
                </div>

                <div className="flex justify-between mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.visit(route('admin.plan.edit', plan.id))}
                  >
                    {t('common.edit')}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(plan.id)}
                  >
                    {t('common.delete')}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-black dark:text-white p-2 rounded">{t('plans.no-plans')}</p>
          )}
        </div>

      </div>
    </AppLayout>
  );
}
