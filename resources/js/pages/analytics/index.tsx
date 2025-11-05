import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    BarChart3,
    CheckCircle2,
    Clock,
    PieChart as PieChartIcon,
    Sparkles,
    Target,
    TrendingUp,
} from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface AnalyticsPageProps {
    tasksByStatus: Record<string, number>;
    tasksByPriority: Record<string, number>;
    tasksByCategory: Array<{ name: string; count: number }>;
    tasksOverTime: Array<{ date: string; count: number }>;
    completionRateOverTime: Array<{ date: string; rate: number }>;
    goalProgress: Array<{
        name: string;
        progress: number;
        current: number;
        target: number;
    }>;
    monthlyCompletion: Array<{ month: string; completed: number }>;
    stats: {
        totalTasks: number;
        completedTasks: number;
        pendingTasks: number;
        inProgressTasks: number;
        overdueTasks: number;
        totalGoals: number;
        completedGoals: number;
    };
    [key: string]: any;
}

const COLORS = {
    completed: '#10B981',
    in_progress: '#F59E0B',
    pending: '#6B7280',
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
};

const PIE_COLORS = [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#EC4899',
];

export default function AnalyticsIndex() {
    const {
        tasksByStatus,
        tasksByPriority,
        tasksByCategory,
        tasksOverTime,
        completionRateOverTime,
        goalProgress,
        monthlyCompletion,
        stats,
    } = usePage<AnalyticsPageProps>().props;

    // Transform data for Pie Charts
    const statusData = Object.entries(tasksByStatus).map(([key, value]) => ({
        name: key.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        value: value as number,
        color: COLORS[key as keyof typeof COLORS] || '#6B7280',
    }));

    const priorityData = Object.entries(tasksByPriority).map(
        ([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: value as number,
            color: COLORS[key as keyof typeof COLORS] || '#6B7280',
        }),
    );

    const completionRate =
        stats.totalTasks > 0
            ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
            : 0;

    return (
        <AppLayout>
            <Head title="Analytics" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-[95%] space-y-8 p-6 lg:p-8 2xl:max-w-[1600px]">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 shadow-2xl lg:p-12">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3">
                                <Activity className="size-8 text-white/90" />
                                <h1 className="text-4xl font-bold text-white lg:text-5xl">
                                    Analytics & Insights
                                </h1>
                            </div>
                            <p className="mt-3 max-w-2xl text-lg text-white/90 lg:text-xl">
                                Track your productivity trends and visualize
                                your progress over time
                            </p>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Enhanced Summary Stats */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/50 blur-2xl transition-all group-hover:scale-150 dark:bg-white/10"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-3 shadow-lg">
                                    <BarChart3 className="size-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Tasks
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {stats.totalTasks}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/50 blur-2xl transition-all group-hover:scale-150 dark:bg-white/10"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 p-3 shadow-lg">
                                    <CheckCircle2 className="size-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Completed
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {stats.completedTasks}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/50 blur-2xl transition-all group-hover:scale-150 dark:bg-white/10"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-3 shadow-lg">
                                    <Clock className="size-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        In Progress
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {stats.inProgressTasks}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500/10 to-rose-500/10 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                            <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/50 blur-2xl transition-all group-hover:scale-150 dark:bg-white/10"></div>
                            <div className="relative flex items-center gap-4">
                                <div className="rounded-xl bg-gradient-to-br from-red-500 to-rose-500 p-3 shadow-lg">
                                    <AlertCircle className="size-7 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Overdue
                                    </p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {stats.overdueTasks}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Row 1: Pie Charts */}
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Task Status Pie Chart */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                            <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-blue-500/5 to-transparent"></div>
                            <div className="relative mb-6 flex items-center gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-2.5 shadow-md">
                                    <PieChartIcon className="size-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Task Status Distribution
                                </h2>
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) =>
                                            `${name}: ${((percent as number) * 100).toFixed(0)}%`
                                        }
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Task Priority Pie Chart */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                            <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-purple-500/5 to-transparent"></div>
                            <div className="relative mb-6 flex items-center gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2.5 shadow-md">
                                    <PieChartIcon className="size-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Task Priority Distribution
                                </h2>
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    <Pie
                                        data={priorityData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) =>
                                            `${name}: ${((percent as number) * 100).toFixed(0)}%`
                                        }
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {priorityData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Charts Row 2: Bar Charts */}
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Tasks by Category Bar Chart */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                            <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-indigo-500/5 to-transparent"></div>
                            <div className="relative mb-6 flex items-center gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 p-2.5 shadow-md">
                                    <BarChart3 className="size-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Tasks by Category
                                </h2>
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={tasksByCategory}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#3B82F6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Monthly Completion Bar Chart */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                            <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-green-500/5 to-transparent"></div>
                            <div className="relative mb-6 flex items-center gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 p-2.5 shadow-md">
                                    <BarChart3 className="size-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Monthly Task Completion
                                </h2>
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={monthlyCompletion}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="completed" fill="#10B981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Charts Row 3: Line Charts */}
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Tasks Over Time Line Chart */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                            <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-cyan-500/5 to-transparent"></div>
                            <div className="relative mb-6 flex items-center gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-2.5 shadow-md">
                                    <TrendingUp className="size-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Tasks Created (Last 7 Days)
                                </h2>
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart data={tasksOverTime}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        name="Tasks Created"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Completion Rate Line Chart */}
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                            <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-emerald-500/5 to-transparent"></div>
                            <div className="relative mb-6 flex items-center gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 p-2.5 shadow-md">
                                    <TrendingUp className="size-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Completion Rate Trend
                                </h2>
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart data={completionRateOverTime}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="rate"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        name="Completion %"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Goal Progress Bar Chart */}
                    {goalProgress.length > 0 && (
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                            <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-violet-500/5 to-transparent"></div>
                            <div className="relative mb-6 flex items-center gap-3">
                                <div className="rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 p-2.5 shadow-md">
                                    <Target className="size-5 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Goal Progress
                                </h2>
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={goalProgress} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" domain={[0, 100]} />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        width={150}
                                    />
                                    <Tooltip />
                                    <Bar dataKey="progress" fill="#8B5CF6">
                                        {goalProgress.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    PIE_COLORS[
                                                        index %
                                                            PIE_COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Overall Completion Rate - Enhanced */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-12 shadow-2xl lg:p-16 dark:border-gray-700 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_50%)]"></div>
                        <div className="relative text-center">
                            <div className="mb-6 flex items-center justify-center gap-3">
                                <Sparkles className="size-8 text-purple-600 dark:text-purple-400" />
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Overall Completion Rate
                                </h3>
                            </div>
                            <div className="my-8">
                                <div className="inline-block">
                                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-8xl font-black text-transparent">
                                        {completionRate}%
                                    </span>
                                </div>
                            </div>
                            <div className="mx-auto max-w-md">
                                <div className="mb-3 h-6 overflow-hidden rounded-full bg-white/50 shadow-inner dark:bg-gray-800/50">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-700"
                                        style={{ width: `${completionRate}%` }}
                                    >
                                        <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                                    </div>
                                </div>
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                    {stats.completedTasks} of {stats.totalTasks}{' '}
                                    tasks completed
                                </p>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -left-20 size-40 rounded-full bg-blue-500/10 blur-3xl"></div>
                        <div className="absolute -right-20 -bottom-20 size-40 rounded-full bg-purple-500/10 blur-3xl"></div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
