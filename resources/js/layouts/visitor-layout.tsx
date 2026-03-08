import Footer from '@/components/landing/footer'
import Header from '@/components/landing/header'
import React, { Children, ReactElement } from 'react'

export default function VisitorLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <Header />
                {children}
            <Footer />
        </div>
    )
}
