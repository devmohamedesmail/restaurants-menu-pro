import { useState } from 'react';
import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { useTranslation } from 'react-i18next';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Eye, EyeOff, KeyRound, Mail } from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status, canResetPassword, canRegister }: Props) {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <Head title={t('auth.login')} />
            <Header />

            <AuthLayout
                title={t('auth.login-to-account')}
                description={t('auth.enter-credentials')}
            >
                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-5">

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
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                            className="h-11 pl-10"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div className="grid gap-1.5">
                                    <div className="flex items-center">
                                        <Label htmlFor="password" className="text-sm font-medium">
                                            {t('auth.password')}
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="ml-auto text-xs"
                                                tabIndex={5}
                                            >
                                                {t('auth.forgot-password')}
                                            </TextLink>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
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

                                {/* Remember me */}
                                <div className="flex items-center space-x-2.5">
                                    <Checkbox id="remember" name="remember" tabIndex={3} />
                                    <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">
                                        {t('auth.remember')}
                                    </Label>
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="h-11 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-md shadow-orange-200 dark:shadow-orange-900/30 transition-all"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <Spinner />}
                                    {t('auth.login')}
                                </Button>
                            </div>

                            {/* Status */}
                            {status && (
                                <div className="mt-4 text-center text-sm font-medium text-green-600">
                                    {status}
                                </div>
                            )}

                            {/* Sign up link */}
                            {canRegister && (
                                <div className="text-center text-sm text-muted-foreground">
                                    {t('auth.no-account')}{' '}
                                    <TextLink href={register()} tabIndex={5} className="font-medium">
                                        {t('auth.sign-up')}
                                    </TextLink>
                                </div>
                            )}
                        </>
                    )}
                </Form>
            </AuthLayout>

            <Footer />
        </div>
    );
}
