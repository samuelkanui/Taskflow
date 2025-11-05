import AppLayout from '@/layouts/app-layout';
import { Category, Goal, PaginatedTasks, Tag } from '@/types/models';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    CheckCircle2,
    Circle,
    Clock,
    Copy,
    Edit,
    Filter,
    Folder,
    ListChecks,
    Plus,
    Search,
    Tag as TagIcon,
} from 'lucide-react';
import { useState } from 'react';

interface TasksPageProps {
    tasks: PaginatedTasks;
    categories: Category[];
    tags: Tag[];
    goals: Goal[];
    filters: {
        status?: string;
        priority?: string;
        category_id?: number;
        goal_id?: number;
        search?: string;
        view?: string;
        sort?: string;
        dir?: string;
    };
    [key: string]: unknown;
}

export default function TasksIndex() {
    const { tasks, goals, filters } =
        usePage<TasksPageProps>().props;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tasks', { ...filters, search }, { preserveState: true });
    };

    const handleFilterChange = (key: string, value: string | number) => {
        router.get(
            '/tasks',
            { ...filters, [key]: value },
            { preserveState: true },
        );
    };

    const toggleComplete = (taskId: number) => {
        router.post(
            `/tasks/${taskId}/toggle-complete`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const duplicateTask = (taskId: number) => {
        router.post(
            `/tasks/${taskId}/duplicate`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-gradient-to-r from-red-500 to-rose-500 text-white border-0 shadow-md';
            case 'medium':
                return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md';
            case 'low':
                return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-md';
            default:
                return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0 shadow-md';
        }
    };

    return (
        <AppLayout>
            <Head title="Tasks" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-[95%] space-y-8 p-6 lg:p-8 2xl:max-w-[1600px]">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl lg:p-12">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ListChecks className="size-8 text-white/90" />
                                    <div>
                                        <h1 className="text-4xl font-bold text-white lg:text-5xl">
                                            Tasks
                                        </h1>
                                        <p className="mt-1 text-lg text-white/90">
                                            {tasks.total} tasks • Organize and
                                            track your work
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/tasks/create"
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-purple-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <Plus className="size-5" />
                                    New Task
                                </Link>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Enhanced Filters */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-purple-500/5 to-transparent"></div>
                        <div className="relative mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2 shadow-md">
                                <Filter className="size-4 text-white" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Filters
                            </h2>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                            {/* Search */}
                            <form
                                onSubmit={handleSearch}
                                className="md:col-span-2"
                            >
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search tasks..."
                                        className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </form>

                            {/* View Filter */}
                            <select
                                value={filters.view || 'all'}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'view',
                                        e.target.value === 'all'
                                            ? ''
                                            : e.target.value,
                                    )
                                }
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="all">All Tasks</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="year">This Year</option>
                                <option value="overdue">Overdue</option>
                            </select>

                            {/* Status Filter */}
                            <select
                                value={filters.status || 'all'}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'status',
                                        e.target.value === 'all'
                                            ? ''
                                            : e.target.value,
                                    )
                                }
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>

                            {/* Priority Filter */}
                            <select
                                value={filters.priority || 'all'}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'priority',
                                        e.target.value === 'all'
                                            ? ''
                                            : e.target.value,
                                    )
                                }
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="all">All Priorities</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>

                            {/* Goal Filter */}
                            <select
                                value={filters.goal_id || 'all'}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'goal_id',
                                        e.target.value === 'all'
                                            ? ''
                                            : e.target.value,
                                    )
                                }
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="all">All Goals</option>
                                {goals.map((goal) => (
                                    <option key={goal.id} value={goal.id}>
                                        {goal.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Tasks List */}
                    <div className="space-y-4">
                        {tasks.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white p-16 text-center shadow-inner dark:border-gray-700 dark:from-gray-800 dark:to-gray-800">
                                <div className="mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 p-6 dark:from-purple-900/30 dark:to-pink-900/30">
                                    <ListChecks className="size-12 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    No tasks found
                                </h3>
                                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                                    Create your first task to get started on
                                    your productivity journey!
                                </p>
                                <Link
                                    href="/tasks/create"
                                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <Plus className="size-5" />
                                    Create First Task
                                </Link>
                            </div>
                        ) : (
                            tasks.data.map((task) => (
                                <div
                                    key={task.id}
                                    className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-r from-white to-gray-50/50 p-5 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-800/50"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Enhanced Checkbox */}
                                        <button
                                            onClick={() =>
                                                toggleComplete(task.id)
                                            }
                                            className="mt-1 flex-shrink-0 transition-transform hover:scale-110"
                                            title={
                                                task.status === 'completed'
                                                    ? 'Mark as incomplete'
                                                    : 'Mark as complete'
                                            }
                                        >
                                            {task.status === 'completed' ? (
                                                <div className="rounded-full bg-gradient-to-br from-green-500 to-emerald-500 p-0.5 shadow-md">
                                                    <CheckCircle2 className="size-5 text-white" />
                                                </div>
                                            ) : (
                                                <Circle className="size-6 text-gray-400 transition-colors hover:text-purple-600" />
                                            )}
                                        </button>

                                        {/* Content */}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <Link
                                                        href={`/tasks/${task.id}`}
                                                        className="text-lg font-semibold text-gray-900 transition-all hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text hover:text-transparent dark:text-white"
                                                    >
                                                        {task.title}
                                                    </Link>
                                                    {task.description && (
                                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                            {task.description}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Priority Badge & Actions */}
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`rounded-lg px-3 py-1.5 text-xs font-bold tracking-wide whitespace-nowrap uppercase ${getPriorityColor(task.priority)}`}
                                                    >
                                                        {task.priority}
                                                    </span>
                                                    <div className="flex gap-1.5 opacity-0 transition-all group-hover:opacity-100">
                                                        <Link
                                                            href={`/tasks/${task.id}/edit`}
                                                            className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-2 transition-all hover:scale-110 hover:from-blue-100 hover:to-blue-200 hover:shadow-md dark:from-blue-900/30 dark:to-blue-800/30 dark:hover:from-blue-900/50 dark:hover:to-blue-800/50"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                            title="Edit"
                                                        >
                                                            <Edit className="size-4 text-blue-600 dark:text-blue-400" />
                                                        </Link>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                duplicateTask(
                                                                    task.id,
                                                                );
                                                            }}
                                                            className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-2 transition-all hover:scale-110 hover:from-purple-100 hover:to-purple-200 hover:shadow-md dark:from-purple-900/30 dark:to-purple-800/30 dark:hover:from-purple-900/50 dark:hover:to-purple-800/50"
                                                            title="Duplicate"
                                                        >
                                                            <Copy className="size-4 text-purple-600 dark:text-purple-400" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Meta Info */}
                                            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                {task.category && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Folder className="size-4" />
                                                        <span
                                                            className="inline-flex items-center gap-1"
                                                            style={{
                                                                color: task
                                                                    .category
                                                                    .color,
                                                            }}
                                                        >
                                                            {task.category.name}
                                                        </span>
                                                    </div>
                                                )}

                                                {task.due_date && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="size-4" />
                                                        <span>
                                                            {new Date(
                                                                task.due_date,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                )}

                                                {task.tags &&
                                                    task.tags.length > 0 && (
                                                        <div className="flex items-center gap-1.5">
                                                            <TagIcon className="size-4" />
                                                            <div className="flex gap-1">
                                                                {task.tags.map(
                                                                    (tag) => (
                                                                        <span
                                                                            key={
                                                                                tag.id
                                                                            }
                                                                            className="rounded-full px-2 py-0.5 text-xs"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    tag.color +
                                                                                    '20',
                                                                                color: tag.color,
                                                                            }}
                                                                        >
                                                                            {
                                                                                tag.name
                                                                            }
                                                                        </span>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                {task.subtasks &&
                                                    task.subtasks.length >
                                                        0 && (
                                                        <span>
                                                            {
                                                                task.subtasks.filter(
                                                                    (st) =>
                                                                        st.is_completed,
                                                                ).length
                                                            }
                                                            /
                                                            {
                                                                task.subtasks
                                                                    .length
                                                            }{' '}
                                                            subtasks
                                                        </span>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Enhanced Pagination */}
                    {tasks.last_page > 1 && (
                        <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Showing{' '}
                                <span className="font-bold text-purple-600 dark:text-purple-400">
                                    {tasks.from}
                                </span>{' '}
                                to{' '}
                                <span className="font-bold text-purple-600 dark:text-purple-400">
                                    {tasks.to}
                                </span>{' '}
                                of{' '}
                                <span className="font-bold text-purple-600 dark:text-purple-400">
                                    {tasks.total}
                                </span>{' '}
                                tasks
                            </div>
                            <div className="flex gap-2">
                                {tasks.current_page > 1 && (
                                    <Link
                                        href="/tasks"
                                        data={{
                                            ...filters,
                                            page: tasks.current_page - 1,
                                        }}
                                        className="rounded-lg border-2 border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-600 transition-all hover:scale-105 hover:border-purple-300 hover:bg-purple-50 hover:shadow-md dark:border-purple-800 dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-purple-900/20"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {tasks.current_page < tasks.last_page && (
                                    <Link
                                        href="/tasks"
                                        data={{
                                            ...filters,
                                            page: tasks.current_page + 1,
                                        }}
                                        className="rounded-lg border-2 border-purple-200 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:border-purple-500"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
