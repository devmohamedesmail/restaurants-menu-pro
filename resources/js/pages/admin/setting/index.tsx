import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

import { Settings, Globe, Mail, Phone, MapPin, DollarSign, Image as ImageIcon } from 'lucide-react';
import ImagePicker from '@/components/ui/image-picker';
import { Textarea } from '@/components/ui/textarea';



export default function Setting({ setting }: any) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        title_en: setting?.title_en || '',
        title_ar: setting?.title_ar || '',
        description_en: setting?.description_en || '',
        description_ar: setting?.description_ar || '',
        keywords_en: setting?.keywords_en || '',
        keywords_ar: setting?.keywords_ar || '',
        logo: '' as any,
        favicon: '' as any,
        email: setting?.email || '',
        phone: setting?.phone || '',
        address: setting?.address || '',
        currency_en: setting?.currency_en || '',
        currency_ar: setting?.currency_ar || '',
    });

    const update_setting = (e: any) => {
        e.preventDefault();
        post(route('update.settings'));
    }


    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: t('setting.page-title'),
        href: '/dashboard',
    },
];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />
            <div className='container mx-auto px-4 py-8 max-w-7xl'>
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Settings className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t('setting.page-title')}
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        {t('setting.page-description')}
                    </p>
                </div>

                <form onSubmit={update_setting} className="space-y-6">
                    {/* SEO & Localization Section */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Globe className="w-5 h-5 text-primary" />
                                <CardTitle>{t('setting.seo-localization')}</CardTitle>
                            </div>
                            <CardDescription>
                                {t('setting.seo-description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* English Section */}
                                <div className="space-y-4">
                                    <div className="pb-3 border-b">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <span className="text-2xl">🇬🇧</span>
                                            {t('setting.english')}
                                        </h3>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="title_en">{t('setting.title')}</Label>
                                        <Input 
                                            id="title_en"
                                            type="text" 
                                            placeholder={t('setting.title-en-placeholder')}
                                            value={data.title_en} 
                                            onChange={(e) => setData('title_en', e.target.value)} 
                                        />
                                        <InputError message={errors.title_en} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description_en">{t('setting.description')}</Label>
                                      
                                        <Textarea 
                                            id="description_en"
                                            placeholder={t('setting.description-en-placeholder')}
                                            value={data.description_en} 
                                            onChange={(e) => setData('description_en', e.target.value)}
                                            rows={3}
                                        />
                                        <InputError message={errors.description_en} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="keywords_en">{t('setting.keywords')}</Label>
                                        <Input 
                                            id="keywords_en"
                                            type="text" 
                                            placeholder={t('setting.keywords-en-placeholder')}
                                            value={data.keywords_en} 
                                            onChange={(e) => setData('keywords_en', e.target.value)} 
                                        />
                                        <InputError message={errors.keywords_en} />
                                        <p className="text-xs text-gray-500">{t('setting.keywords-hint')}</p>
                                    </div>
                                </div>

                                {/* Arabic Section */}
                                <div className="space-y-4">
                                    <div className="pb-3 border-b">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <span className="text-2xl">🇸🇦</span>
                                            {t('setting.arabic')}
                                        </h3>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="title_ar">{t('setting.title')}</Label>
                                        <Input 
                                            id="title_ar"
                                            type="text" 
                                            placeholder={t('setting.title-ar-placeholder')}
                                            value={data.title_ar} 
                                            onChange={(e) => setData('title_ar', e.target.value)}
                                            dir="rtl"
                                        />
                                        <InputError message={errors.title_ar} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description_ar">{t('setting.description')}</Label>
                                        <Textarea 
                                            id="description_ar"
                                            placeholder={t('setting.description-ar-placeholder')}
                                            value={data.description_ar} 
                                            onChange={(e) => setData('description_ar', e.target.value)}
                                            rows={3}
                                            dir="rtl"
                                        />
                                        <InputError message={errors.description_ar} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="keywords_ar">{t('setting.keywords')}</Label>
                                        <Input 
                                            id="keywords_ar"
                                            type="text" 
                                            placeholder={t('setting.keywords-ar-placeholder')}
                                            value={data.keywords_ar} 
                                            onChange={(e) => setData('keywords_ar', e.target.value)}
                                            dir="rtl"
                                        />
                                        <InputError message={errors.keywords_ar} />
                                        <p className="text-xs text-gray-500">{t('setting.keywords-hint')}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Branding Section */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-primary" />
                                <CardTitle>{t('setting.branding')}</CardTitle>
                            </div>
                            <CardDescription>
                                {t('setting.branding-description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ImagePicker
                                    label={t('setting.logo')}
                                    id="logo"
                                    onChange={(file) => setData('logo', file as any)}
                                    error={errors.logo}
                                    previewClassName="h-40 object-contain"
                                />

                                <ImagePicker
                                    label={t('setting.favicon')}
                                    id="favicon"
                                    onChange={(file) => setData('favicon', file as any)}
                                    error={errors.favicon}
                                    previewClassName="h-40 object-contain"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information Section */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary" />
                                <CardTitle>{t('setting.contact-information')}</CardTitle>
                            </div>
                            <CardDescription>
                                {t('setting.contact-description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        {t('email')}
                                    </Label>
                                    <Input 
                                        id="email"
                                        type="email" 
                                        placeholder={t('setting.email-placeholder')}
                                        value={data.email} 
                                        onChange={(e) => setData('email', e.target.value)} 
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        {t('phone')}
                                    </Label>
                                    <Input 
                                        id="phone"
                                        type="tel" 
                                        placeholder={t('setting.phone-placeholder')}
                                        value={data.phone} 
                                        onChange={(e) => setData('phone', e.target.value)} 
                                    />
                                    <InputError message={errors.phone} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address" className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {t('address')}
                                    </Label>
                                    <Textarea 
                                        id="address"
                                        placeholder={t('setting.address-placeholder')}
                                        value={data.address} 
                                        onChange={(e) => setData('address', e.target.value)}
                                        rows={2}
                                    />
                                    <InputError message={errors.address} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Currency Settings Section */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-primary" />
                                <CardTitle>{t('setting.currency-settings')}</CardTitle>
                            </div>
                            <CardDescription>
                                {t('setting.currency-description')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="currency_en">{t('setting.currency-en')}</Label>
                                    <Input 
                                        id="currency_en"
                                        type="text" 
                                        placeholder={t('setting.currency-en-placeholder')}
                                        value={data.currency_en} 
                                        onChange={(e) => setData('currency_en', e.target.value)} 
                                    />
                                    <InputError message={errors.currency_en} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="currency_ar">{t('setting.currency-ar')}</Label>
                                    <Input 
                                        id="currency_ar"
                                        type="text" 
                                        placeholder={t('setting.currency-ar-placeholder')}
                                        value={data.currency_ar} 
                                        onChange={(e) => setData('currency_ar', e.target.value)}
                                        dir="rtl"
                                    />
                                    <InputError message={errors.currency_ar} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Separator />

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Button 
                            type="submit" 
                            disabled={processing}
                            size="lg"
                            className="min-w-32"
                        >
                            {processing ? (
                                <>
                                    <span className="mr-2">⏳</span>
                                    {t('setting.saving')}
                                </>
                            ) : (
                                <>
                                    <Settings className="w-4 h-4 mr-2" />
                                    {t('setting.update-settings')}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
