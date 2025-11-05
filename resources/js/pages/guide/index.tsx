import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import {
    BarChart3,
    BookOpen,
    Calendar,
    CheckSquare,
    ChevronRight,
    Columns3,
    FileText,
    Folder,
    Globe,
    Lightbulb,
    Plus,
    Shield,
    Tag,
    Target,
    Zap,
} from 'lucide-react';

export default function Guide() {
    return (
        <AppLayout>
            <Head title="Help & Guide" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-[95%] space-y-8 p-6 lg:p-8 2xl:max-w-[1600px]">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl lg:p-12">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                    <BookOpen className="size-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-white lg:text-5xl">
                                        Help & Guide
                                    </h1>
                                    <p className="mt-2 flex items-center gap-2 text-lg text-white/90">
                                        <Lightbulb className="size-5" />
                                        Learn how to use the Task Management
                                        System
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Quick Start */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-indigo-500/5 to-transparent"></div>
                        <div className="relative">
                            <div className="mb-6 flex items-center gap-3">
                                <Zap className="size-8 text-indigo-600 dark:text-indigo-400" />
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Quick Start
                                </h2>
                            </div>
                            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                                <p className="text-lg leading-relaxed">
                                    Welcome to your Task Management System! This
                                    powerful application helps you organize,
                                    track, and complete your tasks efficiently.
                                </p>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-md dark:from-green-900/20 dark:to-emerald-900/20">
                                        <div className="mb-3 inline-flex rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
                                            <Plus className="size-6 text-green-600 dark:text-green-400" />
                                        </div>
                                        <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                                            1. Create Tasks
                                        </h3>
                                        <p className="text-sm">
                                            Click "New Task" to create your
                                            first task with title, priority, and
                                            due date.
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md dark:from-blue-900/20 dark:to-indigo-900/20">
                                        <div className="mb-3 inline-flex rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                                            <Folder className="size-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                                            2. Organize
                                        </h3>
                                        <p className="text-sm">
                                            Use categories, tags, and goals to
                                            keep your tasks organized and
                                            grouped.
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-md dark:from-purple-900/20 dark:to-pink-900/20">
                                        <div className="mb-3 inline-flex rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                                            <BarChart3 className="size-6 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <h3 className="mb-2 font-bold text-gray-900 dark:text-white">
                                            3. Track Progress
                                        </h3>
                                        <p className="text-sm">
                                            View analytics and progress tracking
                                            to stay on top of your goals.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Guide */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Dashboard */}
                        <FeatureCard
                            icon={
                                <Globe className="size-6 text-blue-600 dark:text-blue-400" />
                            }
                            title="Dashboard"
                            description="Your central hub showing task statistics, upcoming tasks, and quick actions."
                            features={[
                                'View completion rate and task counts',
                                'See upcoming tasks at a glance',
                                'Quick access to create new tasks',
                                'Progress overview for all goals',
                            ]}
                        />

                        {/* Tasks */}
                        <FeatureCard
                            icon={
                                <CheckSquare className="size-6 text-green-600 dark:text-green-400" />
                            }
                            title="Tasks"
                            description="Create, view, and manage all your tasks with powerful filtering options."
                            features={[
                                'Create tasks with title, description, and notes',
                                'Set priority (High, Medium, Low)',
                                'Assign categories, tags, and goals',
                                'Add subtasks and dependencies',
                                'Set recurring tasks (daily, weekly, monthly)',
                            ]}
                        />

                        {/* Calendar */}
                        <FeatureCard
                            icon={
                                <Calendar className="size-6 text-purple-600 dark:text-purple-400" />
                            }
                            title="Calendar"
                            description="Visual calendar view of all your tasks organized by due date."
                            features={[
                                'Monthly calendar view',
                                'Color-coded by priority',
                                'Click dates to see tasks',
                                'Navigate between months easily',
                            ]}
                        />

                        {/* Kanban */}
                        <FeatureCard
                            icon={
                                <Columns3 className="size-6 text-cyan-600 dark:text-cyan-400" />
                            }
                            title="Kanban Board"
                            description="Drag-and-drop interface with Pending, In Progress, and Completed columns."
                            features={[
                                'Visual workflow management',
                                'Search and filter tasks',
                                'Filter by priority and category',
                                'Quick status updates',
                                'Real-time task counts',
                            ]}
                        />

                        {/* Goals */}
                        <FeatureCard
                            icon={
                                <Target className="size-6 text-emerald-600 dark:text-emerald-400" />
                            }
                            title="Goals"
                            description="Set annual goals and track progress with visual indicators."
                            features={[
                                'Create yearly goals with targets',
                                'Track current vs target values',
                                'Visual progress circles',
                                'Link tasks to goals',
                                'Set target dates',
                            ]}
                        />

                        {/* Categories */}
                        <FeatureCard
                            icon={
                                <Folder className="size-6 text-orange-600 dark:text-orange-400" />
                            }
                            title="Categories"
                            description="Organize tasks into color-coded categories for easy identification."
                            features={[
                                'Create custom categories',
                                'Assign colors to categories',
                                'See task count per category',
                                'Filter tasks by category',
                            ]}
                        />

                        {/* Tags */}
                        <FeatureCard
                            icon={
                                <Tag className="size-6 text-pink-600 dark:text-pink-400" />
                            }
                            title="Tags"
                            description="Label tasks with multiple tags for flexible organization."
                            features={[
                                'Create color-coded tags',
                                'Assign multiple tags per task',
                                'Quick tag filtering',
                                'Visual tag indicators',
                            ]}
                        />

                        {/* Templates */}
                        <FeatureCard
                            icon={
                                <FileText className="size-6 text-teal-600 dark:text-teal-400" />
                            }
                            title="Templates"
                            description="Create reusable task templates for recurring similar tasks."
                            features={[
                                'Save task configurations',
                                'Quick task creation from templates',
                                'Include priority and category',
                                'Set estimated time',
                            ]}
                        />

                        {/* Analytics */}
                        <FeatureCard
                            icon={
                                <BarChart3 className="size-6 text-indigo-600 dark:text-indigo-400" />
                            }
                            title="Analytics"
                            description="Comprehensive charts and statistics about your productivity."
                            features={[
                                'Task completion trends over time',
                                'Priority distribution pie charts',
                                'Category breakdown',
                                'Goal progress tracking',
                                'Weekly productivity charts',
                            ]}
                        />
                    </div>

                    {/* Tips & Tricks */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-yellow-500/5 to-transparent"></div>
                        <div className="relative">
                            <div className="mb-6 flex items-center gap-3">
                                <Lightbulb className="size-8 text-yellow-600 dark:text-yellow-400" />
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Tips & Best Practices
                                </h2>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <TipCard
                                    title="Use Priorities Wisely"
                                    description="Reserve 'High' priority for truly urgent tasks to avoid everything being urgent."
                                />
                                <TipCard
                                    title="Break Down Large Tasks"
                                    description="Use subtasks to break complex tasks into manageable steps."
                                />
                                <TipCard
                                    title="Set Realistic Due Dates"
                                    description="Give yourself buffer time and avoid overcommitting on tight deadlines."
                                />
                                <TipCard
                                    title="Review Regularly"
                                    description="Check your dashboard daily and review analytics weekly to stay on track."
                                />
                                <TipCard
                                    title="Use Templates"
                                    description="Create templates for recurring tasks to save time and ensure consistency."
                                />
                                <TipCard
                                    title="Link to Goals"
                                    description="Connect tasks to goals to maintain focus on your bigger objectives."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Keyboard Shortcuts (Optional) */}
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-blue-500/5 to-transparent"></div>
                        <div className="relative">
                            <div className="mb-6 flex items-center gap-3">
                                <Shield className="size-8 text-blue-600 dark:text-blue-400" />
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Need More Help?
                                </h2>
                            </div>
                            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                                <p className="text-lg">
                                    If you have questions or need assistance:
                                </p>
                                <ul className="space-y-2 pl-6">
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="mt-1 size-5 text-blue-600 dark:text-blue-400" />
                                        <span>
                                            Check the sidebar navigation for
                                            quick access to all features
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="mt-1 size-5 text-blue-600 dark:text-blue-400" />
                                        <span>
                                            Hover over icons and buttons to see
                                            tooltips with more information
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="mt-1 size-5 text-blue-600 dark:text-blue-400" />
                                        <span>
                                            All data is saved automatically when
                                            you create or update items
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="mt-1 size-5 text-blue-600 dark:text-blue-400" />
                                        <span>
                                            Your data is private and secured to
                                            your account only
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
}

function FeatureCard({ icon, title, description, features }: FeatureCardProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-indigo-500/5 to-transparent"></div>
            <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 p-2 dark:from-indigo-900/30 dark:to-purple-900/30">
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                </div>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                            <ChevronRight className="mt-0.5 size-4 flex-shrink-0 text-indigo-600 dark:text-indigo-400" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

interface TipCardProps {
    title: string;
    description: string;
}

function TipCard({ title, description }: TipCardProps) {
    return (
        <div className="rounded-xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 dark:border-yellow-800 dark:from-yellow-900/20 dark:to-amber-900/20">
            <h4 className="mb-2 font-bold text-gray-900 dark:text-white">
                {title}
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
                {description}
            </p>
        </div>
    );
}
