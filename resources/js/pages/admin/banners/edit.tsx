import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MdAddPhotoAlternate } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
declare function route(name: string, params?: any): string



export default function EditBanner({ banner }: any) {
    const { t } = useTranslation();
    const [imagePreview, setImagePreview] = useState<string | null>(
        banner?.image ? `/uploads/${banner.image}` : null
    );
    
    const { data, setData, post, processing, errors } = useForm({
        title_en: banner?.title_en || '',
        title_ar: banner?.title_ar || '',
        image: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('banner.page-title'),
            href: route('banners.page'),
        },
        {
            title: t('banner.edit-banner'),
            href: '#',
        },
    ];

    const update_banner = (e: any) => {
        e.preventDefault();
        post(route('banner.update', banner.id));
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('banner.edit-banner')} />
            <div className='container mx-auto px-4 py-8 max-w-4xl'>
                
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Link 
                            href={route('banners.page')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <ImageIcon className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {t('banner.edit-banner')}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">
                                    {t('banner.edit-description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('banner.banner-details')}</CardTitle>
                        <CardDescription>
                            {t('banner.update-information')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={update_banner} className="space-y-6">
                            
                            {/* Title English Field */}
                            <div className='space-y-2'>
                                <Label htmlFor="title_en">
                                    {t('banner.title-en')} <span className="text-red-500">*</span>
                                </Label>
                                <Input 
                                    id="title_en"
                                    type="text" 
                                    value={data.title_en} 
                                    onChange={(e) => setData('title_en', e.target.value)} 
                                    placeholder={t('banner.title-en-placeholder')}
                                    className="w-full"
                                />
                                <InputError message={errors.title_en} />
                            </div>

                            {/* Title Arabic Field */}
                            <div className='space-y-2'>
                                <Label htmlFor="title_ar">
                                    {t('banner.title-ar')} <span className="text-red-500">*</span>
                                </Label>
                                <Input 
                                    id="title_ar"
                                    type="text" 
                                    value={data.title_ar} 
                                    onChange={(e) => setData('title_ar', e.target.value)} 
                                    placeholder={t('banner.title-ar-placeholder')}
                                    className="w-full"
                                    dir="rtl"
                                />
                                <InputError message={errors.title_ar} />
                            </div>

                            {/* Current Image Preview */}
                            {imagePreview && (
                                <div className='space-y-2'>
                                    <Label>{t('banner.current-image')}</Label>
                                    <div className='relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700'>
                                        <img 
                                            src={imagePreview} 
                                            alt={data.title_en || data.title_ar}
                                            className='w-full h-full object-cover'
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Banner+Image';
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Image Upload */}
                            <div className='space-y-2'>
                                <Label htmlFor="image">
                                    {t('banner.new-image')}
                                </Label>
                                <label 
                                    htmlFor="image" 
                                    className='border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col justify-center items-center gap-3 py-8 cursor-pointer hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200'
                                >
                                    <input 
                                        type="file" 
                                        className='hidden' 
                                        id='image' 
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                    {data.image ? (
                                        <div className='relative w-full px-4'>
                                            <img 
                                                src={imagePreview || ''} 
                                                alt="New Preview" 
                                                className='w-full h-48 object-cover rounded-lg shadow-md' 
                                            />
                                            <div className='absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                                                <MdAddPhotoAlternate size={40} className="text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                                                <CiImageOn size={40} className="text-gray-600 dark:text-gray-300" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {t('banner.change-image')}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {t('banner.image-format')}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </label>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {t('banner.leave-empty')}
                                </p>
                                <InputError message={errors.image} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button 
                                    type='submit' 
                                    disabled={processing}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing ? t('banner.updating') : t('banner.update')}
                                </Button>
                                <Link href={route('banners.page')}>
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        className="w-full"
                                    >
                                        {t('banner.cancel')}
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
