import React, { useRef, useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LogOut,
  Mail,
  ShieldCheck,
  User,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import { Link } from '@inertiajs/react'

// @ts-ignore
declare var route: any

// ─── Helpers ────────────────────────────────────────────────────────────────
const getErrorMessage = (error: any): string | undefined => {
  if (typeof error === 'string') return error
  if (Array.isArray(error)) return error.join(', ')
  return undefined
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function VendorProfile({ user }: any) {
  const { t } = useTranslation()
  const { errors: pageErrors, flash }: any = usePage().props

  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false)
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false)
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  // ── Profile Info Form ──────────────────────────────────────────────────
  const profileSchema = Yup.object({
    name: Yup.string().required(t('auth.full-name-required')),
    email: Yup.string().email(t('auth.invalid-email')).required(t('auth.email-required')),
  })

  const profileFormik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      setIsProfileSubmitting(true)
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      if (avatarFile) formData.append('avatar', avatarFile)

      router.post(route('vendor.profile.update'), formData, {
        onSuccess: () => setIsProfileSubmitting(false),
        onError: (errs) => {
          setIsProfileSubmitting(false)
          Object.keys(errs).forEach((key) => profileFormik.setFieldError(key, errs[key]))
        },
      })
    },
  })

  // ── Password Form ──────────────────────────────────────────────────────
  const passwordSchema = Yup.object({
    current_password: Yup.string().required(t('auth.password-required')),
    new_password: Yup.string().min(8, t('auth.password-min')).required(t('auth.password-required')),
    new_password_confirmation: Yup.string()
      .oneOf([Yup.ref('new_password')], t('auth.passwords-must-match'))
      .required(t('auth.confirm-password-required')),
  })

  const passwordFormik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    },
    validationSchema: passwordSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsPasswordSubmitting(true)
      const formData = new FormData()
      formData.append('name', user?.name || '')
      formData.append('email', user?.email || '')
      formData.append('current_password', values.current_password)
      formData.append('new_password', values.new_password)
      formData.append('new_password_confirmation', values.new_password_confirmation)

      router.post(route('vendor.profile.update'), formData, {
        onSuccess: () => {
          setIsPasswordSubmitting(false)
          resetForm()
        },
        onError: (errs) => {
          setIsPasswordSubmitting(false)
          Object.keys(errs).forEach((key) => passwordFormik.setFieldError(key, errs[key]))
        },
      })
    },
  })

  // ── Avatar picker ──────────────────────────────────────────────────────
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setAvatarPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const initials = user?.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Head title={t('profile.title')} />

      {/* ── Top gradient hero banner ──────────────────────────────── */}
      <div className="relative h-52 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        {/* Back navigation */}
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Link href={route('store.dashboard')}>
              ← {t('header.dashboard')}
            </Link>
          </Button>
        </div>

        {/* Logout button */}
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => router.post(route('logout'))}
          >
            <LogOut className="w-4 h-4 mr-1" />
            {t('auth.logout')}
          </Button>
        </div>
      </div>

      {/* ── Avatar + name strip ───────────────────────────────────── */}
      <div className="container mx-auto px-4">
        <div className="-mt-16 mb-8 flex flex-col sm:flex-row items-center sm:items-end gap-4">

          {/* Clickable avatar */}
          <div className="relative group shrink-0">
            <Avatar className="w-28 h-28 border-4 border-white dark:border-gray-900 shadow-xl ring-4 ring-indigo-500/30">
              <AvatarImage src={avatarPreview || undefined} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-bold">
                {initials || <User className="w-10 h-10" />}
              </AvatarFallback>
            </Avatar>

            {/* Camera overlay */}
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            >
              <Camera className="w-7 h-7 text-white" />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="text-center sm:text-left pb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
            <p className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <Mail className="w-3.5 h-3.5" />
              {user?.email}
            </p>
          </div>

          {/* Spacer + quick save avatar hint */}
          {avatarFile && (
            <div className="sm:ml-auto pb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium px-3 py-1.5 border border-amber-200 dark:border-amber-700">
                <Camera className="w-3 h-3" />
                {t('profile.avatar')} — {t('common.saving')}
              </span>
            </div>
          )}
        </div>

        {/* ── Flash success banner ─────────────────────────────── */}
        {(flash as any)?.success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-4 py-3 text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{(flash as any).success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">

          {/* ── Personal Information Card ─────────────────────── */}
          <Card className="shadow-md border-0 dark:bg-gray-900/60 dark:border dark:border-gray-800 backdrop-blur-sm">
            <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <CardTitle className="text-base">{t('profile.personal-info')}</CardTitle>
                  <CardDescription className="text-xs mt-0.5">{t('profile.personal-info-desc')}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={profileFormik.handleSubmit} className="space-y-5">

                {/* Avatar picker shortcut */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-200 dark:border-gray-700">
                  <Avatar className="w-14 h-14 border-2 border-indigo-200 dark:border-indigo-800 shrink-0">
                    <AvatarImage src={avatarPreview || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('profile.avatar')}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5 truncate">{t('common.file-size-limit')}</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => avatarInputRef.current?.click()}
                    className="shrink-0"
                  >
                    <Camera className="w-3.5 h-3.5 mr-1.5" />
                    {t('common.change')}
                  </Button>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {t('auth.name')}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={profileFormik.values.name}
                      onChange={profileFormik.handleChange}
                      onBlur={profileFormik.handleBlur}
                      disabled={isProfileSubmitting}
                      placeholder={t('auth.enter-name')}
                      className="h-11 pl-10"
                    />
                  </div>
                  {profileFormik.touched.name && profileFormik.errors.name && (
                    <InputError message={getErrorMessage(profileFormik.errors.name)} />
                  )}
                  {pageErrors?.name && (
                    <InputError message={pageErrors.name} />
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t('auth.email')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileFormik.values.email}
                      onChange={profileFormik.handleChange}
                      onBlur={profileFormik.handleBlur}
                      disabled={isProfileSubmitting}
                      placeholder={t('auth.enter-email')}
                      className="h-11 pl-10"
                    />
                  </div>
                  {profileFormik.touched.email && profileFormik.errors.email && (
                    <InputError message={getErrorMessage(profileFormik.errors.email)} />
                  )}
                  {pageErrors?.email && (
                    <InputError message={pageErrors.email} />
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isProfileSubmitting}
                  className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/30"
                >
                  {isProfileSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      {t('profile.updating-profile')}
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {t('profile.update-profile')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* ── Security / Change Password Card ──────────────── */}
          <Card className="shadow-md border-0 dark:bg-gray-900/60 dark:border dark:border-gray-800 backdrop-blur-sm">
            <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-base">{t('profile.security')}</CardTitle>
                  <CardDescription className="text-xs mt-0.5">{t('profile.security-desc')}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={passwordFormik.handleSubmit} className="space-y-5">
                <p className="text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-100 dark:border-gray-700">
                  <KeyRound className="inline w-3.5 h-3.5 mr-1 mb-0.5 text-gray-400" />
                  {t('profile.leave-blank')}
                </p>

                {/* Current password */}
                <div className="space-y-1.5">
                  <Label htmlFor="current_password" className="text-sm font-medium">
                    {t('profile.current-password')}
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="current_password"
                      name="current_password"
                      type={showCurrentPw ? 'text' : 'password'}
                      value={passwordFormik.values.current_password}
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      disabled={isPasswordSubmitting}
                      placeholder={t('profile.enter-current-password')}
                      className="h-11 pl-10 pr-10"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowCurrentPw(!showCurrentPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordFormik.touched.current_password && passwordFormik.errors.current_password && (
                    <InputError message={getErrorMessage(passwordFormik.errors.current_password)} />
                  )}
                  {pageErrors?.current_password && (
                    <InputError message={pageErrors.current_password} />
                  )}
                </div>

                {/* New password */}
                <div className="space-y-1.5">
                  <Label htmlFor="new_password" className="text-sm font-medium">
                    {t('profile.new-password')}
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="new_password"
                      name="new_password"
                      type={showNewPw ? 'text' : 'password'}
                      value={passwordFormik.values.new_password}
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      disabled={isPasswordSubmitting}
                      placeholder={t('profile.enter-new-password')}
                      className="h-11 pl-10 pr-10"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordFormik.touched.new_password && passwordFormik.errors.new_password && (
                    <InputError message={getErrorMessage(passwordFormik.errors.new_password)} />
                  )}
                  {pageErrors?.new_password && (
                    <InputError message={pageErrors.new_password} />
                  )}
                </div>

                {/* Confirm new password */}
                <div className="space-y-1.5">
                  <Label htmlFor="new_password_confirmation" className="text-sm font-medium">
                    {t('profile.confirm-new-password')}
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="new_password_confirmation"
                      name="new_password_confirmation"
                      type={showConfirmPw ? 'text' : 'password'}
                      value={passwordFormik.values.new_password_confirmation}
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      disabled={isPasswordSubmitting}
                      placeholder={t('profile.enter-confirm-password')}
                      className="h-11 pl-10 pr-10"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordFormik.touched.new_password_confirmation && passwordFormik.errors.new_password_confirmation && (
                    <InputError message={getErrorMessage(passwordFormik.errors.new_password_confirmation)} />
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isPasswordSubmitting}
                  className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-200 dark:shadow-emerald-900/30"
                >
                  {isPasswordSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      {t('profile.updating-password')}
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      {t('profile.update-password')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
