import EnhancedTaskForm from '@/components/enhanced-task-form';
import AppLayout from '@/layouts/app-layout';
import { Category, Goal, Tag, Task } from '@/types/models';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Plus, Sparkles } from 'lucide-react';

interface CreateTaskPageProps {
    categories: Category[];
    tags: Tag[];
    goals: Goal[];
    allTasks: Task[];
    [key: string]: any;
}

export default function CreateTask() {
    const { categories, tags, goals, allTasks } =
        usePage<CreateTaskPageProps>().props;

    return (
        <AppLayout>
            <Head title="Create Task" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-[95%] space-y-8 p-6 lg:p-8 2xl:max-w-[1600px]">
                    {/* Back Button */}
                    <Link
                        href="/tasks"
                        className="group inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md transition-all hover:scale-105 hover:shadow-lg dark:bg-gray-800 dark:text-gray-300"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        Back to Tasks
                    </Link>

                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl lg:p-12">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                    <Plus className="size-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-white lg:text-5xl">
                                        Create New Task
                                    </h1>
                                    <p className="mt-2 flex items-center gap-2 text-lg text-white/90">
                                        <Sparkles className="size-5" />
                                        Add a new task and stay organized
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Enhanced Form Container */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl lg:p-10 dark:border-gray-700 dark:bg-gray-800">
                        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-purple-500/5 to-transparent"></div>
                        <div className="relative">
                            <EnhancedTaskForm
                                categories={categories}
                                tags={tags}
                                goals={goals}
                                allTasks={allTasks}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
