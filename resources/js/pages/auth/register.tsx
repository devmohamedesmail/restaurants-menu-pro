import { useState } from 'react';
import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { useTranslation } from 'react-i18next';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import { Eye, EyeOff, KeyRound, Mail, User } from 'lucide-react';

export default function Register() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <Header />
            <AuthLayout
                title={t('auth.create-account')}
                description={t('auth.fill-details')}
            >
                <Head title={t('auth.register')} />
                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-5">

                                {/* Name */}
                                <div className="grid gap-1.5">
                                    <Label htmlFor="name" className="text-sm font-medium">
                                        {t('auth.name')}
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder={t('auth.enter-full-name')}
                                            className="h-11 pl-10"
                                        />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>

                                {/* Email */}
                                <div className="grid gap-1.5">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        {t('auth.email')}
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="email@example.com"
                                            className="h-11 pl-10"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div className="grid gap-1.5">
                                    <Label htmlFor="password" className="text-sm font-medium">
                                        {t('auth.password')}
                                    </Label>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="••••••••"
                                            className="h-11 pl-10 pr-10"
                                        />
                                        <button
                                            type="button"
                                            tabIndex={-1}
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showPassword
                                                ? <EyeOff className="w-4 h-4" />
                                                : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="h-11 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-md shadow-orange-200 dark:shadow-orange-900/30 transition-all"
                                    tabIndex={5}
                                    data-test="register-user-button"
                                >
                                    {processing && <Spinner />}
                                    {t('auth.create-account')}
                                </Button>
                            </div>

                            <div className="text-center text-sm text-muted-foreground">
                                {t('auth.already-account')}{' '}
                                <TextLink href={login()} tabIndex={6} className="font-medium">
                                    {t('auth.login')}
                                </TextLink>
                            </div>
                        </>
                    )}
                </Form>
            </AuthLayout>
            <Footer />
        </div>
    );
}
