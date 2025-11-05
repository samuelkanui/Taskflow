import AppLayout from '@/layouts/app-layout';
import { Task } from '@/types/models';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Plus,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';

interface CalendarTask {
    id: number;
    title: string;
    start: string;
    backgroundColor: string;
    task: Task;
}

interface CalendarPageProps {
    tasks: CalendarTask[];
    [key: string]: unknown;
}

export default function TasksCalendar() {
    const { tasks } = usePage<CalendarPageProps>().props;
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
    ).getDay();

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const previousMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
        );
    };

    const today = () => {
        setCurrentDate(new Date());
    };

    const getTasksForDate = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return tasks.filter((task) => task.start === dateStr);
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    };

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(
            <div
                key={`empty-${i}`}
                className="min-h-32 border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 dark:border-gray-700 dark:from-gray-900 dark:to-gray-900"
            />,
        );
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayTasks = getTasksForDate(day);
        const isCurrentDay = isToday(day);

        days.push(
            <div
                key={day}
                className={`group min-h-32 border border-gray-200 p-3 transition-all hover:shadow-lg dark:border-gray-700 ${
                    isCurrentDay
                        ? 'bg-gradient-to-br from-purple-100 to-fuchsia-100 ring-2 ring-purple-500 ring-inset dark:from-purple-900/40 dark:to-fuchsia-900/40 dark:ring-purple-400'
                        : 'bg-white hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-transparent dark:bg-gray-800 dark:hover:from-purple-900/10'
                }`}
            >
                <div
                    className={`mb-2 flex items-center justify-between text-sm font-bold ${isCurrentDay ? 'text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-white'}`}
                >
                    <span>{day}</span>
                    {isCurrentDay && (
                        <span className="rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-2 py-0.5 text-xs font-semibold text-white shadow-md">
                            Today
                        </span>
                    )}
                </div>
                <div className="space-y-1.5">
                    {dayTasks.slice(0, 3).map((task) => (
                        <Link
                            key={task.id}
                            href={`/tasks/${task.id}`}
                            className="block truncate rounded-lg px-2 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-md"
                            style={{ backgroundColor: task.backgroundColor }}
                            title={task.title}
                        >
                            {task.title}
                        </Link>
                    ))}
                    {dayTasks.length > 3 && (
                        <div className="rounded-lg bg-gradient-to-r from-purple-100 to-fuchsia-100 px-2 py-1 text-xs font-semibold text-purple-700 dark:from-purple-900/50 dark:to-fuchsia-900/50 dark:text-purple-300">
                            +{dayTasks.length - 3} more
                        </div>
                    )}
                </div>
            </div>,
        );
    }

    return (
        <AppLayout>
            <Head title="Calendar" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-[95%] space-y-8 p-6 lg:p-8 2xl:max-w-[1600px]">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 shadow-2xl lg:p-12">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                        <CalendarIcon className="size-8 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-bold text-white lg:text-5xl">
                                            Tasks Calendar
                                        </h1>
                                        <p className="mt-2 flex items-center gap-2 text-lg text-white/90">
                                            <Sparkles className="size-5" />
                                            {tasks.length} tasks • Visualize
                                            your schedule
                                        </p>
                                    </div>
                                </div>
                                <Link href="/tasks/create">
                                    <button className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-purple-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                                        <Plus className="size-5" />
                                        New Task
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Enhanced Calendar Controls */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-purple-500/5 to-transparent"></div>
                        <div className="relative flex items-center justify-between">
                            <button
                                onClick={previousMonth}
                                className="group rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-3 shadow-md transition-all hover:scale-110 hover:shadow-lg dark:from-purple-900/30 dark:to-purple-800/30"
                            >
                                <ChevronLeft className="size-6 text-purple-600 transition-transform group-hover:-translate-x-1 dark:text-purple-400" />
                            </button>

                            <div className="flex items-center gap-4">
                                <h2 className="bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-2xl font-bold text-transparent dark:from-purple-400 dark:to-fuchsia-400">
                                    {monthNames[currentDate.getMonth()]}{' '}
                                    {currentDate.getFullYear()}
                                </h2>
                                <button
                                    onClick={today}
                                    className="rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                                >
                                    Today
                                </button>
                            </div>

                            <button
                                onClick={nextMonth}
                                className="group rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-3 shadow-md transition-all hover:scale-110 hover:shadow-lg dark:from-purple-900/30 dark:to-purple-800/30"
                            >
                                <ChevronRight className="size-6 text-purple-600 transition-transform group-hover:translate-x-1 dark:text-purple-400" />
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Calendar Grid */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                        {/* Weekday Headers */}
                        <div className="grid grid-cols-7 border-b-2 border-purple-200 bg-gradient-to-r from-purple-50 to-fuchsia-50 dark:border-purple-800 dark:from-purple-900/20 dark:to-fuchsia-900/20">
                            {[
                                'Sun',
                                'Mon',
                                'Tue',
                                'Wed',
                                'Thu',
                                'Fri',
                                'Sat',
                            ].map((day) => (
                                <div
                                    key={day}
                                    className="border-r border-purple-200 px-3 py-3 text-center text-sm font-bold tracking-wide text-purple-900 uppercase last:border-r-0 dark:border-purple-800 dark:text-purple-300"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7">{days}</div>
                    </div>

                    {/* Enhanced Legend */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-purple-50/30 p-6 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-purple-900/10">
                        <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-purple-500/5 to-transparent"></div>
                        <div className="relative">
                            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                                <Sparkles className="size-5 text-purple-600 dark:text-purple-400" />
                                Legend
                            </h3>
                            <div className="flex flex-wrap gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="size-6 rounded-lg bg-gradient-to-br from-purple-100 to-fuchsia-100 shadow-md ring-2 ring-purple-500 dark:from-purple-900/40 dark:to-fuchsia-900/40" />
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        Today
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="size-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md" />
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        Tasks (color by category)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Task Count */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 p-6 text-center shadow-lg dark:border-gray-700 dark:from-purple-900/20 dark:via-fuchsia-900/20 dark:to-pink-900/20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.1),transparent_50%)]"></div>
                        <div className="relative">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Total Tasks with Due Dates
                            </p>
                            <p className="mt-2 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-4xl font-black text-transparent">
                                {tasks.length}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                task{tasks.length !== 1 ? 's' : ''} scheduled
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
