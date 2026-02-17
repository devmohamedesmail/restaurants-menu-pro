import React from 'react';
// @ts-ignore
declare var route: any;
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import Header from '@/components/vendor/header';
import TabsSection from '@/components/vendor/tabs-section';
import OverviewTab from '@/components/vendor/overview-tab';
import TableTab from '@/components/vendor/table-tab';
import OrdersTab from '@/components/vendor/orders-tab';
import MealsTab from '@/components/vendor/meals-tab';
import CategoriesTab from '@/components/vendor/categories-tab';
import EditButton from '@/components/vendor/edit-button';

export default function Dashboard({ store, categories, meals, orders, tables, country, stats }: any) {
  const { t } = useTranslation();



  if (!store) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
      <Head title={`${store.name} - ${t('header.dashboard')}`} />

      <Header store={store} />

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full space-y-6">
          <div className="flex items-center justify-between pb-4 overflow-x-auto">
            <TabsSection />
            {/* Mobile Edit Button (visible only on small screens) */}
            <EditButton />
          </div>

          {/* Overview Tab */}
          <OverviewTab stats={stats} country={country} orders={orders} />
          {/* Categories Tab */}
          <CategoriesTab categories={categories} country={country} />
          {/* Meals Tab */}
          <MealsTab meals={meals} categories={categories} country={country} />
          {/* Orders Tab */}
          <OrdersTab orders={orders} />
          {/* Tables Tab */}
          <TableTab tables={tables} country={country} />
        </Tabs>
      </div>
    </div>
  );
}



function EmptyState({ icon, title, description, actionText, onAction }: any) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted/50 p-4 rounded-full mb-4 text-muted-foreground">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mb-6">{description}</p>
      {actionText && (
        <Button onClick={onAction} variant="outline">
          {actionText}
        </Button>
      )}
    </div>
  );
}


