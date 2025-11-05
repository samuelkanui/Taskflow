<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;
use Carbon\Carbon;

class GenerateRecurringTasks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tasks:generate-recurring';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate new instances of recurring tasks';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating recurring tasks...');

        // Get all recurring tasks
        $recurringTasks = Task::where('is_recurring', true)
            ->whereNotNull('recurrence_type')
            ->get();

        $generated = 0;

        foreach ($recurringTasks as $task) {
            // Skip if task has an end date and it's passed
            if ($task->recurrence_end_date && Carbon::parse($task->recurrence_end_date)->isPast()) {
                continue;
            }

            // Check if we need to generate next occurrence
            if ($this->shouldGenerateNext($task)) {
                $this->generateNextOccurrence($task);
                $generated++;
            }
        }

        $this->info("Generated {$generated} recurring task(s).");
        return 0;
    }

    /**
     * Check if next occurrence should be generated.
     */
    protected function shouldGenerateNext(Task $task): bool
    {
        if (!$task->due_date) {
            return false;
        }

        $dueDate = Carbon::parse($task->due_date);
        $interval = $task->recurrence_interval ?? 1;

        // Calculate next occurrence date
        $nextDate = match ($task->recurrence_type) {
            'daily' => $dueDate->copy()->addDays($interval),
            'weekly' => $dueDate->copy()->addWeeks($interval),
            'monthly' => $dueDate->copy()->addMonths($interval),
            'yearly' => $dueDate->copy()->addYears($interval),
            default => null,
        };

        if (!$nextDate) {
            return false;
        }

        // Check if next occurrence should be created (if it's today or in the past)
        if ($nextDate->isPast() || $nextDate->isToday()) {
            // Check if next occurrence already exists
            $exists = Task::where('user_id', $task->user_id)
                ->where('title', $task->title)
                ->where('due_date', $nextDate->format('Y-m-d'))
                ->exists();

            return !$exists;
        }

        return false;
    }

    /**
     * Generate next occurrence of recurring task.
     */
    protected function generateNextOccurrence(Task $task): void
    {
        $interval = $task->recurrence_interval ?? 1;
        $dueDate = Carbon::parse($task->due_date);

        $nextDate = match ($task->recurrence_type) {
            'daily' => $dueDate->copy()->addDays($interval),
            'weekly' => $dueDate->copy()->addWeeks($interval),
            'monthly' => $dueDate->copy()->addMonths($interval),
            'yearly' => $dueDate->copy()->addYears($interval),
            default => null,
        };

        if (!$nextDate) {
            return;
        }

        // Create new task instance
        $newTask = $task->replicate();
        $newTask->due_date = $nextDate->format('Y-m-d');
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

        $this->line("Created: {$task->title} for {$nextDate->format('Y-m-d')}");
    }
}
