<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $goals = Goal::where('user_id', auth()->id())
            ->with(['milestones', 'tasks'])
            ->withCount('tasks')
            ->latest()
            ->get();

        return Inertia::render('goals/index', [
            'goals' => $goals,
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
            'target_year' => 'required|integer|min:2020|max:2100',
            'target_value' => 'required|numeric|min:0',
            'current_value' => 'nullable|numeric|min:0',
            'unit' => 'nullable|string|max:50',
            'status' => 'required|in:in_progress,completed',
            'start_date' => 'nullable|date',
            'target_date' => 'nullable|date',
        ]);

        $validated['current_value'] = $validated['current_value'] ?? 0;

        auth()->user()->goals()->create($validated);

        return back()->with('success', 'Goal created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Goal $goal)
    {
        if ($goal->user_id !== auth()->id()) {
            abort(403);
        }

        $goal->load(['milestones', 'tasks.category']);

        return Inertia::render('goals/show', [
            'goal' => $goal,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Goal $goal)
    {
        if ($goal->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'target_year' => 'required|integer|min:2020|max:2100',
            'target_value' => 'required|numeric|min:0',
            'current_value' => 'nullable|numeric|min:0',
            'unit' => 'nullable|string|max:50',
            'status' => 'required|in:in_progress,completed',
            'start_date' => 'nullable|date',
            'target_date' => 'nullable|date',
        ]);

        $goal->update($validated);

        return back()->with('success', 'Goal updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Goal $goal)
    {
        if ($goal->user_id !== auth()->id()) {
            abort(403);
        }

        $goal->delete();

        return redirect()->route('goals.index')->with('success', 'Goal deleted successfully.');
    }

    /**
     * Update goal progress.
     */
    public function updateProgress(Request $request, Goal $goal)
    {
        if ($goal->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'current_value' => 'required|numeric|min:0',
        ]);

        $goal->update($validated);

        // Mark as completed if target reached
        if ($goal->current_value >= $goal->target_value && $goal->status !== 'completed') {
            $goal->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);
        }

        return back()->with('success', 'Progress updated successfully.');
    }
}
