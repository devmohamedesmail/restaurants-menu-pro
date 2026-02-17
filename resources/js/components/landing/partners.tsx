import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MapPin, Phone, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Store {
    id: number;
    name: string;
    description: string;
    slug: string;
    banner: string | null;
    image: string | null;
    phone: string | null;
    address: string | null;
    is_verified: number;
}

export default function Partners({ stores = [] }: { stores: Store[] }) {
    const { t } = useTranslation();

    // Use passed stores or empty array if null
    const displayStores = stores || [];

    return (
        <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                        {t('Our Partners', 'Our Partners')}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                        {t('Trusted by Top Restaurants', 'Trusted by Top Restaurants')}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('Discover some of the amazing restaurants using our platform to power their digital presence.', 'Discover some of the amazing restaurants using our platform to power their digital presence.')}
                    </p>
                </div>

                {displayStores.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayStores.map((store, index) => (
                            <Link
                                key={store.id}
                                href={`/store/${store.slug}`}
                                className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 h-full flex flex-col"
                            >
                                {/* Banner Image */}
                                <div className="relative h-48 overflow-hidden bg-secondary">
                                    {store.banner ? (
                                        <img
                                            src={store.banner}
                                            alt={`${store.name} banner`}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                                            <span className="text-4xl opacity-20 font-bold tracking-widest text-muted-foreground uppercase">
                                                {store.name.substring(0, 2)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                                    {/* Logo */}
                                    <div className="absolute -bottom-10 left-6">
                                        <div className="w-20 h-20 rounded-2xl bg-card p-1 shadow-lg ring-1 ring-border/50">
                                            {store.image ? (
                                                <img
                                                    src={store.image}
                                                    alt={store.name}
                                                    className="w-full h-full object-cover rounded-xl bg-background"
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                                    {store.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Verified Badge */}
                                    {store.is_verified === 1 && (
                                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-primary" title="Verified Partner">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 pt-12 grow flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                                            {store.name}
                                        </h3>
                                    </div>

                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 grow">
                                        {store.description}
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        {store.address && (
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <MapPin className="w-4 h-4 mr-2 text-primary/70" />
                                                <span className="truncate">{store.address}</span>
                                            </div>
                                        )}
                                        {store.phone && (
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Phone className="w-4 h-4 mr-2 text-primary/70" />
                                                <span>{store.phone}</span>
                                            </div>
                                        )}
                                    </div>

                                    <Link 
                                        href={`/store/menu/${store.slug}/${store.id}`}
                                        className="pt-4 border-t border-border mt-auto flex justify-between items-center text-sm font-medium text-primary">
                                        <span>{t('View Menu', 'View Menu')}</span>
                                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-card/50 rounded-2xl border border-dashed border-border">
                        <p className="text-muted-foreground">{t('No partners found at the moment.', 'No partners found at the moment.')}</p>
                    </div>
                )}

                {displayStores.length > 0 && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/stores"
                            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/30"
                        >
                            {t('Explore All Partners', 'Explore All Partners')}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
