import React from 'react'
import { useAppearance } from '@/hooks/use-appearance';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggleIcon() {
    const { appearance, updateAppearance } = useAppearance();
    const isDark = appearance === 'dark';
  return (
    <button onClick={() => updateAppearance(isDark ? 'light' : 'dark')} className="flex-1 sm:flex-none btn bg-background/80 backdrop-blur text-foreground border border-border hover:bg-background transition-colors py-1 px-2 rounded-md flex items-center justify-center gap-2">
                                {isDark ? (
                                    <Sun className="w-4 h-4" />
                                ) : (
                                    <Moon className="w-4 h-4" />
                                )}
                                <span className="sm:hidden text-xs">{isDark ? 'Light' : 'Dark'}</span>
                            </button>
  )
}
