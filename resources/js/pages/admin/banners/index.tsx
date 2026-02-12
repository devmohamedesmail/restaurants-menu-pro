import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, Edit } from 'lucide-react';


declare function route(name: string, params?: any): string
export default function Banners({ banners }: any) {
    const { t, i18n } = useTranslation();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        title_en: '',
        title_ar: '',
        image: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('banner.page-title'),
            href: '/dashboard',
        },
    ];

    const add_banner = (e: any) => {
        e.preventDefault();
        post(route('banner.store'), {
            onSuccess: () => {
                reset();
                setImagePreview(null);
            }
        });
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
            <Head title={t('banner.page-title')} />
            <div className='container mx-auto px-4 py-8 max-w-7xl'>

                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <ImageIcon className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                {t('banner.page-title')}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                {t('banner.page-description')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>

                    {/* Create Banner Form */}
                    <div className='lg:col-span-4'>
                        <Card className="sticky top-4">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Plus className="w-5 h-5 text-primary" />
                                    <CardTitle>{t('banner.add-new')}</CardTitle>
                                </div>
                                <CardDescription>
                                    {t('banner.add-description')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={add_banner} className="space-y-4">
                                    <div className='space-y-2'>
                                        <Label htmlFor="title_en">
                                            {t('banner.title-en')}
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

                                    <div className='space-y-2'>
                                        <Label htmlFor="title_ar">
                                            {t('banner.title-ar')}
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

                                    <div className='space-y-2'>
                                        <Label htmlFor="image">
                                            {t('banner.image')}
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
                                            {imagePreview ? (
                                                <div className='relative w-full px-4'>
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className='w-full h-48 object-cover rounded-lg shadow-md'
                                                    />
                                                    <div className='absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
                                                        {/* <MdAddPhotoAlternate size={40} className="text-white" /> */}
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                                                        {/* <CiImageOn size={40} className="text-gray-600 dark:text-gray-300" /> */}
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                            {t('banner.select-image')}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            {t('banner.image-format')}
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </label>
                                        <InputError message={errors.image} />
                                    </div>

                                    <Button
                                        type='submit'
                                        disabled={processing}
                                        className="w-full"
                                    >
                                        {processing ? t('banner.saving') : t('banner.save')}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Banners List */}
                    <div className='lg:col-span-8'>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>{t('banner.all-banners')}</CardTitle>
                                        <CardDescription>
                                            {t('banner.total-banners', { count: banners?.length || 0 })}
                                        </CardDescription>
                                    </div>
                                    <div className="px-3 py-1 bg-primary/10 rounded-full">
                                        <span className="text-sm font-semibold text-primary">
                                            {banners?.length || 0} {t('banner.items')}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {banners && banners.length > 0 ? (
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        {banners.map((banner: any) => (
                                            <div
                                                key={banner.id}
                                                className='group relative border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800'
                                            >
                                                {/* Banner Image */}
                                                <div className='relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700'>
                                                    <img
                                                        src={`${banner.image}`}
                                                        alt={banner.title}
                                                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Banner+Image';
                                                        }}
                                                    />
                                                    {/* Overlay on hover */}
                                                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                                                </div>

                                                {/* Banner Info */}
                                                <div className='p-4'>
                                                    <h3 className='font-semibold text-lg text-gray-900 dark:text-white mb-3 line-clamp-1'>
                                                        {i18n.language === 'ar' ? banner.title_ar : banner.title_en}
                                                    </h3>

                                                    {/* Action Buttons */}
                                                    <div className='flex gap-2'>
                                                        <Link
                                                            href={route('banner.edit', banner.id)}
                                                            className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-main hover:bg-main-dark text-white rounded-lg transition-colors duration-200 font-medium'
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                            <span>{t('banner.edit')}</span>
                                                        </Link>
                                                        <Link
                                                            href={route('banner.delete', banner.id)}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (confirm(t('banner.delete-confirm'))) {
                                                                    window.location.href = route('banner.delete', banner.id);
                                                                }
                                                            }}
                                                            className='flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium'
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                                            <ImageIcon className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            {t('banner.no-banners')}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {t('banner.no-banners-description')}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
