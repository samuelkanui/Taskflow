<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Task;
use App\Models\TaskTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    /**
     * Display a listing of templates.
     */
    public function index()
    {
        $templates = TaskTemplate::where('user_id', auth()->id())
            ->with('category')
            ->latest()
            ->get();

        return Inertia::render('templates/index', [
            'templates' => $templates,
            'categories' => Category::where('user_id', auth()->id())->get(),
        ]);
    }

    /**
     * Store a newly created template.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'category_id' => 'nullable|exists:categories,id',
            'estimated_minutes' => 'nullable|integer|min:0',
        ]);

        auth()->user()->templates()->create($validated);

        return back()->with('success', 'Template created successfully.');
    }

    /**
     * Update the specified template.
     */
    public function update(Request $request, TaskTemplate $template)
    {
        // Check ownership
        if ($template->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'category_id' => 'nullable|exists:categories,id',
            'estimated_minutes' => 'nullable|integer|min:0',
        ]);

        $template->update($validated);

        return back()->with('success', 'Template updated successfully.');
    }

    /**
     * Remove the specified template.
     */
    public function destroy(TaskTemplate $template)
    {
        // Check ownership
        if ($template->user_id !== auth()->id()) {
            abort(403);
        }

        $template->delete();

        return back()->with('success', 'Template deleted successfully.');
    }

    /**
     * Create a task from template.
     */
    public function createFromTemplate(TaskTemplate $template)
    {
        // Check ownership
        if ($template->user_id !== auth()->id()) {
            abort(403);
        }

        $task = auth()->user()->tasks()->create([
            'title' => $template->name,
            'description' => $template->description,
            'priority' => $template->priority,
            'status' => 'pending',
            'category_id' => $template->category_id,
            'estimated_minutes' => $template->estimated_minutes,
        ]);

        return redirect()->route('tasks.edit', $task)->with('success', 'Task created from template.');
    }

    /**
     * Create template from existing task.
     */
    public function createFromTask(Task $task)
    {
        // Check ownership
        if ($task->user_id !== auth()->id()) {
            abort(403);
        }

        auth()->user()->templates()->create([
            'name' => $task->title,
            'description' => $task->description,
            'priority' => $task->priority,
            'category_id' => $task->category_id,
            'estimated_minutes' => $task->estimated_minutes,
        ]);

        return back()->with('success', 'Template created from task.');
    }
}
