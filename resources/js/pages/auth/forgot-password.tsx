import React from 'react';
import { Leaf, ArrowRight, LoaderCircle, ArrowLeft } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout'; 

// ----------------------------------------------------------------------
// MOCKS FOR PREVIEW (DELETE THESE IN YOUR ACTUAL PROJECT)
// ----------------------------------------------------------------------
const Head = ({ title }) => <div className="hidden">Title: {title}</div>;
const InputError = ({ message, className }) => message ? <p className={`text-sm text-red-600 font-medium ${className}`}>{message}</p> : null;
const TextLink = ({ href, children, className, ...props }) => <a href={href} className={`text-[#2E7D32] hover:text-[#1B5E20] hover:underline transition-colors font-medium ${className}`} {...props}>{children}</a>;
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
const Form = ({ children, className, ...props }) => <form className={className} {...props}>{children({ processing: false, errors: {} })}</form>;

// Mock Routes
const login = () => '/login';
const email = { form: () => ({}) };
// ----------------------------------------------------------------------
// END MOCKS
// ----------------------------------------------------------------------

// Wrapper to apply the centered single-page design
const AuthLayoutWrapper = ({ title, description, children }) => (
    <AppHeaderLayout>
        <div className="flex items-center justify-center py-12 bg-[#FDFBF7]">
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

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayoutWrapper
            title="Forgot password?"
            description="No worries! Enter your email and we'll send you a reset link."
        >
            <Head title="Forgot password" />

            {status && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 mb-6">
                    <Leaf size={16} />
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@example.com"
                                    className={errors.email ? "border-red-500 focus-visible:ring-red-500 bg-red-50/50" : ""}
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            <div className="mt-6 flex items-center justify-start">
                                <Button
                                    className="w-full text-base py-6"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                    )}
                                    Send reset link
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="text-center pt-2">
                    <TextLink 
                        href={login()} 
                        className="inline-flex items-center gap-2 font-bold text-gray-500 hover:text-[#2E7D32] transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to log in
                    </TextLink>
                </div>
            </div>
        </AuthLayoutWrapper>
    );
}