import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Category, Goal, Tag, Task } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { Calendar, X } from 'lucide-react';
import { FormEventHandler } from 'react';

interface TaskFormProps {
    task?: Task;
    categories: Category[];
    tags: Tag[];
    goals: Goal[];
    onCancel?: () => void;
}

export default function TaskForm({ task, categories, tags, goals, onCancel }: TaskFormProps) {
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
        tags: task?.tags?.map(t => t.id) || [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

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
            setData('tags', data.tags.filter(id => id !== tagId));
        } else {
            setData('tags', [...data.tags, tagId]);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
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
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1"
                    placeholder="Describe your task"
                    rows={3}
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
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
                        onChange={(e) => setData('priority', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        required
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    {errors.priority && <p className="mt-1 text-sm text-red-600">{errors.priority}</p>}
                </div>

                <div>
                    <Label htmlFor="status">
                        Status <span className="text-red-500">*</span>
                    </Label>
                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                </div>
            </div>

            {/* Category & Goal */}
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <Label htmlFor="category_id">Category</Label>
                    <select
                        id="category_id"
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">None</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                </div>

                <div>
                    <Label htmlFor="goal_id">Goal</Label>
                    <select
                        id="goal_id"
                        value={data.goal_id}
                        onChange={(e) => setData('goal_id', e.target.value)}
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">None</option>
                        {goals.map((goal) => (
                            <option key={goal.id} value={goal.id}>
                                {goal.title}
                            </option>
                        ))}
                    </select>
                    {errors.goal_id && <p className="mt-1 text-sm text-red-600">{errors.goal_id}</p>}
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
                            onChange={(e) => setData('due_date', e.target.value)}
                        />
                        <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.due_date && <p className="mt-1 text-sm text-red-600">{errors.due_date}</p>}
                </div>

                <div>
                    <Label htmlFor="due_time">Due Time</Label>
                    <Input
                        id="due_time"
                        type="time"
                        value={data.due_time}
                        onChange={(e) => setData('due_time', e.target.value)}
                        className="mt-1"
                    />
                    {errors.due_time && <p className="mt-1 text-sm text-red-600">{errors.due_time}</p>}
                </div>
            </div>

            {/* Estimated Time */}
            <div>
                <Label htmlFor="estimated_minutes">Estimated Time (minutes)</Label>
                <Input
                    id="estimated_minutes"
                    type="number"
                    min="0"
                    value={data.estimated_minutes}
                    onChange={(e) => setData('estimated_minutes', e.target.value)}
                    className="mt-1"
                    placeholder="e.g., 60"
                />
                {errors.estimated_minutes && <p className="mt-1 text-sm text-red-600">{errors.estimated_minutes}</p>}
            </div>

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
                                ringColor: tag.color,
                            }}
                        >
                            {tag.name}
                            {data.tags.includes(tag.id) && <X className="size-3" />}
                        </button>
                    ))}
                    {tags.length === 0 && (
                        <p className="text-sm text-gray-500">No tags available. Create tags first.</p>
                    )}
                </div>
                {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
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
                {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Button type="submit" disabled={processing}>
                    {processing ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
                </Button>
            </div>
        </form>
    );
}
