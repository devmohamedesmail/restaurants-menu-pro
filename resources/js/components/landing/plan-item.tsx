import React from 'react'
import { useTranslation } from 'react-i18next'
import {Check} from 'lucide-react'

export default function PlanItem({ plan, index }: { plan: any, index: number }) {
    const { t, i18n } = useTranslation()
    const isAr = i18n.language === 'ar'
    return (
        <div
            key={plan.id}
            className={`relative group rounded-3xl p-8 border backdrop-blur-xl transition-all duration-300
                    ${index === 1
                    ? 'bg-black text-white scale-105 shadow-2xl'
                    : 'bg-white/70 dark:bg-gray-900/70 hover:scale-105 shadow-lg'
                }
                  `}
        >
            {/* Badge */}
            {index === 1 && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm px-4 py-1 rounded-full">
                    {t('plans.popular')}
                </span>
            )}

            {/* Name */}
            <h2 className="text-2xl font-bold mb-2 text-center">
                {isAr ? plan.name_ar : plan.name_en}
            </h2>

            {/* Description */}
            <p className={`text-center mb-6 ${index === 1 ? 'text-gray-300' : 'text-gray-500'
                }`}>
                {isAr ? plan.description_ar : plan.description_en}
            </p>

            {/* Price */}
            <div className="text-center mb-8">
                <span className="text-5xl font-extrabold">
                    {plan.price}
                </span>
                <span className={`ml-2 ${index === 1 ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                    / {t(`plans.interval.${plan.interval}`)}
                </span>
            </div>

            {/* Features */}
            <ul className={`space-y-3 mb-10 ${index === 1 ? 'text-gray-200' : 'text-gray-600'
                }`}>
                <li className='flex items-center gap-2'><Check /> {plan.max_menus} {t('plans.features.menus')}</li>
                <li className='flex items-center gap-2'><Check /> {plan.max_categories} {t('plans.features.categories')}</li>
                <li className='flex items-center gap-2'><Check /> {plan.max_items} {t('plans.features.items')}</li>
                {plan.qr_code && <li className='flex items-center gap-2'><Check /> {t('plans.features.qr')}</li>}
                {plan.custom_domain && <li className='flex items-center gap-2'><Check /> {t('plans.features.custom-domain')}</li>}
            </ul>

            {/* CTA */}
            <button
                disabled={!plan.is_active}
                className={`w-full py-4 rounded-2xl font-semibold transition
                      ${index === 1
                        ? 'bg-white text-black hover:opacity-90'
                        : 'bg-black text-white hover:bg-gray-800'
                    }
                      disabled:bg-gray-400
                    `}
            >
                {t('plans.select')}
            </button>
        </div>
    )
}
