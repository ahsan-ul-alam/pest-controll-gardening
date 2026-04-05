import React, { useState } from 'react';
import { Leaf, ArrowRight, Eye, EyeOff } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';

// ----------------------------------------------------------------------
// MOCKS FOR PREVIEW (DELETE THESE IN YOUR ACTUAL PROJECT)
// ----------------------------------------------------------------------
const Head = ({ title }) => <div className="hidden">Title: {title}</div>;
const InputError = ({ message, className }) => message ? <p className={`text-sm text-red-600 font-medium ${className}`}>{message}</p> : null;
const Spinner = () => <span className="animate-spin mr-2">⟳</span>;
const Label = ({ children, htmlFor }) => <label htmlFor={htmlFor} className="block text-sm font-bold text-gray-700 mb-1.5 uppercase tracking-wide text-xs">{children}</label>;
const Input = ({ className, ...props }) => (
  <input 
    className={`flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`} 
    {...props} 
  />
);
const Button = ({ children, className, disabled, variant = 'primary', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-bold ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 active:scale-95";
  const variants = {
    primary: "bg-[#2E7D32] text-white hover:bg-[#1B5E20] shadow-lg shadow-green-900/20",
    outline: "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
  };
  return (
    <button 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`} 
      {...props} 
    >
      {children}
    </button>
  );
};

// Form Mock
const Form = ({ children, className, resetOnSuccess, transform, ...props }) => <form className={className} {...props}>{children({ processing: false, errors: {} })}</form>;

// Mock Routes
const update = { form: () => ({}) };
// ----------------------------------------------------------------------
// END MOCKS
// ----------------------------------------------------------------------

// Wrapper to apply the centered single-page design
const AuthLayoutWrapper = ({ title, description, children }) => (
    <AppHeaderLayout>
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6 bg-[#FDFBF7]">
            <div className="w-full max-w-md space-y-8">
                 {/* Centered Header */}
                 <div className="text-center">
                    {/* <div className="inline-flex items-center gap-2 mb-8">
                        <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center text-white shadow-lg shadow-green-900/20">
                            <Leaf size={24} />
                        </div>
                    </div> */}
                    <h1 className="text-3xl md:text-4xl font-black text-[#1A1A1A] font-serif mb-3">
                        {title}
                    </h1>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    {children}
                </div>
            </div>
        </div>
    </AppHeaderLayout>
);

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <AuthLayoutWrapper
            title="Reset password"
            description="Please enter your new password below"
        >
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <div className="grid gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                className="mt-1 block w-full bg-gray-50 text-gray-500 cursor-not-allowed focus-visible:ring-0 border-gray-100"
                                readOnly
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="new-password"
                                    className={`pr-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500 bg-red-50/50" : ""}`}
                                    autoFocus
                                    placeholder="New password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirm password <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    className={`pr-10 ${errors.password_confirmation ? "border-red-500 focus-visible:ring-red-500 bg-red-50/50" : ""}`}
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-1"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full text-base py-6"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && <Spinner />}
                            Reset password
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                )}
            </Form>
        </AuthLayoutWrapper>
    );
}