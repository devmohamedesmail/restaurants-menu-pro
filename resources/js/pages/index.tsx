import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Benefits from '@/components/landing/benefits';
import Footer from '@/components/landing/footer';
import CTA from '@/components/landing/cta';
import Features from '@/components/landing/features';
import Partners from '@/components/landing/partners';


export default function Home({ stores }: { stores: any[] }) {
    console.log(stores);
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <Hero />
            <Partners stores={stores} />
            <Benefits />
            <Features />
            <CTA />
            <Footer />
        </div>
    );
}
