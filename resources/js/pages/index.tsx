import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Benefits from '@/components/landing/benefits';
import Footer from '@/components/landing/footer';
import CTA from '@/components/landing/cta';
import Features from '@/components/landing/features';
import Partners from '@/components/landing/partners';


export default function Home({ stores , banners }: { stores: any[] , banners: any[] }) {
   
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <Hero banners={banners} />
            <Partners stores={stores} />
            <Benefits />
            <Features />
            <CTA />
            <Footer />
        </div>
    );
}
