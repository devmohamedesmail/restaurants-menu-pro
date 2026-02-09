import React from 'react'
import { Moon, Sun } from "lucide-react"
import { useAppearance } from '@/hooks/use-appearance'

export default function ThemeToggle() {
    const { appearance, updateAppearance } = useAppearance();
    const isDark = appearance === 'dark';

    return (
        <button
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
            className="group relative w-16 h-8 rounded-full bg-gradient-to-r from-primary/20 to-primary/30 border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 overflow-hidden"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {/* Background gradient that shifts */}
            <div className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-500 ${isDark
                    ? 'from-slate-800 to-slate-900 opacity-100'
                    : 'from-amber-400 to-orange-500 opacity-100'
                }`} />

            {/* Stars background for dark mode */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute top-2 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
                <div className="absolute top-4 left-8 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-100" />
                <div className="absolute top-3 left-12 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200" />
            </div>

            {/* Sliding toggle circle */}
            <div className={`absolute top-1 transition-all duration-500 ease-out ${isDark ? 'left-1' : 'left-[calc(100%-2rem)]'
                } w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center transform group-hover:scale-110`}>
                {/* Sun icon */}
                <Sun
                    className={`absolute text-amber-500 transition-all duration-500 ${isDark
                            ? 'opacity-0 rotate-180 scale-0'
                            : 'opacity-100 rotate-0 scale-100'
                        }`}
                    size={14}
                />

                {/* Moon icon */}
                <Moon
                    className={`absolute text-slate-700 transition-all duration-500 ${isDark
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 -rotate-180 scale-0'
                        }`}
                    size={14}
                />
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
    )
}
