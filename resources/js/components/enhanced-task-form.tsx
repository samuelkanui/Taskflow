import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Category, Goal, Tag, Task } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { Calendar, CheckCircle2, Circle, Plus, Trash2, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface TaskFormProps {
    task?: Task;
    categories: Category[];
    tags: Tag[];
    goals: Goal[];
    allTasks?: Task[];
    onCancel?: () => void;
}

interface SubtaskItem {
    id?: number;
    title: string;
    order: number;
    is_completed: boolean;
}

export default function EnhancedTaskForm({
    task,
    categories,
    tags,
    goals,
    allTasks = [],
    onCancel,
}: TaskFormProps) {
    const [subtasks, setSubtasks] = useState<SubtaskItem[]>(
        task?.subtasks?.map((st) => ({
            id: st.id,
            title: st.title,
            order: st.order,
            is_completed: st.is_completed,
        })) || [],
    );
    const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

    const { data, setData, post, put, processing, errors } = useForm({
        title: task?.title || '',
        description: task?.description || '',
        notes: task?.notes || '',
        priority: task?.priority || 'medium',
        status: task?.status || 'pending',
        category_id: task?.category_id || '',
        goal_id: task?.goal_id || '',
        due_date: task?.due_date || '',
        due_time: task?.due_time || '',
        estimated_minutes: task?.estimated_minutes || '',
        is_recurring: task?.is_recurring || false,
        recurrence_type: task?.recurrence_type || 'daily',
        recurrence_interval: task?.recurrence_interval || 1,
        recurrence_end_date: task?.recurrence_end_date || '',
        tags: task?.tags?.map((t) => t.id) || [],
        subtasks: subtasks,
        dependencies: task?.dependencies?.map((d) => d.id) || [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Update form data with subtasks before submitting
        setData('subtasks', subtasks);

        if (task) {
            put(`/tasks/${task.id}`, {
                onSuccess: () => onCancel?.(),
            });
        } else {
            post('/tasks', {
                onSuccess: () => onCancel?.(),
            });
        }
    };

    const toggleTag = (tagId: number) => {
        if (data.tags.includes(tagId)) {
            setData(
                'tags',
                data.tags.filter((id) => id !== tagId),
            );
        } else {
            setData('tags', [...data.tags, tagId]);
        }
    };

    const addSubtask = () => {
        if (newSubtaskTitle.trim()) {
            const newSubtask: SubtaskItem = {
                title: newSubtaskTitle.trim(),
                order: subtasks.length,
                is_completed: false,
            };
            setSubtasks([...subtasks, newSubtask]);
            setNewSubtaskTitle('');
        }
    };

    const removeSubtask = (index: number) => {
        setSubtasks(subtasks.filter((_, idx) => idx !== index));
    };

    const toggleDependency = (taskId: number) => {
        if (data.dependencies.includes(taskId)) {
            setData(
                'dependencies',
                data.dependencies.filter((id) => id !== taskId),
            );
        } else {
            setData('dependencies', [...data.dependencies, taskId]);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            {/* Two Column Layout on Large Screens */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column - Main Fields (2/3 width) */}
                <div className="space-y-6 lg:col-span-2">
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                            Task Details
                        </h3>
                    </div>
                    {/* Title */}
                    <div>
                        <Label htmlFor="title">
                            Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1"
                            placeholder="Enter task title"
                            required
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            className="mt-1"
                            placeholder="Describe your task"
                            rows={3}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Priority & Status */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="priority">
                                Priority <span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="priority"
                                value={data.priority}
                                onChange={(e) =>
                                    setData('priority', e.target.value as 'low' | 'medium' | 'high')
                                }
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="status">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value as 'pending' | 'in_progress' | 'completed')
                                }
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    {/* Category & Goal */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="category_id">Category</Label>
                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={(e) =>
                                    setData('category_id', e.target.value)
                                }
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">None</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="goal_id">Goal</Label>
                            <select
                                id="goal_id"
                                value={data.goal_id}
                                onChange={(e) =>
                                    setData('goal_id', e.target.value)
                                }
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">None</option>
                                {goals.map((goal) => (
                                    <option key={goal.id} value={goal.id}>
                                        {goal.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Due Date & Time */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="due_date">Due Date</Label>
                            <div className="relative mt-1">
                                <Input
                                    id="due_date"
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) =>
                                        setData('due_date', e.target.value)
                                    }
                                />
                                <Calendar className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="due_time">Due Time</Label>
                            <Input
                                id="due_time"
                                type="time"
                                value={data.due_time}
                                onChange={(e) =>
                                    setData('due_time', e.target.value)
                                }
                                className="mt-1"
                            />
                        </div>
                    </div>

                    {/* Estimated Time */}
                    <div>
                        <Label htmlFor="estimated_minutes">
                            Estimated Time (minutes)
                        </Label>
                        <Input
                            id="estimated_minutes"
                            type="number"
                            min="0"
                            value={data.estimated_minutes}
                            onChange={(e) =>
                                setData('estimated_minutes', e.target.value)
                            }
                            className="mt-1"
                            placeholder="e.g., 60"
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            className="mt-1"
                            placeholder="Additional notes or comments"
                            rows={4}
                        />
                    </div>
                </div>

                {/* Right Column - Secondary Fields (1/3 width) */}
                <div className="space-y-6">
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                            Additional Options
                        </h3>
                    </div>
                    {/* Recurring Task Section */}
                    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50/50 to-transparent p-4 shadow-sm dark:border-gray-700 dark:from-purple-900/10">
                        <div className="mb-3 flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_recurring"
                                checked={data.is_recurring}
                                onChange={(e) =>
                                    setData('is_recurring', e.target.checked)
                                }
                                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label
                                htmlFor="is_recurring"
                                className="cursor-pointer"
                            >
                                Make this a recurring task
                            </Label>
                        </div>

                        {data.is_recurring && (
                            <div className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="recurrence_type">
                                            Frequency
                                        </Label>
                                        <select
                                            id="recurrence_type"
                                            value={data.recurrence_type}
                                            onChange={(e) =>
                                                setData(
                                                    'recurrence_type',
                                                    e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly',
                                                )
                                            }
                                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="weekly">
                                                Weekly
                                            </option>
                                            <option value="monthly">
                                                Monthly
                                            </option>
                                            <option value="yearly">
                                                Yearly
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <Label htmlFor="recurrence_interval">
                                            Every
                                        </Label>
                                        <div className="mt-1 flex items-center gap-2">
                                            <Input
                                                id="recurrence_interval"
                                                type="number"
                                                min="1"
                                                value={data.recurrence_interval}
                                                onChange={(e) =>
                                                    setData(
                                                        'recurrence_interval',
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                            />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {data.recurrence_type}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="recurrence_end_date">
                                        End Date (optional)
                                    </Label>
                                    <Input
                                        id="recurrence_end_date"
                                        type="date"
                                        value={data.recurrence_end_date}
                                        onChange={(e) =>
                                            setData(
                                                'recurrence_end_date',
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Subtasks Section */}
                    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50/50 to-transparent p-4 shadow-sm dark:border-gray-700 dark:from-blue-900/10">
                        <Label className="mb-3 block">Subtasks</Label>

                        {/* Existing Subtasks */}
                        <div className="mb-3 space-y-2">
                            {subtasks.map((subtask, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-2 dark:border-gray-700"
                                >
                                    {subtask.is_completed ? (
                                        <CheckCircle2 className="size-5 text-green-600" />
                                    ) : (
                                        <Circle className="size-5 text-gray-400" />
                                    )}
                                    <span className="flex-1 text-sm">
                                        {subtask.title}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeSubtask(index)}
                                        className="rounded p-1 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="size-4 text-red-600" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add New Subtask */}
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                value={newSubtaskTitle}
                                onChange={(e) =>
                                    setNewSubtaskTitle(e.target.value)
                                }
                                placeholder="Add a subtask..."
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addSubtask();
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                onClick={addSubtask}
                                variant="outline"
                            >
                                <Plus className="size-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Dependencies Section */}
                    {allTasks.length > 0 && (
                        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-indigo-50/50 to-transparent p-4 shadow-sm dark:border-gray-700 dark:from-indigo-900/10">
                            <Label className="mb-3 block">Dependencies</Label>
                            <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                                Select tasks that must be completed before this
                                task can be started
                            </p>
                            <div className="max-h-48 space-y-2 overflow-y-auto">
                                {allTasks
                                    .filter((t) => t.id !== task?.id)
                                    .slice(0, 20)
                                    .map((t) => (
                                        <label
                                            key={t.id}
                                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.dependencies.includes(
                                                    t.id,
                                                )}
                                                onChange={() =>
                                                    toggleDependency(t.id)
                                                }
                                                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm">
                                                {t.title}
                                            </span>
                                        </label>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    <div>
                        <Label>Tags</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <button
                                    key={tag.id}
                                    type="button"
                                    onClick={() => toggleTag(tag.id)}
                                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-all ${
                                        data.tags.includes(tag.id)
                                            ? 'ring-2 ring-offset-2'
                                            : 'opacity-60 hover:opacity-100'
                                    }`}
                                    style={{
                                        backgroundColor: tag.color + '20',
                                        color: tag.color,
                                    }}
                                >
                                    {tag.name}
                                    {data.tags.includes(tag.id) && (
                                        <X className="size-3" />
                                    )}
                                </button>
                            ))}
                            {tags.length === 0 && (
                                <p className="text-sm text-gray-500">
                                    No tags available. Create tags first.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Actions */}
            <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-red-500">*</span> Required fields
                </p>
                <div className="flex gap-3">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="px-6"
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:from-blue-500 dark:to-purple-500"
                    >
                        {processing
                            ? 'Saving...'
                            : task
                              ? 'Update Task'
                              : 'Create Task'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
