import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Head, Link } from '@inertiajs/react';
import {ArrowLeft} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '@/components/checkout/hero';
import PlanSummary from '@/components/checkout/plan-summary';
import PaymentMethods from '@/components/checkout/payment-methods';
// ─── Types ────────────────────────────────────────────────────────────────────
interface Plan {
    id: number;
    name_en: string;
    name_ar: string;
    description_en: string;
    description_ar: string;
    price: string;
    interval: 'monthly' | 'quarterly' | 'yearly';
    duration_days: number;
    max_menus: number;
    max_categories: number;
    max_items: number;
    qr_code: number;
    custom_domain: number;
    is_active: number;
    slug: string;
}



// ─── Checkout Page ─────────────────────────────────────────────────────────────
export default function Checkout({ plan }: { plan: Plan }) {
    const { t, i18n } = useTranslation();
    const [selectedPayment, setSelectedPayment] = useState<string>('card');


    return (
        <div className="min-h-screen bg-background">
            <Head title={t('checkout.title')} />
            <Header />
            <Hero />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                <Link
                    href="/plans"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t('checkout.back_to_plans')}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                   <PlanSummary plan={plan} />
                    <PaymentMethods 
                        selectedPayment={selectedPayment} 
                        setSelectedPayment={setSelectedPayment}
                        plan={plan} 
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
