import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Category } from '@/types/models';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    Edit2,
    Folder,
    FolderOpen,
    Layers,
    Plus,
    Sparkles,
    Trash2,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface CategoriesPageProps {
    categories: (Category & { tasks_count?: number })[];
    [key: string]: unknown;
}

export default function CategoriesIndex() {
    const { categories } = usePage<CategoriesPageProps>().props;
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null,
    );

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        color: '#3b82f6',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCategory) {
            put(`/categories/${editingCategory.id}`, {
                onSuccess: () => {
                    setEditingCategory(null);
                    reset();
                    setShowModal(false);
                },
            });
        } else {
            post('/categories', {
                onSuccess: () => {
                    reset();
                    setShowModal(false);
                },
            });
        }
    };

    const deleteCategory = (categoryId: number) => {
        if (
            confirm(
                'Are you sure? This will remove the category from all tasks.',
            )
        ) {
            router.delete(`/categories/${categoryId}`);
        }
    };

    const startEdit = (category: Category) => {
        setEditingCategory(category);
        setData({
            name: category.name,
            color: category.color,
            description: category.description || '',
        });
        setShowModal(true);
    };

    const colors = [
        '#3b82f6', // Blue
        '#10b981', // Green
        '#f59e0b', // Amber
        '#ef4444', // Red
        '#8b5cf6', // Purple
        '#ec4899', // Pink
        '#06b6d4', // Cyan
        '#f97316', // Orange
    ];

    return (
        <AppLayout>
            <Head title="Categories" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-[95%] space-y-8 p-6 lg:p-8 2xl:max-w-[1600px]">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 p-8 shadow-2xl lg:p-12">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                        <Layers className="size-8 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-bold text-white lg:text-5xl">
                                            Categories
                                        </h1>
                                        <p className="mt-2 flex items-center gap-2 text-lg text-white/90">
                                            <Sparkles className="size-5" />
                                            {categories.length} categor
                                            {categories.length !== 1
                                                ? 'ies'
                                                : 'y'}{' '}
                                            • Organize your tasks
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setShowModal(true)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-orange-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <Plus className="size-5" />
                                    New Category
                                </Button>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Enhanced Empty State */}
                    {categories.length === 0 ? (
                        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white p-16 text-center shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.1),transparent_50%)]"></div>
                            <div className="relative">
                                <div className="mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 p-6 shadow-lg dark:from-orange-900/30 dark:to-amber-900/30">
                                    <Layers className="size-16 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    No Categories Yet
                                </h3>
                                <p className="mb-6 text-gray-600 dark:text-gray-400">
                                    Create your first category to organize and
                                    classify your tasks efficiently!
                                </p>
                                <Button
                                    onClick={() => setShowModal(true)}
                                    className="bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-3 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <Plus className="mr-2 size-5" />
                                    Create Your First Category
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
                                >
                                    <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-orange-500/5 to-transparent"></div>
                                    <div className="mb-4 flex items-start justify-between">
                                        <div
                                            className="flex size-12 items-center justify-center rounded-lg"
                                            style={{
                                                backgroundColor:
                                                    category.color + '20',
                                            }}
                                        >
                                            <Folder
                                                className="size-6"
                                                style={{
                                                    color: category.color,
                                                }}
                                            />
                                        </div>
                                        <div className="relative z-10 flex gap-2">
                                            <button
                                                onClick={() =>
                                                    startEdit(category)
                                                }
                                                className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-2 text-blue-600 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:scale-110 hover:shadow-lg dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400"
                                            >
                                                <Edit2 className="size-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteCategory(category.id)
                                                }
                                                className="rounded-lg bg-gradient-to-br from-red-50 to-rose-50 p-2 text-red-600 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:scale-110 hover:shadow-lg dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-400"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="relative z-10 mb-2 text-xl font-bold text-gray-900 transition-colors hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-600 hover:bg-clip-text hover:text-transparent dark:text-white">
                                        {category.name}
                                    </h3>

                                    {category.description && (
                                        <p className="relative z-10 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                            {category.description}
                                        </p>
                                    )}

                                    <div className="relative z-10 mt-4 flex items-center justify-between rounded-lg bg-gradient-to-r from-orange-50 to-transparent p-3 dark:from-orange-900/20">
                                        <div className="flex items-center gap-2">
                                            <FolderOpen
                                                className="size-4"
                                                style={{
                                                    color: category.color,
                                                }}
                                            />
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">
                                                Tasks
                                            </span>
                                        </div>
                                        <span
                                            className="rounded-lg px-3 py-1 text-sm font-bold shadow-sm"
                                            style={{
                                                backgroundColor:
                                                    category.color + '30',
                                                color: category.color,
                                            }}
                                        >
                                            {category.tasks_count || 0}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Enhanced Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl dark:from-gray-800 dark:to-gray-900">
                        <div className="border-b border-gray-200 bg-gradient-to-r from-orange-600 to-amber-600 p-6 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                                        <Layers className="size-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {editingCategory
                                            ? 'Edit Category'
                                            : 'Create New Category'}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingCategory(null);
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
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        required
                                        className="mt-1"
                                        placeholder="e.g., Work, Personal, Projects"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label>Color *</Label>
                                    <div className="mt-2 flex flex-wrap gap-3">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() =>
                                                    setData('color', color)
                                                }
                                                className={`size-12 rounded-xl shadow-md transition-all hover:scale-110 hover:shadow-lg ${
                                                    data.color === color
                                                        ? 'ring-4 ring-offset-2'
                                                        : ''
                                                }`}
                                                style={{
                                                    backgroundColor: color,
                                                    ...(data.color === color
                                                        ? {
                                                              boxShadow: `0 0 0 4px ${color}40`,
                                                          }
                                                        : {}),
                                                }}
                                            />
                                        ))}
                                    </div>
                                    {errors.color && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.color}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1"
                                        rows={3}
                                        placeholder="Optional description"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setShowModal(false);
                                            setEditingCategory(null);
                                            reset();
                                        }}
                                        className="px-6"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-orange-600 to-amber-600 px-8 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                    >
                                        {processing
                                            ? 'Saving...'
                                            : editingCategory
                                              ? 'Update Category'
                                              : 'Create Category'}
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
