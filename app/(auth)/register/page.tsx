'use client'

import Link from 'next/link';
import { Controller, useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaStar, FaTruck, FaShieldAlt } from 'react-icons/fa';
import { UserPlus, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { userRegister } from '@/Api/Actions/auth.actions';
import { toast } from "@/components/ui/toast"
import { el } from 'zod/locales';
import { useRouter } from 'next/navigation';

const schema = z
    .object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        email: z.string().email('Enter a valid email'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[0-9]/, 'Password must contain a number')
            .regex(/[^A-Za-z0-9]/, 'Password must contain a symbol'),
        rePassword: z.string().min(1, 'Please confirm your password'),
        phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number (01xxxxxxxxx)'),
        terms: z.boolean().refine((v) => v === true, 'You must accept the terms'),
    })
    .refine((data) => data.password === data.rePassword, {
        path: ['rePassword'],
        message: 'Passwords do not match',
    });

export type FormValues = z.infer<typeof schema>;

const features = [
    { icon: FaStar, title: 'Premium Quality', text: 'Premium quality products sourced from trusted suppliers.' },
    { icon: FaTruck, title: 'Fast Delivery', text: 'Same-day delivery available in most areas' },
    { icon: FaShieldAlt, title: 'Secure Shopping', text: 'Your data and payments are completely secure' },
];

const inputClass =
    'h-12 rounded-lg border-gray-200 bg-white px-3.5 text-sm focus-visible:border-green-600 focus-visible:ring-green-100';

function getStrength(password: string) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;

    if (!password) return { label: 'Weak', percent: 0, color: 'bg-gray-300' };
    if (score <= 1) return { label: 'Weak', percent: 25, color: 'bg-red-500' };
    if (score === 2) return { label: 'Fair', percent: 50, color: 'bg-amber-500' };
    if (score === 3) return { label: 'Good', percent: 75, color: 'bg-lime-500' };
    return { label: 'Strong', percent: 100, color: 'bg-green-600' };
}

type TextFieldProps = {
    control: Control<FormValues>;
    name: 'name' | 'email' | 'rePassword' | 'phone';
    label: string;
    placeholder: string;
    type?: string;
};

function TextField({ control, name, label, placeholder, type = 'text' }: TextFieldProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-base font-medium text-slate-800">
                        {label}
                        <span className="text-gray-500">*</span>
                    </FieldLabel>
                    <Input
                        {...field}
                        id={field.name}
                        type={type}
                        placeholder={placeholder}
                        aria-invalid={fieldState.invalid}
                        className={inputClass}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}


export default function Register() {
    const router = useRouter()
    const { control, handleSubmit, watch } = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
            terms: false,
        },
    });

    const strength = getStrength(watch('password'));

    async function onSubmit(values: FormValues)  {
        const isRegisterd = await userRegister(values)
     console.log(isRegisterd)
     if(isRegisterd){
         toast.add({
            type: "success",
            description: "Your account created successfully.",
            priority: "high",
         })
         router.push('/login')
     }
     else{
         toast.add({
            type: "error",
            description: "Account could not be created.",
            priority: "high",
         })
     }
    };

    return (
        <section className="py-12 lg:py-16">
            <div className="container mx-auto grid max-w-[1280px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">

                {/* ================= Left ================= */}
                <div className="pt-2">
                    <h1 className="text-4xl font-extrabold text-slate-800 md:text-5xl">
                        Welcome to <span className="text-green-600">FreshCart</span>
                    </h1>
                    <p className="mt-3 text-xl leading-relaxed text-slate-800">
                        Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
                    </p>

                    <ul className="mt-9 space-y-6">
                        {features.map(({ icon: Icon, title, text }) => (
                            <li key={title} className="flex items-center gap-4">
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                                    <p className="text-slate-700">{text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Testimonial */}
                    <div className="mt-8 rounded-lg bg-white p-4 shadow-md">
                        <div className="flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-green-400 text-white">
                                <User className="h-7 w-7" />
                            </span>
                            <div>
                                <p className="text-slate-800">Sarah Johnson</p>
                                <div className="flex gap-0.5 text-yellow-400">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <FaStar key={i} className="h-4 w-4" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="mt-3 italic leading-relaxed text-slate-700">
                            &quot;FreshCart has transformed my shopping experience. The quality of the products is
                            outstanding, and the delivery is always on time. Highly recommend!&quot;
                        </p>
                    </div>
                </div>

                {/* ================= Right ================= */}
                <div className="h-fit rounded-lg bg-white p-6 shadow-lg">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-slate-800">Create Your Account</h2>
                        <p className="mt-2 text-lg text-slate-700">Start your fresh journey with us today</p>
                    </div>

                    {/* Social */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button type="button" variant="outline" className="h-11 gap-2 font-semibold text-slate-800">
                            <FcGoogle className="h-5 w-5" /> Google
                        </Button>
                        <Button type="button" variant="outline" className="h-11 gap-2 font-semibold text-slate-800">
                            <FaFacebook className="h-5 w-5 text-[#1877F2]" /> Facebook
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <span className="h-px flex-1 bg-gray-200" />
                        <span className="text-slate-700">or</span>
                        <span className="h-px flex-1 bg-gray-200" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                        <TextField control={control} name="name" label="Name" placeholder="Ali" />

                        <TextField control={control} name="email" label="Email" type="email" placeholder="ali@example.com" />

                        {/* Password + strength */}
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-base font-medium text-slate-800">
                                        Password<span className="text-gray-500">*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        placeholder="create a strong password"
                                        aria-invalid={fieldState.invalid}
                                        className={inputClass}
                                    />
                                    <div className="flex items-center gap-3">
                                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                                                style={{ width: `${strength.percent}%` }}
                                            />
                                        </div>
                                        <span className="text-sm text-slate-700">{strength.label}</span>
                                    </div>
                                    <p className="text-xs text-slate-600">
                                        Must be at least 8 characters with numbers and symbols
                                    </p>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <TextField control={control} name="rePassword" label="Confirm Password" type="password" placeholder="confirm your password" />

                        <TextField control={control} name="phone" label="Phone Number" type="tel" placeholder="+1 234 567 8900" />

                        {/* Terms */}
                        <Controller
                            name="terms"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                                    <Checkbox
                                        id={field.name}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        aria-invalid={fieldState.invalid}
                                        className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                                    />
                                    <FieldLabel htmlFor={field.name} className="font-normal text-slate-800">
                                        <span>
                                            I agree to the{' '}
                                            <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link>{' '}
                                            and{' '}
                                            <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>{' '}
                                            <span className="text-gray-500">*</span>
                                        </span>
                                    </FieldLabel>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Button
                            type="submit"
                            className="h-12 w-full gap-2 bg-green-600 font-semibold text-white hover:bg-green-700"
                        >
                            <UserPlus className="h-5 w-5" />
                            Create My Account
                        </Button>
                    </form>

                    <div className="mt-6 border-t border-gray-200 pt-6 text-center text-slate-700">
                        Already have an account?{' '}
                        <Link href="/signin" className="font-semibold text-green-600 hover:underline">Sign In</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}