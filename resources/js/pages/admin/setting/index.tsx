import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Settings, Globe, Mail, Phone, MapPin, DollarSign, Image as ImageIcon } from 'lucide-react';
import ImagePicker from '@/components/ui/image-picker';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';



export default function Setting({ setting }: any) {
    const { t } = useTranslation();
    const [processing, setProcessing] = useState(false);

    const validationSchema = Yup.object({
        title_en: Yup.string().required(t('setting.title-en-required') || 'English title is required'),
        title_ar: Yup.string().required(t('setting.title-ar-required') || 'Arabic title is required'),
        description_en: Yup.string().required(t('setting.description-en-required') || 'English description is required'),
        description_ar: Yup.string().required(t('setting.description-ar-required') || 'Arabic description is required'),
        keywords_en: Yup.string().required(t('setting.keywords-en-required') || 'English keywords are required'),
        keywords_ar: Yup.string().required(t('setting.keywords-ar-required') || 'Arabic keywords are required'),
        email: Yup.string().email(t('setting.email-invalid') || 'Invalid email').required(t('setting.email-required') || 'Email is required'),
        phone: Yup.string().required(t('setting.phone-required') || 'Phone is required'),
        address: Yup.string().required(t('setting.address-required') || 'Address is required'),
        currency_en: Yup.string().required(t('setting.currency-en-required') || 'English currency is required'),
        currency_ar: Yup.string().required(t('setting.currency-ar-required') || 'Arabic currency is required'),
    });

    const formik = useFormik({
        initialValues: {
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
        },
        validationSchema,
        onSubmit: (values) => {
            setProcessing(true);

            // Convert values to FormData for file upload support
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                const value = values[key as keyof typeof values];
                if (value instanceof File) {
                    formData.append(key, value);
                } else if (value) {
                    formData.append(key, value);
                }
            });


            router.post('/admin/settings/update', formData, {
                forceFormData: true,
                 preserveScroll: true,
                onSuccess: () => {
                    toast.success(t('setting.update-success') || 'Settings updated successfully!');
                    setProcessing(false);
                },
                onError: (errors) => {
                    console.log('Submission errors:', errors);
                    toast.error(t('setting.update-error') || 'Failed to update settings. Please check the form.');
                    setProcessing(false);
                },
                onFinish: () => {
                    setProcessing(false);
                },
            });
        },
    });

    // Helper function to safely get error message as string
    const getErrorMessage = (fieldName: keyof typeof formik.values): string | undefined => {
        const touched = formik.touched[fieldName];
        const error = formik.errors[fieldName];
        if (touched && error) {
            return typeof error === 'string' ? error : undefined;
        }
        return undefined;
    };



    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('setting.page-title'),
            href: '/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('setting.page-title')} />
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

                <form onSubmit={formik.handleSubmit} className="space-y-6">
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
                                            name="title_en"
                                            type="text"
                                            placeholder={t('setting.title-en-placeholder')}
                                            value={formik.values.title_en}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <InputError message={getErrorMessage('title_en')} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description_en">{t('setting.description')}</Label>

                                        <Textarea
                                            id="description_en"
                                            name="description_en"
                                            placeholder={t('setting.description-en-placeholder')}
                                            value={formik.values.description_en}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            rows={3}
                                        />
                                        <InputError message={getErrorMessage('description_en')} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="keywords_en">{t('setting.keywords')}</Label>
                                        <Input
                                            id="keywords_en"
                                            name="keywords_en"
                                            type="text"
                                            placeholder={t('setting.keywords-en-placeholder')}
                                            value={formik.values.keywords_en}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <InputError message={getErrorMessage('keywords_en')} />
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
                                            name="title_ar"
                                            type="text"
                                            placeholder={t('setting.title-ar-placeholder')}
                                            value={formik.values.title_ar}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            dir="rtl"
                                        />
                                        <InputError message={getErrorMessage('title_ar')} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description_ar">{t('setting.description')}</Label>
                                        <Textarea
                                            id="description_ar"
                                            name="description_ar"
                                            placeholder={t('setting.description-ar-placeholder')}
                                            value={formik.values.description_ar}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            rows={3}
                                            dir="rtl"
                                        />
                                        <InputError message={getErrorMessage('description_ar')} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="keywords_ar">{t('setting.keywords')}</Label>
                                        <Input
                                            id="keywords_ar"
                                            name="keywords_ar"
                                            type="text"
                                            placeholder={t('setting.keywords-ar-placeholder')}
                                            value={formik.values.keywords_ar}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            dir="rtl"
                                        />
                                        <InputError message={getErrorMessage('keywords_ar')} />
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
                                    onChange={(file) => formik.setFieldValue('logo', file)}
                                    error={getErrorMessage('logo')}
                                    previewClassName="h-40 object-contain"
                                />

                                <ImagePicker
                                    label={t('setting.favicon')}
                                    id="favicon"
                                    onChange={(file) => formik.setFieldValue('favicon', file)}
                                    error={getErrorMessage('favicon')}
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
                                        name="email"
                                        type="email"
                                        placeholder={t('setting.email-placeholder')}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <InputError message={getErrorMessage('email')} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        {t('phone')}
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder={t('setting.phone-placeholder')}
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <InputError message={getErrorMessage('phone')} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address" className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {t('address')}
                                    </Label>
                                    <Textarea
                                        id="address"
                                        name="address"
                                        placeholder={t('setting.address-placeholder')}
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        rows={2}
                                    />
                                    <InputError message={getErrorMessage('address')} />
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
                                        name="currency_en"
                                        type="text"
                                        placeholder={t('setting.currency-en-placeholder')}
                                        value={formik.values.currency_en}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <InputError message={getErrorMessage('currency_en')} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="currency_ar">{t('setting.currency-ar')}</Label>
                                    <Input
                                        id="currency_ar"
                                        name="currency_ar"
                                        type="text"
                                        placeholder={t('setting.currency-ar-placeholder')}
                                        value={formik.values.currency_ar}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        dir="rtl"
                                    />
                                    <InputError message={getErrorMessage('currency_ar')} />
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
