import React from 'react'
import { Button } from '../ui/button'
import { Link } from '@inertiajs/react'
import { Edit } from 'lucide-react'

declare function route(name: string, params?: any): string
export default function EditButton() {
    return (
        <Button variant="outline" size="sm" asChild className="md:hidden ml-2">
            <Link href={route('register.store.page')}>
                <Edit className="w-4 h-4" />
            </Link>
        </Button>
    )
}
