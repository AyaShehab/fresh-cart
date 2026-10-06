'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Mail, Lock, Eye, EyeOff, Truck, ShieldCheck, Clock, Star, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import img1 from '../../assets/2e5810ff3e-e750761ebcd4ae5907db.png'
// import { userLogin } from '@/Api/Actions/auth.actions';
import { toast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const schema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(1, 'Password is required'),
    keepSignedIn: z.boolean(),
});

export type LoginValues = z.infer<typeof schema>;

const highlights = [
    { icon: Truck, text: 'Free Delivery' },
    { icon: ShieldCheck, text: 'Secure Payment' },
    { icon: Clock, text: '24/7 Support' },
];

const inputClass =
    'h-13 rounded-xl border-2 border-gray-200 bg-white pl-12 text-base focus-visible:border-green-600 focus-visible:ring-green-100';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<LoginValues>({
        resolver: zodResolver(schema),
        mode: 'onTouched',
        defaultValues: { email: '', password: '', keepSignedIn: false },
    });
const router = useRouter();

async function onSubmit(data: LoginValues) {
    const result = await signIn('credentials', {...data,redirect:false });

    if (result?.error) {
        toast.add({
            type: 'error',
            description: result.error,
            priority: 'high',
        });
        return;
    }

    toast.add({
        type: 'success',
        description: 'Logged in successfully.',
        priority: 'high',
    });
    router.push('/');
    router.refresh();
}

    return (
        <section className="py-12 lg:py-16">
            <div className="container mx-auto grid max-w-[1280px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">

                {/* ================= Left ================= */}
                <div className="text-center">
                    <div className="relative mx-auto h-[300px] w-full overflow-hidden rounded-2xl bg-white shadow-lg sm:h-[380px]">
                        <Image
                            src={img1}
                            alt="Shopping cart full of fresh vegetables"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    <h2 className="mt-8 text-3xl font-bold leading-snug text-slate-800 md:text-4xl">
                        FreshCart - Your One-Stop Shop for Fresh Products
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-lg text-slate-600">
                        Join thousands of happy customers who trust FreshCart for their daily grocery needs
                    </p>

                    <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
                        {highlights.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-center gap-2">
                                <Icon className="h-4 w-4 text-green-600" />
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ================= Right ================= */}
                <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-10">
                    <div className="mb-8 text-center">
                        <p className="text-4xl font-extrabold text-slate-800">
                            <span className="text-green-600">Fresh</span>Cart
                        </p>
                        <h1 className="mt-6 text-3xl font-bold text-slate-800">Welcome Back!</h1>
                        <p className="mt-2 text-lg text-slate-600">
                            Sign in to continue your fresh shopping experience
                        </p>
                    </div>

                    {/* Social */}
                    <div className="space-y-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-13 w-full gap-3 rounded-xl border-2 text-base font-medium text-slate-700"
                        >
                            <FcGoogle className="h-5 w-5" /> Continue with Google
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-13 w-full gap-3 rounded-xl border-2 text-base font-medium text-slate-700"
                        >
                            <FaFacebook className="h-5 w-5 text-[#1877F2]" /> Continue with Facebook
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <span className="h-px flex-1 bg-gray-200" />
                        <span className="text-sm uppercase tracking-wide text-slate-500">or continue with email</span>
                        <span className="h-px flex-1 bg-gray-200" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                        {/* Email */}
                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="font-semibold text-slate-800">
                                        Email Address
                                    </FieldLabel>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="email"
                                            placeholder="Enter your email"
                                            aria-invalid={fieldState.invalid}
                                            className={inputClass}
                                        />
                                    </div>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Password */}
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel htmlFor={field.name} className="font-semibold text-slate-800">
                                            Password
                                        </FieldLabel>
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm font-medium text-green-600 hover:underline"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            {...field}
                                            id={field.name}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            aria-invalid={fieldState.invalid}
                                            className={`${inputClass} pr-12`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((s) => !s)}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Keep me signed in */}
                        <Controller
                            name="keepSignedIn"
                            control={control}
                            render={({ field }) => (
                                <Field orientation="horizontal">
                                    <Checkbox
                                        id={field.name}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                                    />
                                    <FieldLabel htmlFor={field.name} className="font-normal text-slate-700">
                                        Keep me signed in
                                    </FieldLabel>
                                </Field>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-13 w-full rounded-xl bg-green-600 text-lg font-semibold text-white shadow-md hover:bg-green-700 disabled:opacity-60"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="mt-8 border-t border-gray-100 pt-6 text-center text-slate-600">
                        New to FreshCart?{' '}
                        <Link href="/register" className="font-semibold text-green-600 hover:underline">
                            Create an account
                        </Link>
                    </div>

                    <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
                        <li className="flex items-center gap-1.5"><Lock className="h-4 w-4" /> SSL Secured</li>
                        <li className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 50K+ Users</li>
                        <li className="flex items-center gap-1.5"><Star className="h-4 w-4" /> 4.9 Rating</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}