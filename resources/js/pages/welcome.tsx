import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle, Target, BarChart3, Calendar, ArrowRight, Sparkles, CheckSquare, Zap } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Task Management System - Organize Your Work" />
            
            {/* Modern Landing Page */}
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

                {/* Navigation */}
                <nav className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 p-2 shadow-lg">
                                    <CheckSquare className="size-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold text-white">TaskFlow</span>
                            </div>

                            {/* Nav Links */}
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 font-semibold text-gray-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="size-4" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="rounded-lg border-2 border-white/20 px-6 py-2.5 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                                        >
                                            Log in
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                            >
                                                Get Started
                                                <ArrowRight className="size-4" />
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center">
                    <div className="mx-auto max-w-7xl px-6 py-20 lg:py-32">
                        <div className="text-center">
                            {/* Badge */}
                            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-indigo-300 backdrop-blur-sm">
                                <Sparkles className="size-4" />
                                <span className="text-sm font-semibold">Professional Task Management</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="mb-6 text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                                Organize Your Work.
                                <br />
                                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Achieve Your Goals.
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="mb-12 text-xl text-gray-300 md:text-2xl">
                                A powerful, intuitive task management system to help you
                                <br className="hidden md:block" />
                                stay productive and reach your goals faster.
                            </p>

                            {/* CTA Buttons */}
                            {!auth.user && (
                                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-indigo-500/50"
                                    >
                                        Start Free Today
                                        <ArrowRight className="size-5" />
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}

                            {/* Features Grid */}
                            <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                <FeatureCard
                                    icon={<CheckCircle className="size-8 text-green-400" />}
                                    title="Task Management"
                                    description="Create, organize, and track tasks with ease"
                                />
                                <FeatureCard
                                    icon={<Calendar className="size-8 text-blue-400" />}
                                    title="Calendar & Kanban"
                                    description="Visual views to manage your workflow"
                                />
                                <FeatureCard
                                    icon={<Target className="size-8 text-purple-400" />}
                                    title="Goal Tracking"
                                    description="Set goals and monitor your progress"
                                />
                                <FeatureCard
                                    icon={<BarChart3 className="size-8 text-orange-400" />}
                                    title="Analytics"
                                    description="Insights into your productivity"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-6 py-6 text-center">
                        <p className="text-sm text-gray-400">
                            © 2025 TaskFlow. Built with{' '}
                            <span className="text-red-400">♥</span> for productivity enthusiasts.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

// Feature Card Component
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 hover:shadow-xl">
            <div className="mb-4 inline-flex rounded-lg bg-white/10 p-3 transition-all group-hover:scale-110 group-hover:bg-white/20">
                {icon}
            </div>
            <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    );
}
