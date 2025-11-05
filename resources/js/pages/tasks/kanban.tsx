import AppLayout from '@/layouts/app-layout';
import { Task } from '@/types/models';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle2,
    Clock,
    Columns3,
    Filter,
    Folder,
    Plus,
    Search,
    Sparkles,
    Tag as TagIcon,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface KanbanPageProps {
    tasks: {
        pending: Task[];
        in_progress: Task[];
        completed: Task[];
    };
    categories: Array<{
        id: number;
        name: string;
        color: string;
    }>;
    [key: string]: any;
}

export default function TasksKanban() {
    const { tasks, categories } = usePage<KanbanPageProps>().props;
    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    // Get all tasks for counting
    const allTasks = [
        ...tasks.pending,
        ...tasks.in_progress,
        ...tasks.completed,
    ];

    // Filter tasks based on search and filters
    const filterTasks = (taskList: Task[]) => {
        return taskList.filter((task) => {
            // Search filter
            const matchesSearch =
                searchQuery === '' ||
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                task.tags?.some((tag) =>
                    tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
                );

            // Priority filter
            const matchesPriority =
                priorityFilter === 'all' || task.priority === priorityFilter;

            // Category filter
            const matchesCategory =
                categoryFilter === 'all' ||
                (task.category &&
                    task.category.id.toString() === categoryFilter);

            return matchesSearch && matchesPriority && matchesCategory;
        });
    };

    const clearFilters = () => {
        setSearchQuery('');
        setPriorityFilter('all');
        setCategoryFilter('all');
    };

    const hasActiveFilters =
        searchQuery !== '' ||
        priorityFilter !== 'all' ||
        categoryFilter !== 'all';

    const updateStatus = (taskId: number, newStatus: string) => {
        router.put(
            `/tasks/${taskId}`,
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
            },
        );
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'border-l-4 border-l-red-500 bg-gradient-to-r from-red-50/50 to-transparent dark:from-red-900/20';
            case 'medium':
                return 'border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50/50 to-transparent dark:from-amber-900/20';
            case 'low':
                return 'border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/50 to-transparent dark:from-green-900/20';
            default:
                return 'border-l-4 border-l-gray-500 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-900/20';
        }
    };

    const TaskCard = ({ task }: { task: Task }) => (
        <div
            className={`group mb-4 cursor-pointer rounded-xl border border-gray-200 p-4 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 ${getPriorityColor(task.priority)}`}
        >
            <Link href={`/tasks/${task.id}`} className="block">
                <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:bg-clip-text hover:text-transparent dark:text-white">
                    {task.title}
                </h3>

                {task.description && (
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {task.description}
                    </p>
                )}

                <div className="space-y-2">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        {task.category && (
                            <div className="flex items-center gap-1">
                                <Folder
                                    className="size-3"
                                    style={{ color: task.category.color }}
                                />
                                <span style={{ color: task.category.color }}>
                                    {task.category.name}
                                </span>
                            </div>
                        )}
                        {task.due_date && (
                            <div className="flex items-center gap-1">
                                <Calendar className="size-3" />
                                <span>
                                    {new Date(
                                        task.due_date,
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                        {task.estimated_minutes && (
                            <div className="flex items-center gap-1">
                                <Clock className="size-3" />
                                <span>{task.estimated_minutes}m</span>
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    {task.tags && task.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                            <TagIcon className="size-3 text-gray-400" />
                            <div className="flex flex-wrap gap-1">
                                {task.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="rounded-full px-2 py-0.5 text-xs"
                                        style={{
                                            backgroundColor: tag.color + '20',
                                            color: tag.color,
                                        }}
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Subtasks Progress */}
                    {task.subtasks && task.subtasks.length > 0 && (
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <CheckCircle2 className="size-3" />
                            <span>
                                {
                                    task.subtasks.filter(
                                        (st) => st.is_completed,
                                    ).length
                                }
                                /{task.subtasks.length} subtasks
                            </span>
                        </div>
                    )}

                    {/* Priority Badge */}
                    <div>
                        <span
                            className={`inline-block rounded-lg px-3 py-1 text-xs font-bold tracking-wide text-white uppercase shadow-sm ${
                                task.priority === 'high'
                                    ? 'bg-gradient-to-r from-red-500 to-rose-500'
                                    : task.priority === 'medium'
                                      ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                            }`}
                        >
                            {task.priority}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Status Change Buttons */}
            <div className="mt-3 hidden border-t border-gray-200 pt-3 opacity-0 transition-all group-hover:block group-hover:opacity-100 dark:border-gray-700">
                <div className="flex gap-2 text-xs">
                    {task.status !== 'pending' && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                updateStatus(task.id, 'pending');
                            }}
                            className="rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1.5 font-semibold text-gray-700 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:from-gray-700 dark:to-gray-600 dark:text-gray-200"
                        >
                            → Pending
                        </button>
                    )}
                    {task.status !== 'in_progress' && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                updateStatus(task.id, 'in_progress');
                            }}
                            className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1.5 font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-md"
                        >
                            → In Progress
                        </button>
                    )}
                    {task.status !== 'completed' && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                updateStatus(task.id, 'completed');
                            }}
                            className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1.5 font-semibold text-white shadow-sm transition-all hover:scale-105 hover:shadow-md"
                        >
                            → Completed
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    const Column = ({
        title,
        tasks,
        color,
        icon: Icon,
    }: {
        title: string;
        tasks: Task[];
        color: string;
        icon: any;
    }) => (
        <div className="flex min-h-[700px] flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50/50 shadow-xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
            <div className={`flex items-center gap-3 p-5 ${color}`}>
                <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Icon className="size-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <span className="ml-auto rounded-full bg-white/30 px-3 py-1 text-sm font-bold text-white shadow-md backdrop-blur-sm">
                    {tasks.length}
                </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {tasks.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <div className="mb-3 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                            <Icon className="size-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            No tasks yet
                        </p>
                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                            Tasks will appear here
                        </p>
                    </div>
                ) : (
                    <div>
                        {tasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <AppLayout>
            <Head title="Kanban Board" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-[95%] space-y-8 p-6 lg:p-8 2xl:max-w-[1600px]">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-8 shadow-2xl lg:p-12">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                        <Columns3 className="size-8 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-bold text-white lg:text-5xl">
                                            Kanban Board
                                        </h1>
                                        <p className="mt-2 flex items-center gap-2 text-lg text-white/90">
                                            <Sparkles className="size-5" />
                                            {tasks.pending.length +
                                                tasks.in_progress.length +
                                                tasks.completed.length}{' '}
                                            tasks • Visualize your workflow
                                        </p>
                                    </div>
                                </div>
                                <Link href="/tasks/create">
                                    <button className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
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

                    {/* Search and Filters */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-l from-blue-500/5 to-transparent"></div>
                        <div className="relative space-y-4">
                            {/* Search Bar */}
                            <div className="flex items-center gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        placeholder="Search tasks by title, description, or tags..."
                                        className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pr-4 pl-11 text-gray-900 transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600 dark:hover:bg-gray-700"
                                        >
                                            <X className="size-4" />
                                        </button>
                                    )}
                                </div>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-4 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                                    >
                                        <X className="size-4" />
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <Filter className="size-4 text-gray-500" />
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Filters:
                                    </span>
                                </div>

                                {/* Priority Filter */}
                                <select
                                    value={priorityFilter}
                                    onChange={(e) =>
                                        setPriorityFilter(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                >
                                    <option value="all">All Priorities</option>
                                    <option value="high">
                                        🔴 High Priority
                                    </option>
                                    <option value="medium">
                                        🟠 Medium Priority
                                    </option>
                                    <option value="low">🟢 Low Priority</option>
                                </select>

                                {/* Category Filter */}
                                {categories && categories.length > 0 && (
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) =>
                                            setCategoryFilter(e.target.value)
                                        }
                                        className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                                    >
                                        <option value="all">
                                            📁 All Categories
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id.toString()}
                                            >
                                                📂 {category.name}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {/* Active Category Badge */}
                                {categoryFilter !== 'all' && categories && (
                                    <div
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 shadow-sm"
                                        style={{
                                            backgroundColor:
                                                categories.find(
                                                    (c) =>
                                                        c.id.toString() ===
                                                        categoryFilter,
                                                )?.color + '20',
                                            borderLeft: `4px solid ${categories.find((c) => c.id.toString() === categoryFilter)?.color}`,
                                        }}
                                    >
                                        <Folder
                                            className="size-4"
                                            style={{
                                                color: categories.find(
                                                    (c) =>
                                                        c.id.toString() ===
                                                        categoryFilter,
                                                )?.color,
                                            }}
                                        />
                                        <span
                                            className="text-sm font-semibold"
                                            style={{
                                                color: categories.find(
                                                    (c) =>
                                                        c.id.toString() ===
                                                        categoryFilter,
                                                )?.color,
                                            }}
                                        >
                                            {
                                                categories.find(
                                                    (c) =>
                                                        c.id.toString() ===
                                                        categoryFilter,
                                                )?.name
                                            }
                                        </span>
                                    </div>
                                )}

                                {/* Results Count */}
                                <div className="ml-auto rounded-lg bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 dark:from-blue-900/30 dark:to-indigo-900/30">
                                    <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                                        {filterTasks(allTasks).length} task
                                        {filterTasks(allTasks).length !== 1
                                            ? 's'
                                            : ''}{' '}
                                        found
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Kanban Board */}
                    <div className="grid gap-6 lg:grid-cols-3">
                        <Column
                            title="Pending"
                            tasks={filterTasks(tasks.pending)}
                            color="bg-gradient-to-r from-gray-600 to-gray-700"
                            icon={Clock}
                        />
                        <Column
                            title="In Progress"
                            tasks={filterTasks(tasks.in_progress)}
                            color="bg-gradient-to-r from-blue-600 to-indigo-600"
                            icon={Clock}
                        />
                        <Column
                            title="Completed"
                            tasks={filterTasks(tasks.completed)}
                            color="bg-gradient-to-r from-green-600 to-emerald-600"
                            icon={CheckCircle2}
                        />
                    </div>

                    {/* Enhanced Stats */}
                    <div className="grid gap-6 sm:grid-cols-3">
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-gray-500/5 to-transparent"></div>
                            <div className="relative">
                                <div className="text-sm font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400">
                                    {hasActiveFilters
                                        ? 'Filtered Tasks'
                                        : 'Total Tasks'}
                                </div>
                                <div className="mt-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-black text-transparent dark:from-white dark:to-gray-300">
                                    {filterTasks(tasks.pending).length +
                                        filterTasks(tasks.in_progress).length +
                                        filterTasks(tasks.completed).length}
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-lg dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
                            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-blue-500/10 to-transparent"></div>
                            <div className="relative">
                                <div className="text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
                                    Active Tasks
                                </div>
                                <div className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-black text-transparent">
                                    {filterTasks(tasks.pending).length +
                                        filterTasks(tasks.in_progress).length}
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
                            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-green-500/10 to-transparent"></div>
                            <div className="relative">
                                <div className="text-sm font-semibold tracking-wide text-green-600 uppercase dark:text-green-400">
                                    Completion Rate
                                </div>
                                <div className="mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-4xl font-black text-transparent">
                                    {(() => {
                                        const total =
                                            filterTasks(tasks.pending).length +
                                            filterTasks(tasks.in_progress)
                                                .length +
                                            filterTasks(tasks.completed).length;
                                        return total > 0
                                            ? Math.round(
                                                  (filterTasks(tasks.completed)
                                                      .length /
                                                      total) *
                                                      100,
                                              )
                                            : 0;
                                    })()}
                                    %
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
