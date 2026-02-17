import React from 'react'
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

export default function SearchSection() {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <div className={`sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border transition-shadow duration-300 `}>
            <div className="container mx-auto max-w-5xl px-4 py-4 space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder={t('menu.search_placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl bg-secondary/50 border-transparent focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                </div>

                {/* Categories Nav */}

            </div>
        </div>
    )
}
