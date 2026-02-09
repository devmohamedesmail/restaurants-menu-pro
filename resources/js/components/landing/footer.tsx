import {
    Sparkles,

} from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-8 sm:py-12 border-t border-border bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Menu Pro
                        </span>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                        © 2026 Menu Pro. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
