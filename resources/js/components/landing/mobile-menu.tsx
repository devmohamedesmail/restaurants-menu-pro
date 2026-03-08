import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
export default function MobileMenu() {
    const { t } = useTranslation();
    const [isOpen, setOpen]=useState(false)
    return (
        <>
            <button className="md:hidden" onClick={()=>setOpen(!isOpen)}>
                <Menu />
            </button>

            <div className={`fixed top-0 bottom-0 h-screen w-80 left-0 z-50 px-5 bg-black ${isOpen ? 'block' : 'hidden'}`}>
                <div className='flex justify-end mb-10'>
                <button className='absolute top-2 right-2' onClick={()=>setOpen(!isOpen)}><X /></button>

                </div>
                <nav className='flex flex-col'>
                    <Link href="/" className='mx-2 mb-2 text-md md:text-lg hover:bg-primary rounded-md py-1 px-2'>{t('landing.home')}</Link>
                    <Link href="/plans" className='mx-2 mb-2 text-md md:text-lg hover:bg-primary rounded-md py-1 px-2'>{t('landing.plans')}</Link>
                    <Link href="/contact-us" className='mx-2 mb-2 text-md md:text-lg hover:bg-primary rounded-md py-1 px-2'>{t('landing.contact-us')}</Link>
                </nav>

            </div>

        </>

    )
}
