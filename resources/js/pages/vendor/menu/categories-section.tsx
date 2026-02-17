import { Link } from '@inertiajs/react'
import React from 'react'
interface Category {
    id: number;
    name_ar: string;
    name_en: string;
    image: string | null;
    meals_count?: number;
}
export default function CategoriesSection({ categories }: { categories: Category[] }) {
    return (
        <div className="container flex overflow-x-auto pb-2 scrollbar-hide gap-3 mx-auto px-4 ">

            {categories.map((category) => (
                <Link href='#'
                    key={category.id}
                >
                   <div className='flex flex-col items-center'>
                     <img src={category?.image || ''} alt={category.name_en} className='w-28 h-28  bg-cover' />
                   
                    <p> {category.name_en}</p>
                    <p>{category.meals_count}</p>
                   </div>
                </Link>
            ))}
        </div>
    )
}
