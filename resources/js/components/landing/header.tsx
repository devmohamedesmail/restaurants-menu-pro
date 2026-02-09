import React from 'react'
import LangToggle from '@/components/ui/lang-toggle';
import ThemeToggle from '@/components/ui/theme-toggle';
import { Sparkles } from 'lucide-react';
export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Menu Pro
                        </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <LangToggle />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}
