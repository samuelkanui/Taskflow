import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Subtask, Task, TaskAttachment } from '@/types/models';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, CheckCircle2, Circle, Clock, Download, Edit, File, FileText, Folder, Paperclip, Tag as TagIcon, Target, Trash2, Upload, X } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

interface TaskShowProps {
    task: Task & {
        subtasks?: Subtask[];
        dependencies?: Task[];
        dependents?: Task[];
    };
    [key: string]: any;
}

export default function TaskShow() {
    const { task } = usePage<TaskShowProps>().props;
    const [uploading, setUploading] = useState(false);

    const deleteTask = () => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(`/tasks/${task.id}`, {
                onSuccess: () => router.visit('/tasks'),
            });
        }
    };

    const toggleComplete = () => {
        router.post(`/tasks/${task.id}/toggle-complete`, {}, {
            preserveScroll: true,
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        router.post(`/tasks/${task.id}/attachments`, formData, {
            preserveScroll: true,
            onFinish: () => setUploading(false),
        });
    };

    const deleteAttachment = (attachmentId: number) => {
        if (confirm('Are you sure you want to delete this file?')) {
            router.delete(`/attachments/${attachmentId}`, {
                preserveScroll: true,
            });
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const extendDueDate = (days: number) => {
        router.post(`/tasks/${task.id}/extend-due-date`, {
            days: days,
        }, {
            preserveScroll: true,
        });
    };

    const saveAsTemplate = () => {
        if (confirm('Save this task as a template for future use?')) {
            router.post(`/tasks/${task.id}/create-template`);
        }
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
                return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
            case 'in_progress':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <AppLayout>
            <Head title={task.title} />

            <div className="mx-auto max-w-4xl space-y-6 p-6">
                {/* Header */}
                <div>
                    <Link
                        href="/tasks"
                        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Tasks
                    </Link>
                </div>

                {/* Task Header */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <button
                                onClick={toggleComplete}
                                className="mt-1 flex-shrink-0"
                            >
                                {task.status === 'completed' ? (
                                    <CheckCircle2 className="size-8 text-green-600" />
                                ) : (
                                    <Circle className="size-8 text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {task.title}
                                </h1>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${getPriorityColor(task.priority)}`}>
                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                                    </span>
                                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(task.status)}`}>
                                        {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/tasks/${task.id}/edit`}>
                                <Button variant="outline" size="sm">
                                    <Edit className="mr-2 size-4" />
                                    Edit
                                </Button>
                            </Link>
                            <Button variant="outline" size="sm" onClick={saveAsTemplate}>
                                <FileText className="mr-2 size-4" />
                                Save as Template
                            </Button>
                            <Button variant="outline" size="sm" onClick={deleteTask}>
                                <Trash2 className="mr-2 size-4" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Description */}
                        {task.description && (
                            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                                    Description
                                </h2>
                                <p className="whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                                    {task.description}
                                </p>
                            </div>
                        )}

                        {/* Notes */}
                        {task.notes && (
                            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                                    Notes
                                </h2>
                                <p className="whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                                    {task.notes}
                                </p>
                            </div>
                        )}

                        {/* Subtasks */}
                        {task.subtasks && task.subtasks.length > 0 && (
                            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    Subtasks ({task.subtasks.filter(st => st.is_completed).length}/{task.subtasks.length})
                                </h2>
                                <div className="space-y-2">
                                    {task.subtasks.map((subtask) => (
                                        <div
                                            key={subtask.id}
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                                        >
                                            {subtask.is_completed ? (
                                                <CheckCircle2 className="size-5 text-green-600" />
                                            ) : (
                                                <Circle className="size-5 text-gray-400" />
                                            )}
                                            <span className={`flex-1 ${subtask.is_completed ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
                                                {subtask.title}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Dependencies */}
                        {task.dependencies && task.dependencies.length > 0 && (
                            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    Dependencies
                                </h2>
                                <div className="space-y-2">
                                    {task.dependencies.map((dep) => (
                                        <Link
                                            key={dep.id}
                                            href={`/tasks/${dep.id}`}
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                                        >
                                            <span className="flex-1 text-gray-900 dark:text-white">
                                                {dep.title}
                                            </span>
                                            {dep.status === 'completed' && (
                                                <CheckCircle2 className="size-5 text-green-600" />
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* File Attachments */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    <Paperclip className="mr-2 inline-block size-5" />
                                    Attachments ({task.attachments?.length || 0})
                                </h2>
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        disabled={uploading}
                                    />
                                    <div className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50">
                                        <Upload className="size-4" />
                                        {uploading ? 'Uploading...' : 'Upload File'}
                                    </div>
                                </label>
                            </div>

                            {task.attachments && task.attachments.length > 0 ? (
                                <div className="space-y-2">
                                    {task.attachments.map((attachment) => (
                                        <div
                                            key={attachment.id}
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                                        >
                                            <File className="size-5 text-gray-400" />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {attachment.filename}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatFileSize(attachment.file_size)} • {new Date(attachment.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <a
                                                    href={`/attachments/${attachment.id}/download`}
                                                    className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <Download className="size-4 text-gray-600 dark:text-gray-400" />
                                                </a>
                                                <button
                                                    onClick={() => deleteAttachment(attachment.id)}
                                                    className="rounded p-2 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    <Trash2 className="size-4 text-red-600" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                    No files attached yet. Upload your first file!
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Meta Information */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Details
                            </h2>
                            <div className="space-y-4">
                                {/* Category */}
                                {task.category && (
                                    <div className="flex items-center gap-3">
                                        <Folder className="size-5 text-gray-400" style={{ color: task.category.color }} />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {task.category.name}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Goal */}
                                {task.goal && (
                                    <div className="flex items-center gap-3">
                                        <Target className="size-5 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Goal</p>
                                            <Link
                                                href={`/goals/${task.goal.id}`}
                                                className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                            >
                                                {task.goal.title}
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {/* Due Date */}
                                {task.due_date && (
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <Calendar className="size-5 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Due Date</p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {new Date(task.due_date).toLocaleDateString()}
                                                    {task.due_time && ` at ${task.due_time}`}
                                                </p>
                                            </div>
                                        </div>
                                        {task.status !== 'completed' && (
                                            <div className="ml-8 mt-2 flex gap-2">
                                                <button
                                                    onClick={() => extendDueDate(1)}
                                                    className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    +1 day
                                                </button>
                                                <button
                                                    onClick={() => extendDueDate(3)}
                                                    className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    +3 days
                                                </button>
                                                <button
                                                    onClick={() => extendDueDate(7)}
                                                    className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    +1 week
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Estimated Time */}
                                {task.estimated_minutes && (
                                    <div className="flex items-center gap-3">
                                        <Clock className="size-5 text-gray-400" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Estimated Time</p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {task.estimated_minutes} minutes
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Completed At */}
                                {task.completed_at && (
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="size-5 text-green-600" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {new Date(task.completed_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Created At */}
                                <div className="flex items-center gap-3">
                                    <Calendar className="size-5 text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Created</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {new Date(task.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        {task.tags && task.tags.length > 0 && (
                            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                <div className="mb-3 flex items-center gap-2">
                                    <TagIcon className="size-5 text-gray-400" />
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Tags
                                    </h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {task.tags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="rounded-full px-3 py-1 text-sm font-medium"
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

                        {/* Recurring */}
                        {task.is_recurring && (
                            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                                <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                                    Recurring Task
                                </h2>
                                <div className="space-y-2 text-sm">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">Frequency:</span> {task.recurrence_type}
                                    </p>
                                    {task.recurrence_interval && (
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">Interval:</span> Every {task.recurrence_interval} {task.recurrence_type}
                                        </p>
                                    )}
                                    {task.recurrence_end_date && (
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-medium">Ends:</span> {new Date(task.recurrence_end_date).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
