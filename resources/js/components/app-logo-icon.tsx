import { Settings } from '@/types/settings';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core'

interface AppPageProps extends PageProps {
    settings: Settings
}

export default function AppLogoIcon() {
    const { settings } = usePage<AppPageProps>().props;

    return (
        <div>
            <img src={settings.logo} className='w-fit ' alt={settings.title_en} />
        </div>
    );
}
