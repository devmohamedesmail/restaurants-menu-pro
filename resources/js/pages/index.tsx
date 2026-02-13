import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import Benefits from '@/components/landing/benefits';
import Footer from '@/components/landing/footer';
import CTA from '@/components/landing/cta';
import Features from '@/components/landing/features';


export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <Hero />
            <Benefits />
            <Features />
            <CTA />
            <Footer />
        </div>
    );
}
