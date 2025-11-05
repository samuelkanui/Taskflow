import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Goal } from '@/types/models';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Calendar, Plus, Target, Trash2, TrendingUp, X, Sparkles, Edit2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface GoalsPageProps {
    goals: (Goal & { tasks_count?: number })[];
    [key: string]: any;
}

export default function GoalsIndex() {
    const { goals } = usePage<GoalsPageProps>().props;
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        title: '',
        description: '',
        target_year: new Date().getFullYear(),
        target_value: 0,
        current_value: 0,
        unit: '',
        status: 'in_progress',
        start_date: '',
        target_date: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingGoal) {
            put(`/goals/${editingGoal.id}`, {
                onSuccess: () => {
                    setEditingGoal(null);
                    reset();
                },
            });
        } else {
            post('/goals', {
                onSuccess: () => {
                    setShowCreateModal(false);
                    reset();
                },
            });
        }
    };

    const deleteGoal = (goalId: number) => {
        if (confirm('Are you sure you want to delete this goal?')) {
            router.delete(`/goals/${goalId}`);
        }
    };

    const startEdit = (goal: Goal) => {
        setEditingGoal(goal);
        setData({
            title: goal.title,
            description: goal.description || '',
            target_year: goal.target_year,
            target_value: goal.target_value,
            current_value: goal.current_value,
            unit: goal.unit || '',
            status: goal.status,
            start_date: goal.start_date || '',
            target_date: goal.target_date || '',
        });
        setShowCreateModal(true);
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 100) return 'text-green-600';
        if (percentage >= 75) return 'text-blue-600';
        if (percentage >= 50) return 'text-yellow-600';
        return 'text-gray-600';
    };

    return (
        <AppLayout>
            <Head title="Goals" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-[95%] 2xl:max-w-[1600px] space-y-8 p-6 lg:p-8">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 shadow-2xl lg:p-12">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                        <Target className="size-8 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-bold text-white lg:text-5xl">
                                            Goals
                                        </h1>
                                        <p className="mt-2 flex items-center gap-2 text-lg text-white/90">
                                            <Sparkles className="size-5" />
                                            {goals.length} goal{goals.length !== 1 ? 's' : ''} • Track your progress
                                        </p>
                                    </div>
                                </div>
                                <Button 
                                    onClick={() => setShowCreateModal(true)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <Plus className="size-5" />
                                    New Goal
                                </Button>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Goals Grid */}
                    {goals.length === 0 ? (
                        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white p-16 text-center shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]"></div>
                            <div className="relative">
                                <div className="mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 p-6 shadow-lg dark:from-emerald-900/30 dark:to-teal-900/30">
                                    <Target className="size-16 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    No Goals Yet
                                </h3>
                                <p className="mb-6 text-gray-600 dark:text-gray-400">
                                    Create your first goal to start tracking progress and achieving your dreams!
                                </p>
                                <Button 
                                    onClick={() => setShowCreateModal(true)} 
                                    className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <Plus className="mr-2 size-5" />
                                    Create Your First Goal
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {goals.map((goal) => {
                            const progress = goal.target_value > 0
                                ? Math.min((goal.current_value / goal.target_value) * 100, 100)
                                : 0;

                            return (
                                <div
                                    key={goal.id}
                                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
                                >
                                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/5 to-transparent"></div>
                                    {/* Header */}
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {goal.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {goal.target_year}
                                            </p>
                                        </div>
                                        <div className="relative z-10 flex gap-2">
                                            <button
                                                onClick={() => startEdit(goal)}
                                                className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-2 text-blue-600 opacity-0 shadow-md transition-all hover:scale-110 hover:shadow-lg group-hover:opacity-100 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400"
                                            >
                                                <Edit2 className="size-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteGoal(goal.id)}
                                                className="rounded-lg bg-gradient-to-br from-red-50 to-rose-50 p-2 text-red-600 opacity-0 shadow-md transition-all hover:scale-110 hover:shadow-lg group-hover:opacity-100 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-400"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {goal.description && (
                                        <p className="relative z-10 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                            {goal.description}
                                        </p>
                                    )}

                                    {/* Enhanced Progress Circle */}
                                    <div className="relative z-10 mb-6 flex items-center justify-center">
                                        <div className="relative size-40">
                                            <svg className="size-full -rotate-90">
                                                <circle
                                                    cx="80"
                                                    cy="80"
                                                    r="70"
                                                    stroke="currentColor"
                                                    strokeWidth="10"
                                                    fill="none"
                                                    className="text-gray-200 dark:text-gray-700"
                                                />
                                                <circle
                                                    cx="80"
                                                    cy="80"
                                                    r="70"
                                                    stroke={`url(#gradient-${goal.id})`}
                                                    strokeWidth="10"
                                                    fill="none"
                                                    strokeDasharray={`${(progress / 100) * 439.82} 439.82`}
                                                    strokeLinecap="round"
                                                    className="transition-all duration-500"
                                                />
                                                <defs>
                                                    <linearGradient id={`gradient-${goal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor={progress >= 75 ? "#10b981" : progress >= 50 ? "#3b82f6" : progress >= 25 ? "#f59e0b" : "#ef4444"} />
                                                        <stop offset="100%" stopColor={progress >= 75 ? "#059669" : progress >= 50 ? "#2563eb" : progress >= 25 ? "#d97706" : "#dc2626"} />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className={`text-3xl font-black ${getProgressColor(progress)}`}>
                                                    {Math.round(progress)}%
                                                </span>
                                                <span className="mt-1 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                                    {goal.current_value}/{goal.target_value}
                                                </span>
                                                {goal.unit && (
                                                    <span className="text-xs text-gray-500">
                                                        {goal.unit}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enhanced Stats */}
                                    <div className="relative z-10 space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                                        {goal.tasks_count !== undefined && (
                                            <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-transparent p-3 dark:from-blue-900/20">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400" />
                                                    <span className="font-semibold text-gray-700 dark:text-gray-300">Tasks</span>
                                                </div>
                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                                    {goal.tasks_count}
                                                </span>
                                            </div>
                                        )}
                                        {goal.target_date && (
                                            <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-purple-50 to-transparent p-3 dark:from-purple-900/20">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="size-4 text-purple-600 dark:text-purple-400" />
                                                    <span className="font-semibold text-gray-700 dark:text-gray-300">Target Date</span>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                    {new Date(goal.target_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-emerald-50 to-transparent p-3 dark:from-emerald-900/20">
                                            <div className="flex items-center gap-2">
                                                <Target className="size-4 text-emerald-600 dark:text-emerald-400" />
                                                <span className="font-semibold text-gray-700 dark:text-gray-300">Status</span>
                                            </div>
                                            <span
                                                className={`rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-sm ${
                                                    goal.status === 'completed'
                                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                                        : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                                                }`}
                                            >
                                                {goal.status === 'completed' ? 'Completed' : 'In Progress'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        </div>
                    )}
                </div>
            </div>

                {/* Enhanced Create/Edit Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                        <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl dark:from-gray-800 dark:to-gray-900">
                            <div className="border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-teal-600 p-6 dark:border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                                            <Target className="size-6 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">
                                            {editingGoal ? 'Edit Goal' : 'Create New Goal'}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowCreateModal(false);
                                            setEditingGoal(null);
                                            reset();
                                        }}
                                        className="rounded-lg bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30"
                                    >
                                        <X className="size-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        className="mt-1"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1"
                                        rows={3}
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div>
                                        <Label htmlFor="target_year">Year *</Label>
                                        <Input
                                            id="target_year"
                                            type="number"
                                            value={data.target_year}
                                            onChange={(e) => setData('target_year', parseInt(e.target.value))}
                                            required
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="target_value">Target *</Label>
                                        <Input
                                            id="target_value"
                                            type="number"
                                            step="0.01"
                                            value={data.target_value}
                                            onChange={(e) => setData('target_value', parseFloat(e.target.value))}
                                            required
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="unit">Unit</Label>
                                        <Input
                                            id="unit"
                                            value={data.unit}
                                            onChange={(e) => setData('unit', e.target.value)}
                                            placeholder="e.g., km, books"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="current_value">Current Progress</Label>
                                    <Input
                                        id="current_value"
                                        type="number"
                                        step="0.01"
                                        value={data.current_value}
                                        onChange={(e) => setData('current_value', parseFloat(e.target.value))}
                                        className="mt-1"
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="start_date">Start Date</Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="target_date">Target Date</Label>
                                        <Input
                                            id="target_date"
                                            type="date"
                                            value={data.target_date}
                                            onChange={(e) => setData('target_date', e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setShowCreateModal(false);
                                            setEditingGoal(null);
                                            reset();
                                        }}
                                        className="px-6"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                    >
                                        {processing ? 'Saving...' : editingGoal ? 'Update Goal' : 'Create Goal'}
                                    </Button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                )}
        </AppLayout>
    );
}
