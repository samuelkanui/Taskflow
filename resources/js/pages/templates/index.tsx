import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Category, TaskTemplate } from '@/types/models';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { FileText, Plus, Edit, Trash2, ArrowRight, Sparkles, Copy, Clock, BookTemplate } from 'lucide-react';
import { useState } from 'react';

interface TemplatesPageProps {
    templates: (TaskTemplate & { category?: Category })[];
    [key: string]: any;
}

export default function TemplatesIndex() {
    const { templates } = usePage<TemplatesPageProps>().props;
    const [showModal, setShowModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<TaskTemplate | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        priority: 'medium',
        category_id: '',
        estimated_minutes: '',
    });

    const openModal = (template?: TaskTemplate) => {
        if (template) {
            setEditingTemplate(template);
            setFormData({
                name: template.name,
                description: template.description || '',
                priority: template.priority,
                category_id: template.category_id?.toString() || '',
                estimated_minutes: template.estimated_minutes?.toString() || '',
            });
        } else {
            setEditingTemplate(null);
            setFormData({
                name: '',
                description: '',
                priority: 'medium',
                category_id: '',
                estimated_minutes: '',
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingTemplate(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingTemplate) {
            router.put(`/templates/${editingTemplate.id}`, formData, {
                onSuccess: () => closeModal(),
            });
        } else {
            router.post('/templates', formData, {
                onSuccess: () => closeModal(),
            });
        }
    };

    const deleteTemplate = (id: number) => {
        if (confirm('Are you sure you want to delete this template?')) {
            router.delete(`/templates/${id}`);
        }
    };

    const createTask = (templateId: number) => {
        router.post(`/templates/${templateId}/create-task`);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
            case 'medium':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
            case 'low':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <AppLayout>
            <Head title="Task Templates" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-[95%] 2xl:max-w-[1600px] space-y-8 p-6 lg:p-8">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 shadow-2xl lg:p-12">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                        <BookTemplate className="size-8 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-bold text-white lg:text-5xl">
                                            Task Templates
                                        </h1>
                                        <p className="mt-2 flex items-center gap-2 text-lg text-white/90">
                                            <Sparkles className="size-5" />
                                            {templates.length} template{templates.length !== 1 ? 's' : ''} • Reusable task blueprints
                                        </p>
                                    </div>
                                </div>
                                <Button 
                                    onClick={() => openModal()}
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-teal-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <Plus className="size-5" />
                                    New Template
                                </Button>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Enhanced Empty State */}
                    {templates.length === 0 ? (
                        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white p-16 text-center shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.1),transparent_50%)]"></div>
                            <div className="relative">
                                <div className="mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 p-6 shadow-lg dark:from-teal-900/30 dark:to-cyan-900/30">
                                    <BookTemplate className="size-16 text-teal-600 dark:text-teal-400" />
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    No Templates Yet
                                </h3>
                                <p className="mb-6 text-gray-600 dark:text-gray-400">
                                    Create your first template to quickly generate similar tasks with consistent settings!
                                </p>
                                <Button 
                                    onClick={() => openModal()}
                                    className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-3 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <Plus className="mr-2 size-5" />
                                    Create Your First Template
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
                            >
                                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-teal-500/5 to-transparent"></div>
                                <div className="relative z-10 mb-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Copy className="size-5 text-teal-600 dark:text-teal-400" />
                                        <h3 className="flex-1 text-lg font-bold text-gray-900 transition-colors hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 hover:bg-clip-text hover:text-transparent dark:text-white">
                                            {template.name}
                                        </h3>
                                    </div>
                                    {template.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {template.description}
                                        </p>
                                    )}
                                </div>

                                <div className="relative z-10 mb-4 flex flex-wrap gap-2">
                                    <span className={`rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-sm ${getPriorityColor(template.priority)}`}>
                                        {template.priority}
                                    </span>
                                    {template.category && (
                                        <span
                                            className="rounded-lg px-3 py-1 text-xs font-bold shadow-sm"
                                            style={{
                                                backgroundColor: template.category.color + '30',
                                                color: template.category.color,
                                            }}
                                        >
                                            {template.category.name}
                                        </span>
                                    )}
                                    {template.estimated_minutes && (
                                        <span className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 text-xs font-bold text-gray-700 shadow-sm dark:from-gray-700 dark:to-gray-600 dark:text-gray-300">
                                            <Clock className="size-3" />
                                            {template.estimated_minutes}min
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-10 flex gap-2">
                                    <button
                                        onClick={() => createTask(template.id)}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
                                    >
                                        <ArrowRight className="size-4" />
                                        Create Task
                                    </button>
                                    <button
                                        onClick={() => openModal(template)}
                                        className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-2.5 text-blue-600 shadow-md transition-all hover:scale-110 hover:shadow-lg dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400"
                                    >
                                        <Edit className="size-4" />
                                    </button>
                                    <button
                                        onClick={() => deleteTemplate(template.id)}
                                        className="rounded-lg bg-gradient-to-br from-red-50 to-rose-50 p-2.5 text-red-600 shadow-md transition-all hover:scale-110 hover:shadow-lg dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-400"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Enhanced Template Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl dark:from-gray-800 dark:to-gray-900">
                        <div className="border-b border-gray-200 bg-gradient-to-r from-teal-600 to-cyan-600 p-6 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                                        <BookTemplate className="size-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {editingTemplate ? 'Edit Template' : 'Create New Template'}
                                    </h2>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="rounded-lg bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30"
                                >
                                    <Edit className="size-5" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Template Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Priority
                                </label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    required
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Estimated Time (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={formData.estimated_minutes}
                                    onChange={(e) => setFormData({ ...formData, estimated_minutes: e.target.value })}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    min="0"
                                />
                            </div>

                            <div className="flex gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-2 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    {editingTemplate ? 'Update Template' : 'Create Template'}
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
