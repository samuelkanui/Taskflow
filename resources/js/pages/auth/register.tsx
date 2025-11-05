import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckSquare, UserPlus } from 'lucide-react';

export default function Register() {
    return (
        <>
            <Head title="Register - TaskFlow" />

            <div className="relative min-h-screen overflow-hidden bg-gray-900">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=100&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3)',
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

                {/* Register Form */}
                <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">
                        {/* Logo */}
                        <div className="mb-8 text-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2"
                            >
                                <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-2 shadow-lg">
                                    <CheckSquare className="size-8 text-white" />
                                </div>
                                <span className="text-3xl font-bold text-white">
                                    TaskFlow
                                </span>
                            </Link>
                        </div>

                        {/* Card */}
                        <div className="rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
                            {/* Header */}
                            <div className="mb-6 text-center">
                                <div className="mb-3 inline-flex items-center gap-2">
                                    <UserPlus className="size-6 text-indigo-300" />
                                </div>
                                <h1 className="text-3xl font-bold text-white">
                                    Create Account
                                </h1>
                                <p className="mt-2 text-gray-300">
                                    Start organizing your tasks today
                                </p>
                            </div>
                            <Form
                                {...store.form()}
                                resetOnSuccess={[
                                    'password',
                                    'password_confirmation',
                                ]}
                                disableWhileProcessing
                                className="space-y-4"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="space-y-4">
                                            <div>
                                                <Label
                                                    htmlFor="name"
                                                    className="text-white"
                                                >
                                                    Full Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="name"
                                                    name="name"
                                                    placeholder="John Doe"
                                                    className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                                <InputError
                                                    message={errors.name}
                                                    className="text-red-300"
                                                />
                                            </div>

                                            <div>
                                                <Label
                                                    htmlFor="email"
                                                    className="text-white"
                                                >
                                                    Email Address
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="email"
                                                    name="email"
                                                    placeholder="email@example.com"
                                                    className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                                <InputError
                                                    message={errors.email}
                                                    className="text-red-300"
                                                />
                                            </div>

                                            <div>
                                                <Label
                                                    htmlFor="password"
                                                    className="text-white"
                                                >
                                                    Password
                                                </Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    required
                                                    tabIndex={3}
                                                    autoComplete="new-password"
                                                    name="password"
                                                    placeholder="Create a strong password"
                                                    className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                                <InputError
                                                    message={errors.password}
                                                    className="text-red-300"
                                                />
                                            </div>

                                            <div>
                                                <Label
                                                    htmlFor="password_confirmation"
                                                    className="text-white"
                                                >
                                                    Confirm Password
                                                </Label>
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    required
                                                    tabIndex={4}
                                                    autoComplete="new-password"
                                                    name="password_confirmation"
                                                    placeholder="Confirm your password"
                                                    className="mt-1 border-white/20 bg-white/10 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                                <InputError
                                                    message={
                                                        errors.password_confirmation
                                                    }
                                                    className="text-red-300"
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-6 text-lg font-semibold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                                                tabIndex={5}
                                                data-test="register-user-button"
                                            >
                                                {processing && <Spinner />}
                                                {processing
                                                    ? 'Creating account...'
                                                    : 'Create Account'}
                                            </Button>
                                        </div>

                                        <div className="mt-6 text-center text-sm text-gray-300">
                                            Already have an account?{' '}
                                            <Link
                                                href={login()}
                                                className="font-semibold text-indigo-300 hover:text-indigo-200"
                                            >
                                                Log in
                                            </Link>
                                        </div>
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
