<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Goal;
use App\Models\Tag;
use App\Models\Task;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Task::where('user_id', auth()->id())
            ->with(['category', 'tags', 'subtasks']);

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('goal_id')) {
            $query->where('goal_id', $request->goal_id);
        }

        // View filters: Today, This Week, This Month, This Year
        if ($request->filled('view')) {
            switch ($request->view) {
                case 'today':
                    $query->whereDate('due_date', today());
                    break;
                case 'week':
                    $query->whereBetween('due_date', [now()->startOfWeek(), now()->endOfWeek()]);
                    break;
                case 'month':
                    $query->whereMonth('due_date', now()->month)
                          ->whereYear('due_date', now()->year);
                    break;
                case 'year':
                    $query->whereYear('due_date', now()->year);
                    break;
                case 'overdue':
                    $query->where('due_date', '<', now())
                          ->where('status', '!=', 'completed');
                    break;
            }
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                  ->orWhere('description', 'like', "%{$request->search}%")
                  ->orWhere('notes', 'like', "%{$request->search}%");
            });
        }

        // Sorting
        $sortBy = $request->get('sort', 'created_at');
        $sortDir = $request->get('dir', 'desc');
        $query->orderBy($sortBy, $sortDir);

        $tasks = $query->paginate(50);

        return Inertia::render('tasks/index', [
            'tasks' => $tasks,
            'categories' => Category::where('user_id', auth()->id())->get(),
            'tags' => Tag::where('user_id', auth()->id())->get(),
            'goals' => Goal::where('user_id', auth()->id())->get(),
            'filters' => $request->only(['status', 'priority', 'category_id', 'goal_id', 'search', 'view', 'sort', 'dir']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('tasks/create', [
            'categories' => Category::where('user_id', auth()->id())->get(),
            'tags' => Tag::where('user_id', auth()->id())->get(),
            'goals' => Goal::where('user_id', auth()->id())->get(),
            'allTasks' => Task::where('user_id', auth()->id())
                ->select('id', 'title', 'status')
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'notes' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:pending,in_progress,completed',
            'category_id' => 'nullable|exists:categories,id',
            'goal_id' => 'nullable|exists:goals,id',
            'due_date' => 'nullable|date',
            'due_time' => 'nullable',
            'estimated_minutes' => 'nullable|integer|min:0',
            'is_recurring' => 'nullable|boolean',
            'recurrence_type' => 'nullable|in:daily,weekly,monthly,yearly',
            'recurrence_interval' => 'nullable|integer|min:1',
            'recurrence_end_date' => 'nullable|date',
            'subtasks' => 'nullable|array',
            'subtasks.*.title' => 'required|string|max:255',
            'subtasks.*.order' => 'nullable|integer',
            'dependencies' => 'nullable|array',
            'dependencies.*' => 'exists:tasks,id',
        ]);

        $task = auth()->user()->tasks()->create($validated);

        // Attach tags if provided
        if ($request->has('tags')) {
            $task->tags()->sync($request->tags);
        }

        // Create subtasks if provided
        if ($request->has('subtasks')) {
            foreach ($request->subtasks as $index => $subtaskData) {
                $task->subtasks()->create([
                    'title' => $subtaskData['title'],
                    'order' => $subtaskData['order'] ?? $index,
                    'is_completed' => false,
                ]);
            }
        }

        // Attach dependencies if provided
        if ($request->has('dependencies')) {
            $task->dependencies()->sync($request->dependencies);
        }

        return redirect()->route('tasks.index')->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $this->authorize('view', $task);

        $task->load(['category', 'goal', 'tags', 'subtasks', 'attachments', 'dependencies', 'dependents']);

        return Inertia::render('tasks/show', [
            'task' => $task,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $this->authorize('update', $task);

        $task->load(['tags', 'subtasks', 'dependencies']);

        return Inertia::render('tasks/edit', [
            'task' => $task,
            'categories' => Category::where('user_id', auth()->id())->get(),
            'tags' => Tag::where('user_id', auth()->id())->get(),
            'goals' => Goal::where('user_id', auth()->id())->get(),
            'allTasks' => Task::where('user_id', auth()->id())
                ->where('id', '!=', $task->id)
                ->select('id', 'title', 'status')
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'notes' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:pending,in_progress,completed',
            'category_id' => 'nullable|exists:categories,id',
            'goal_id' => 'nullable|exists:goals,id',
            'due_date' => 'nullable|date',
            'due_time' => 'nullable',
            'estimated_minutes' => 'nullable|integer|min:0',
            'is_recurring' => 'nullable|boolean',
            'recurrence_type' => 'nullable|in:daily,weekly,monthly,yearly',
            'recurrence_interval' => 'nullable|integer|min:1',
            'recurrence_end_date' => 'nullable|date',
            'subtasks' => 'nullable|array',
            'subtasks.*.title' => 'required|string|max:255',
            'subtasks.*.order' => 'nullable|integer',
            'dependencies' => 'nullable|array',
            'dependencies.*' => 'exists:tasks,id',
        ]);

        $task->update($validated);

        // Sync tags if provided
        if ($request->has('tags')) {
            $task->tags()->sync($request->tags);
        }

        // Update subtasks if provided
        if ($request->has('subtasks')) {
            // Delete existing subtasks
            $task->subtasks()->delete();
            
            // Create new subtasks
            foreach ($request->subtasks as $index => $subtaskData) {
                $task->subtasks()->create([
                    'title' => $subtaskData['title'],
                    'order' => $subtaskData['order'] ?? $index,
                    'is_completed' => $subtaskData['is_completed'] ?? false,
                ]);
            }
        }

        // Sync dependencies if provided
        if ($request->has('dependencies')) {
            $task->dependencies()->sync($request->dependencies);
        }

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully.');
    }

    /**
     * Toggle task completion status.
     */
    public function toggleComplete(Task $task)
    {
        $this->authorize('update', $task);

        if ($task->status === 'completed') {
            $task->update([
                'status' => 'pending',
                'completed_at' => null,
            ]);
        } else {
            $task->markAsCompleted();
        }

        return back()->with('success', 'Task status updated.');
    }

    /**
     * Display calendar view.
     */
    public function calendar()
    {
        $tasks = Task::where('user_id', auth()->id())
            ->with(['category', 'tags'])
            ->whereNotNull('due_date')
            ->get()
            ->map(function ($task) {
                return [
                    'id' => $task->id,
                    'title' => $task->title,
                    'start' => $task->due_date->toDateString(),
                    'backgroundColor' => $task->category?->color ?? '#3b82f6',
                    'task' => $task,
                ];
            });

        return Inertia::render('tasks/calendar', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Display kanban board view.
     */
    public function kanban()
    {
        $tasks = Task::where('user_id', auth()->id())
            ->with(['category', 'tags', 'subtasks'])
            ->get()
            ->groupBy('status');

        $categories = \App\Models\Category::where('user_id', auth()->id())
            ->orderBy('name')
            ->get();

        return Inertia::render('tasks/kanban', [
            'tasks' => [
                'pending' => $tasks->get('pending', collect()),
                'in_progress' => $tasks->get('in_progress', collect()),
                'completed' => $tasks->get('completed', collect()),
            ],
            'categories' => $categories,
        ]);
    }

    /**
     * Duplicate a task.
     */
    public function duplicate(Task $task)
    {
        $this->authorize('view', $task);

        $newTask = $task->replicate();
        $newTask->title = $task->title . ' (Copy)';
        $newTask->status = 'pending';
        $newTask->completed_at = null;
        $newTask->save();

        // Copy tags
        $newTask->tags()->sync($task->tags->pluck('id'));

        // Copy subtasks
        foreach ($task->subtasks as $subtask) {
            $newSubtask = $subtask->replicate();
            $newSubtask->task_id = $newTask->id;
            $newSubtask->is_completed = false;
            $newSubtask->save();
        }

        return redirect()->route('tasks.edit', $newTask)->with('success', 'Task duplicated successfully.');
    }

    /**
     * Extend task due date.
     */
    public function extendDueDate(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $request->validate([
            'days' => 'required|integer|min:1|max:365',
        ]);

        if ($task->due_date) {
            $task->due_date = now()->parse($task->due_date)->addDays($request->days)->format('Y-m-d');
            $task->save();
        }

        return back()->with('success', "Due date extended by {$request->days} day(s).");
    }
}
