import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { CheckSquare, ArrowLeft } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <>
            <Head title="Log in - TaskFlow" />
            
            <div className="relative min-h-screen overflow-hidden bg-gray-900">
                {/* Background Image with Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=100&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3)',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/65 to-indigo-900/70"></div>
                </div>

                {/* Back to Home */}
                <div className="relative z-10 p-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Home
                    </Link>
                </div>

                {/* Login Form */}
                <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">
                        {/* Logo */}
                        <div className="mb-8 text-center">
                            <Link href="/" className="inline-flex items-center gap-2">
                                <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-2 shadow-lg">
                                    <CheckSquare className="size-8 text-white" />
                                </div>
                                <span className="text-3xl font-bold text-white">TaskFlow</span>
                            </Link>
                        </div>

                        {/* Card */}
                        <div className="rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
                            {/* Header */}
                            <div className="mb-6 text-center">
                                <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                                <p className="mt-2 text-gray-300">Log in to continue to your dashboard</p>
                            </div>

                            {status && (
                                <div className="mb-4 rounded-lg bg-green-500/20 border border-green-500/30 p-3 text-center text-sm font-medium text-green-300">
                                    {status}
                                </div>
                            )}

                            <Form
                                {...store.form()}
                                resetOnSuccess={['password']}
                                className="space-y-4"
                            >
                                {({ processing, errors}) => (
                                    <>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="email" className="text-white">Email address</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="email"
                                                    placeholder="email@example.com"
                                                    className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                                <InputError message={errors.email} className="text-red-300" />
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="password" className="text-white">Password</Label>
                                                    {canResetPassword && (
                                                        <TextLink
                                                            href={request()}
                                                            className="text-sm text-indigo-300 hover:text-indigo-200"
                                                            tabIndex={5}
                                                        >
                                                            Forgot password?
                                                        </TextLink>
                                                    )}
                                                </div>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="Enter your password"
                                                    className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                                <InputError message={errors.password} className="text-red-300" />
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                    tabIndex={3}
                                                    className="border-white/30 data-[state=checked]:bg-indigo-600"
                                                />
                                                <Label htmlFor="remember" className="text-white">Remember me</Label>
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-6 text-lg font-semibold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                                                tabIndex={4}
                                                disabled={processing}
                                                data-test="login-button"
                                            >
                                                {processing && <Spinner />}
                                                {processing ? 'Logging in...' : 'Log in'}
                                            </Button>
                                        </div>

                                        {canRegister && (
                                            <div className="mt-6 text-center text-sm text-gray-300">
                                                Don't have an account?{' '}
                                                <Link href={register()} className="font-semibold text-indigo-300 hover:text-indigo-200">
                                                    Sign up
                                                </Link>
                                            </div>
                                        )}
                                    </>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
