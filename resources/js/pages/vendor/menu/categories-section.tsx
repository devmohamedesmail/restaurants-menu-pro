import { Link } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next';

interface Category {
    id: number;
    name_ar: string;
    name_en: string;
    image: string | null;
    meals_count?: number;
}
export default function CategoriesSection({ categories }: { categories: Category[] }) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const getLocalized = (obj: any, field: string) => {
        const en = obj[`${field}_en`];
        const ar = obj[`${field}_ar`];
        return isRTL ? (ar || en) : (en || ar);
    };

    return (
        <div className="container flex overflow-x-auto pb-2 scrollbar-hide gap-3 mx-auto px-4 ">

            {categories.map((category) => (
                <Link href='#'
                    key={category.id}
                >
                    <div className='flex flex-col items-center'>
                        <img src={category?.image || ''} alt={getLocalized(category, 'name')} className='w-28 h-28  bg-cover' />

                        <p> {getLocalized(category, 'name')}</p>
                        <p>{category.meals_count}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
