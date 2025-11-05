import AppLayout from '@/layouts/app-layout';
import { Task } from '@/types/models';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    CheckCircle2,
    Circle,
    Clock,
    Eye,
    Folder,
    ListTodo,
    Plus,
    Sparkles,
    Target,
    TrendingUp,
} from 'lucide-react';

interface DashboardStats {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
    totalGoals: number;
    completedGoals: number;
    activeGoals: number;
    totalCategories: number;
    totalTags: number;
    completionRate: number;
}

interface DashboardProps {
    stats: DashboardStats;
    upcomingTasks: Task[];
    [key: string]: any;
}

export default function Dashboard() {
    const { stats, upcomingTasks } = usePage<DashboardProps>().props;

    const statCards = [
        {
            title: 'Total Tasks',
            value: stats.totalTasks,
            icon: ListTodo,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-500/10 to-cyan-500/10',
            iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
            textColor: 'text-blue-600 dark:text-blue-400',
        },
        {
            title: 'Completed',
            value: stats.completedTasks,
            icon: CheckCircle2,
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-500/10 to-emerald-500/10',
            iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
            textColor: 'text-green-600 dark:text-green-400',
        },
        {
            title: 'In Progress',
            value: stats.inProgressTasks,
            icon: Clock,
            gradient: 'from-amber-500 to-orange-500',
            bgGradient: 'from-amber-500/10 to-orange-500/10',
            iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500',
            textColor: 'text-amber-600 dark:text-amber-400',
        },
        {
            title: 'Pending',
            value: stats.pendingTasks,
            icon: Circle,
            gradient: 'from-gray-500 to-slate-500',
            bgGradient: 'from-gray-500/10 to-slate-500/10',
            iconBg: 'bg-gradient-to-br from-gray-500 to-slate-500',
            textColor: 'text-gray-600 dark:text-gray-400',
        },
        {
            title: 'Overdue',
            value: stats.overdueTasks,
            icon: AlertCircle,
            gradient: 'from-red-500 to-rose-500',
            bgGradient: 'from-red-500/10 to-rose-500/10',
            iconBg: 'bg-gradient-to-br from-red-500 to-rose-500',
            textColor: 'text-red-600 dark:text-red-400',
        },
        {
            title: 'Active Goals',
            value: stats.activeGoals,
            icon: Target,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-500/10 to-pink-500/10',
            iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
            textColor: 'text-purple-600 dark:text-purple-400',
        },
        {
            title: 'Categories',
            value: stats.totalCategories,
            icon: Folder,
            gradient: 'from-indigo-500 to-blue-500',
            bgGradient: 'from-indigo-500/10 to-blue-500/10',
            iconBg: 'bg-gradient-to-br from-indigo-500 to-blue-500',
            textColor: 'text-indigo-600 dark:text-indigo-400',
        },
        {
            title: 'Completion Rate',
            value: `${stats.completionRate}%`,
            icon: TrendingUp,
            gradient: 'from-emerald-500 to-teal-500',
            bgGradient: 'from-emerald-500/10 to-teal-500/10',
            iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
            textColor: 'text-emerald-600 dark:text-emerald-400',
        },
    ];

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-[95%] space-y-8 p-6 lg:p-8 2xl:max-w-[1600px]">
                    {/* Hero Header with Gradient */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 shadow-2xl lg:p-12">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3">
                                <Sparkles className="size-8 text-white/90" />
                                <h1 className="text-4xl font-bold text-white lg:text-5xl">
                                    Dashboard
                                </h1>
                            </div>
                            <p className="mt-3 max-w-2xl text-lg text-white/90 lg:text-xl">
                                Welcome back! Here's an overview of your
                                productivity and progress.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    href="/tasks/create"
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-purple-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <Plus className="size-5" />
                                    Create Task
                                </Link>
                                <Link
                                    href="/analytics"
                                    className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                                >
                                    <Eye className="size-5" />
                                    View Analytics
                                </Link>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Stats Grid with Enhanced Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((stat, index) => (
                            <div
                                key={index}
                                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.bgGradient} p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
                            >
                                {/* Background decoration */}
                                <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/50 blur-2xl transition-all group-hover:scale-150 dark:bg-white/10"></div>

                                <div className="relative">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                {stat.title}
                                            </p>
                                            <p className="mt-3 text-4xl font-bold text-gray-900 dark:text-white">
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div
                                            className={`rounded-xl p-3 ${stat.iconBg} shadow-lg`}
                                        >
                                            <stat.icon className="size-6 text-white" />
                                        </div>
                                    </div>
                                    {/* Progress indicator for percentage */}
                                    {stat.title === 'Completion Rate' && (
                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/50 dark:bg-gray-700/50">
                                            <div
                                                className={`h-full rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-500`}
                                                style={{
                                                    width: `${stats.completionRate}%`,
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Completion Progress - Enhanced */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg lg:p-10 dark:border-gray-700 dark:bg-gray-800">
                        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-blue-500/5 to-transparent"></div>
                        <div className="relative">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl dark:text-white">
                                        Overall Progress
                                    </h2>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        Your task completion journey
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
                                        {stats.completionRate}%
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Completion Rate
                                    </p>
                                </div>
                            </div>
                            <div className="relative h-8 overflow-hidden rounded-full bg-gray-200 shadow-inner dark:bg-gray-700">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-700 ease-out"
                                    style={{
                                        width: `${stats.completionRate}%`,
                                    }}
                                >
                                    <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between text-sm">
                                <span className="font-medium text-green-600 dark:text-green-400">
                                    ✓ {stats.completedTasks} completed
                                </span>
                                <span className="font-medium text-gray-600 dark:text-gray-400">
                                    {stats.totalTasks} total tasks
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Tasks - Enhanced */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Upcoming Tasks
                                </h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Tasks due in the next 7 days
                                </p>
                            </div>
                            <Link
                                href="/tasks"
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                            >
                                View all
                                <Eye className="size-4" />
                            </Link>
                        </div>

                        {upcomingTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-12 dark:border-gray-700">
                                <CheckCircle2 className="size-12 text-gray-300 dark:text-gray-600" />
                                <p className="mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    No upcoming tasks in the next 7 days
                                </p>
                                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                    You're all caught up! 🎉
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {upcomingTasks.map((task, idx) => (
                                    <Link
                                        key={task.id}
                                        href={`/tasks/${task.id}`}
                                        className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-gradient-to-r from-white to-gray-50/50 p-4 transition-all hover:scale-[1.01] hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:from-gray-800 dark:to-gray-800/50 dark:hover:border-blue-600"
                                        style={{
                                            animationDelay: `${idx * 50}ms`,
                                        }}
                                    >
                                        <div
                                            className={`rounded-full p-2 ${
                                                task.priority === 'high'
                                                    ? 'bg-red-100 dark:bg-red-900/30'
                                                    : task.priority === 'medium'
                                                      ? 'bg-amber-100 dark:bg-amber-900/30'
                                                      : 'bg-blue-100 dark:bg-blue-900/30'
                                            }`}
                                        >
                                            {task.status === 'completed' ? (
                                                <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
                                            ) : (
                                                <Circle className="size-5 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                                                {task.title}
                                            </p>
                                            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs">
                                                {task.due_date && (
                                                    <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                                        <Clock className="size-3" />
                                                        {new Date(
                                                            task.due_date,
                                                        ).toLocaleDateString()}
                                                    </span>
                                                )}
                                                {task.category && (
                                                    <span
                                                        className="rounded-full px-2.5 py-1 font-medium"
                                                        style={{
                                                            backgroundColor:
                                                                task.category
                                                                    .color +
                                                                '20',
                                                            color: task.category
                                                                .color,
                                                        }}
                                                    >
                                                        {task.category.name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <span
                                            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold tracking-wide uppercase ${
                                                task.priority === 'high'
                                                    ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                                                    : task.priority === 'medium'
                                                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                                                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                                            }`}
                                        >
                                            {task.priority}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Actions - Enhanced */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <Link
                            href="/tasks/create"
                            className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 text-center transition-all hover:scale-105 hover:border-blue-400 hover:shadow-xl dark:border-blue-800 dark:from-blue-900/20 dark:to-cyan-900/20 dark:hover:border-blue-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 transition-all group-hover:from-blue-500/5 group-hover:to-cyan-500/5"></div>
                            <div className="relative">
                                <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                                    <Plus className="size-7" />
                                </div>
                                <p className="font-bold text-gray-900 dark:text-white">
                                    Create Task
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Add new task
                                </p>
                            </div>
                        </Link>
                        <Link
                            href="/goals"
                            className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 text-center transition-all hover:scale-105 hover:border-purple-400 hover:shadow-xl dark:border-purple-800 dark:from-purple-900/20 dark:to-pink-900/20 dark:hover:border-purple-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 transition-all group-hover:from-purple-500/5 group-hover:to-pink-500/5"></div>
                            <div className="relative">
                                <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                                    <Target className="size-7" />
                                </div>
                                <p className="font-bold text-gray-900 dark:text-white">
                                    View Goals
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Track progress
                                </p>
                            </div>
                        </Link>
                        <Link
                            href="/analytics"
                            className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 text-center transition-all hover:scale-105 hover:border-emerald-400 hover:shadow-xl dark:border-emerald-800 dark:from-emerald-900/20 dark:to-teal-900/20 dark:hover:border-emerald-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 transition-all group-hover:from-emerald-500/5 group-hover:to-teal-500/5"></div>
                            <div className="relative">
                                <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
                                    <TrendingUp className="size-7" />
                                </div>
                                <p className="font-bold text-gray-900 dark:text-white">
                                    Analytics
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    View insights
                                </p>
                            </div>
                        </Link>
                        <Link
                            href="/categories"
                            className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-6 text-center transition-all hover:scale-105 hover:border-indigo-400 hover:shadow-xl dark:border-indigo-800 dark:from-indigo-900/20 dark:to-blue-900/20 dark:hover:border-indigo-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-blue-500/0 transition-all group-hover:from-indigo-500/5 group-hover:to-blue-500/5"></div>
                            <div className="relative">
                                <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg">
                                    <Folder className="size-7" />
                                </div>
                                <p className="font-bold text-gray-900 dark:text-white">
                                    Categories
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Organize tasks
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
