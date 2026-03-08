
import Hero from '@/components/landing/hero';
import Benefits from '@/components/landing/benefits';
import CTA from '@/components/landing/cta';
import Features from '@/components/landing/features';
import VisitorLayout from '@/layouts/visitor-layout';

export default function Home() {

    return (

        <VisitorLayout>
            <Hero />
            <Benefits />
            <Features />
            <CTA />
        </VisitorLayout>

    );
}
