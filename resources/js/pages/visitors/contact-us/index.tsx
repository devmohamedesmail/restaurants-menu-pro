import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Card, CardContent } from '@/components/ui/card';
import { Settings } from '@/types/settings';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';

interface AppPageProps extends PageProps {
  settings: Settings;
  locale: string;
}

export default function ContactUs() {
  const { settings, locale } = usePage<AppPageProps>().props;

  // Helper to get localized text
  const getLocalized = (en: string | undefined, ar: string | undefined) => {
    return locale === 'ar' ? (ar || en) : (en || ar);
  };

  const title = getLocalized(settings.title_en, settings.title_ar);
  const description = getLocalized(settings.description_en, settings.description_ar);
  const currency = getLocalized(settings.currency_en, settings.currency_ar);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="grow">
        {/* Hero Section */}
        <div className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Contact Info Grid */}
        <div className="container mx-auto px-4 -mt-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address Card */}
            <Card className="shadow-lg border-0 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {locale === 'ar' ? 'العنوان' : 'Our Address'}
                </h3>
                <p className="text-gray-600">
                  {settings.address || (locale === 'ar' ? 'غير متوفر' : 'Not available')}
                </p>
              </CardContent>
            </Card>

            {/* Phone Card */}
            <Card className="shadow-lg border-0 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                </h3>
                <p className="text-gray-600" dir="ltr">
                  {settings.phone || (locale === 'ar' ? 'غير متوفر' : 'Not available')}
                </p>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="shadow-lg border-0 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {locale === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                </h3>
                <p className="text-gray-600 break-all">
                  {settings.email || (locale === 'ar' ? 'غير متوفر' : 'Not available')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
