import Header from '@/components/landing/header';
import PlanItem from '@/components/landing/plan-item';
import VisitorLayout from '@/layouts/visitor-layout';
import { Head } from '@inertiajs/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function PlansPage({ plans }: any) {
    const { t } = useTranslation();
    return (

        <VisitorLayout>
            <Head title={t('plans.title')} />
            <section className="relative py-24 overflow-hidden ">

                {/* Background Blur */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-500/20 blur-3xl rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6">

                    {/* Title */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            {t('plans.title')}
                        </h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            {t('plans.subtitle')}
                        </p>
                    </div>

                    {/* Plans Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {plans.map((plan: any, index: any) => (
                            <PlanItem plan={plan} index={index} />

                        ))}
                    </div>
                </div>
            </section>
        </VisitorLayout>
    )
}
