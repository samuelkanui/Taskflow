import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Tag } from '@/types/models';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    Edit2,
    Hash,
    Plus,
    Sparkles,
    Tag as TagIcon,
    Tags,
    Trash2,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface TagsPageProps {
    tags: (Tag & { tasks_count?: number })[];
    [key: string]: any;
}

export default function TagsIndex() {
    const { tags } = usePage<TagsPageProps>().props;
    const [showModal, setShowModal] = useState(false);
    const [editingTag, setEditingTag] = useState<Tag | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        color: '#10b981',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingTag) {
            put(`/tags/${editingTag.id}`, {
                onSuccess: () => {
                    setEditingTag(null);
                    reset();
                    setShowModal(false);
                },
            });
        } else {
            post('/tags', {
                onSuccess: () => {
                    reset();
                    setShowModal(false);
                },
            });
        }
    };

    const deleteTag = (tagId: number) => {
        if (confirm('Are you sure? This will remove the tag from all tasks.')) {
            router.delete(`/tags/${tagId}`);
        }
    };

    const startEdit = (tag: Tag) => {
        setEditingTag(tag);
        setData({
            name: tag.name,
            color: tag.color,
        });
        setShowModal(true);
    };

    const colors = [
        '#10b981', // Green
        '#3b82f6', // Blue
        '#f59e0b', // Amber
        '#ef4444', // Red
        '#8b5cf6', // Purple
        '#ec4899', // Pink
        '#06b6d4', // Cyan
        '#f97316', // Orange
        '#84cc16', // Lime
        '#14b8a6', // Teal
        '#6366f1', // Indigo
        '#a855f7', // Violet
    ];

    return (
        <AppLayout>
            <Head title="Tags" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-[95%] space-y-8 p-6 lg:p-8 2xl:max-w-[1600px]">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 p-8 shadow-2xl lg:p-12">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                                        <Tags className="size-8 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl font-bold text-white lg:text-5xl">
                                            Tags
                                        </h1>
                                        <p className="mt-2 flex items-center gap-2 text-lg text-white/90">
                                            <Sparkles className="size-5" />
                                            {tags.length} tag
                                            {tags.length !== 1 ? 's' : ''} •
                                            Label and organize tasks
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setShowModal(true)}
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-pink-600 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <Plus className="size-5" />
                                    New Tag
                                </Button>
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl"></div>
                    </div>

                    {/* Enhanced Empty State */}
                    {tags.length === 0 ? (
                        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white p-16 text-center shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.1),transparent_50%)]"></div>
                            <div className="relative">
                                <div className="mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 p-6 shadow-lg dark:from-pink-900/30 dark:to-rose-900/30">
                                    <Tags className="size-16 text-pink-600 dark:text-pink-400" />
                                </div>
                                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    No Tags Yet
                                </h3>
                                <p className="mb-6 text-gray-600 dark:text-gray-400">
                                    Create your first tag to label and organize
                                    your tasks efficiently!
                                </p>
                                <Button
                                    onClick={() => setShowModal(true)}
                                    className="bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-3 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <Plus className="mr-2 size-5" />
                                    Create Your First Tag
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            {tags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className="group relative overflow-hidden rounded-2xl border-2 p-4 shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700"
                                    style={{
                                        backgroundColor: tag.color + '15',
                                        borderColor: tag.color + '50',
                                    }}
                                >
                                    <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/30 to-transparent dark:from-black/30"></div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <div
                                            className="flex size-10 items-center justify-center rounded-lg"
                                            style={{
                                                backgroundColor:
                                                    tag.color + '20',
                                            }}
                                        >
                                            <TagIcon
                                                className="size-5"
                                                style={{ color: tag.color }}
                                            />
                                        </div>
                                        <div className="relative z-10 flex gap-1">
                                            <button
                                                onClick={() => startEdit(tag)}
                                                className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-1.5 text-blue-600 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:scale-110 hover:shadow-lg dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400"
                                            >
                                                <Edit2 className="size-3.5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteTag(tag.id)
                                                }
                                                className="rounded-lg bg-gradient-to-br from-red-50 to-rose-50 p-1.5 text-red-600 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:scale-110 hover:shadow-lg dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-400"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="relative z-10 mb-3 flex items-center gap-2">
                                        <Hash
                                            className="size-4"
                                            style={{ color: tag.color }}
                                        />
                                        <h3
                                            className="flex-1 truncate text-base font-bold transition-colors hover:opacity-80"
                                            style={{ color: tag.color }}
                                        >
                                            {tag.name}
                                        </h3>
                                    </div>

                                    <div
                                        className="relative z-10 flex items-center justify-between rounded-lg p-2 text-xs"
                                        style={{
                                            backgroundColor: tag.color + '20',
                                        }}
                                    >
                                        <span
                                            className="font-semibold"
                                            style={{ color: tag.color }}
                                        >
                                            Tasks
                                        </span>
                                        <span
                                            className="rounded-lg px-2.5 py-1 font-bold shadow-sm"
                                            style={{
                                                backgroundColor: tag.color,
                                                color: 'white',
                                            }}
                                        >
                                            {tag.tasks_count || 0}
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
                        <div className="border-b border-gray-200 bg-gradient-to-r from-pink-600 to-rose-600 p-6 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                                        <Tags className="size-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {editingTag
                                            ? 'Edit Tag'
                                            : 'Create New Tag'}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingTag(null);
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
                                        placeholder="e.g., Urgent, Important, Learning"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label>Color *</Label>
                                    <div className="mt-2 grid grid-cols-6 gap-3">
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
                                    <div className="mt-3">
                                        <Label
                                            htmlFor="custom_color"
                                            className="text-xs"
                                        >
                                            Or enter custom color
                                        </Label>
                                        <div className="mt-1 flex gap-2">
                                            <Input
                                                id="custom_color"
                                                type="text"
                                                value={data.color}
                                                onChange={(e) =>
                                                    setData(
                                                        'color',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="#10b981"
                                                className="font-mono text-sm"
                                            />
                                            <div
                                                className="size-10 flex-shrink-0 rounded-lg border-2 border-gray-300"
                                                style={{
                                                    backgroundColor: data.color,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {errors.color && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.color}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setShowModal(false);
                                            setEditingTag(null);
                                            reset();
                                        }}
                                        className="px-6"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-pink-600 to-rose-600 px-8 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                    >
                                        {processing
                                            ? 'Saving...'
                                            : editingTag
                                              ? 'Update Tag'
                                              : 'Create Tag'}
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
