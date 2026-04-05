import React, { useState } from 'react';
import { Leaf, ArrowRight, Eye, EyeOff } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout'; 
import { Link, Head } from '@inertiajs/react';

// ----------------------------------------------------------------------
// MOCKS FOR PREVIEW (DELETE THESE IN YOUR ACTUAL PROJECT)
// ----------------------------------------------------------------------
const InputError = ({ message, className }) => message ? <p className={`text-sm text-red-600 font-medium ${className}`}>{message}</p> : null;
const TextLink = ({ href, children, className, ...props }) => <a href={href} className={`text-[#2E7D32] hover:text-[#1B5E20] hover:underline transition-colors font-medium ${className}`} {...props}>{children}</a>;
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

// Form Mock (Destructuring resetOnSuccess to avoid DOM warning)
const Form = ({ children, className, resetOnSuccess, disableWhileProcessing, ...props }) => <form className={className} {...props}>{children({ processing: false, errors: {} })}</form>;

// Mock Routes
const login = () => '/login';
const store = { form: () => ({}) };

// Brand Icons
const GoogleIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="#1877F2" {...props}>
     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
// ----------------------------------------------------------------------
// END MOCKS
// ----------------------------------------------------------------------


const AuthLayoutWrapper = ({ title, description, children }) => (
    <AppHeaderLayout>
        <Head title="Registration" />
        <div className="flex min-h-[calc(100vh-80px)]">
            {/* Left Side: Immersive Image (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#1B5E20] overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1668189777890-495c36095340?q=80&w=1170&auto=format&fit=crop" 
                    alt="Lush Green Lawn" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
                <div className="absolute bottom-0 left-0 right-0 p-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                    <h2 className="text-4xl lg:text-5xl font-black font-serif mb-6 leading-[1.1]">
                        Join the future <br/> of lawn care.
                    </h2>
                    <p className="text-lg text-white/90 font-medium max-w-md leading-relaxed">
                        Create your free account today and get a custom plan tailored specifically to your soil and climate.
                    </p>
                </div>
            </div>

            {/* Right Side: Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-[#FDFBF7]">
                <div className="w-full max-w-md space-y-8">
                     {/* Mobile Header */}
                     <div className="text-center lg:text-left">
                        {/* <div className="inline-flex lg:hidden items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-[#2E7D32] rounded-full flex items-center justify-center text-white">
                                <Leaf size={20} />
                            </div>
                            <span className="text-2xl font-black text-[#1A1A1A]">TurfTec</span>
                        </div> */}
                        <h1 className="text-3xl md:text-4xl font-black text-[#1A1A1A] font-serif mb-3">
                            {title}
                        </h1>
                        <p className="text-gray-500 text-lg">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    </AppHeaderLayout>
);


export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <AuthLayoutWrapper
            title="Create an account"
            description="Enter your details below to create your account"
            className="text-3xl md:text-4xl font-black text-[#1A1A1A] font-serif mb-3"
        >
            <Head title="Register" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            {/* Name Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                    className={errors.name ? "border-red-500 focus-visible:ring-red-500 bg-red-50/50" : ""}
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-1"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address <span className="text-red-500">*</span></Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className={errors.email ? "border-red-500 focus-visible:ring-red-500 bg-red-50/50" : ""}
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Password Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Create a password"
                                        className={`pr-10 ${errors.password ? "border-red-500 focus-visible:ring-red-500 bg-red-50/50" : ""}`}
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

                            {/* Confirm Password Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Confirm your password"
                                        className={`pr-10 ${errors.password_confirmation ? "border-red-500 focus-visible:ring-red-500 bg-red-50/50" : ""}`}
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
                                className="mt-2 w-full text-base py-6"
                                tabIndex={5}
                                disabled={processing}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create account
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>

                         {/* OAuth Divider */}
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#FDFBF7] px-2 text-gray-500 font-bold tracking-wider">
                                    Or sign up with
                                </span>
                            </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="w-full gap-2 font-semibold text-gray-700 h-12 cursor-pointer"
                                onClick={() => console.log('Google Signup')}
                            >
                                <GoogleIcon className="w-5 h-5" />
                                Google
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="w-full gap-2 font-semibold text-gray-700 h-12 cursor-pointer"
                                onClick={() => console.log('Facebook Signup')}
                            >
                                <FacebookIcon className="w-5 h-5" />
                                Facebook
                            </Button>
                        </div>

                        <div className="text-center mt-6 pt-4 border-t border-gray-100">
                            <p className="text-gray-500 text-sm">
                                Already have an account?{' '}
                                <Link href={login()} tabIndex={6} className="font-bold text-lg block mt-1 text-[#2E7D32]">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayoutWrapper>
    );
}