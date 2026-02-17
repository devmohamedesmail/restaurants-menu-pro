import { MapPin, Phone, Share2, Star, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function HeroSection({ store }: { store: any }) {
    const { t } = useTranslation();
    return (
        <header className="relative h-75 sm:h-100 w-full overflow-hidden">
            <div className="absolute inset-0">
                {store.banner ? (
                    <img
                        src={store.banner}
                        alt={store.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-primary/80 to-purple-600" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8">
                <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-end gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-card p-1 shadow-2xl ring-2 ring-background border border-border">
                            {store.image ? (
                                <img
                                    src={store.image}
                                    alt={store.name}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/10 rounded-xl">
                                    <span className="text-4xl font-bold text-primary">{store.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        {store.is_verified === 1 && (
                            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg border-2 border-background">
                                <Star className="w-4 h-4 fill-current" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 mb-2">
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 drop-shadow-sm">{store.name}</h1>
                        <p className="text-muted-foreground line-clamp-2 max-w-2xl mb-4 text-sm sm:text-base">
                            {store.description}
                        </p>

                        <div className="flex flex-wrap gap-3 sm:gap-6 text-sm font-medium">
                            {store.address && (
                                <div className="flex items-center text-muted-foreground bg-background/50 backdrop-blur-md px-3 py-1 rounded-full border border-border/50">
                                    <MapPin className="w-4 h-4 mr-1.5 text-primary" />
                                    <span className="truncate max-w-50">{store.address}</span>
                                </div>
                            )}
                            {store.phone && (
                                <div className="flex items-center text-muted-foreground bg-background/50 backdrop-blur-md px-3 py-1 rounded-full border border-border/50">
                                    <Phone className="w-4 h-4 mr-1.5 text-primary" />
                                    <span>{store.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 mb-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none btn bg-background/80 backdrop-blur text-foreground border border-border hover:bg-background transition-colors p-3 rounded-xl flex items-center justify-center gap-2">
                            <Share2 className="w-5 h-5" />
                            <span className="sm:hidden">{t('Share')}</span>
                        </button>
                        <button className="flex-1 sm:flex-none btn bg-primary text-primary-foreground hover:bg-primary/90 transition-colors p-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                            <Info className="w-5 h-5" />
                            <span className="sm:hidden">{t('Info')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
