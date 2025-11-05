<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        
        // Task statistics
        $totalTasks = $user->tasks()->count();
        $completedTasks = $user->tasks()->where('status', 'completed')->count();
        $pendingTasks = $user->tasks()->where('status', 'pending')->count();
        $inProgressTasks = $user->tasks()->where('status', 'in_progress')->count();
        $overdueTasks = $user->tasks()
            ->where('status', '!=', 'completed')
            ->where('due_date', '<', now())
            ->count();
        
        // Goals statistics
        $totalGoals = $user->goals()->count();
        $completedGoals = $user->goals()->where('status', 'completed')->count();
        $activeGoals = $user->goals()->where('status', 'in_progress')->count();
        
        // Category & Tag counts
        $totalCategories = $user->categories()->count();
        $totalTags = $user->tags()->count();
        
        // Completion rate
        $completionRate = $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0;
        
        // Upcoming tasks (next 7 days)
        $upcomingTasks = $user->tasks()
            ->with(['category', 'tags'])
            ->where('status', '!=', 'completed')
            ->whereBetween('due_date', [now(), now()->addDays(7)])
            ->orderBy('due_date')
            ->limit(5)
            ->get();
        
        return Inertia::render('dashboard', [
            'stats' => [
                'totalTasks' => $totalTasks,
                'completedTasks' => $completedTasks,
                'pendingTasks' => $pendingTasks,
                'inProgressTasks' => $inProgressTasks,
                'overdueTasks' => $overdueTasks,
                'totalGoals' => $totalGoals,
                'completedGoals' => $completedGoals,
                'activeGoals' => $activeGoals,
                'totalCategories' => $totalCategories,
                'totalTags' => $totalTags,
                'completionRate' => $completionRate,
            ],
            'upcomingTasks' => $upcomingTasks,
        ]);
    })->name('dashboard');

    // Task routes
    Route::resource('tasks', \App\Http\Controllers\TaskController::class);
    Route::post('tasks/{task}/toggle-complete', [\App\Http\Controllers\TaskController::class, 'toggleComplete'])->name('tasks.toggle-complete');
    Route::post('tasks/{task}/duplicate', [\App\Http\Controllers\TaskController::class, 'duplicate'])->name('tasks.duplicate');
    Route::post('tasks/{task}/extend-due-date', [\App\Http\Controllers\TaskController::class, 'extendDueDate'])->name('tasks.extend-due-date');
    Route::get('tasks-calendar', [\App\Http\Controllers\TaskController::class, 'calendar'])->name('tasks.calendar');
    Route::get('tasks-kanban', [\App\Http\Controllers\TaskController::class, 'kanban'])->name('tasks.kanban');

    // Goal routes
    Route::resource('goals', \App\Http\Controllers\GoalController::class);
    Route::post('goals/{goal}/update-progress', [\App\Http\Controllers\GoalController::class, 'updateProgress'])->name('goals.update-progress');

    // Category routes
    Route::resource('categories', \App\Http\Controllers\CategoryController::class);

    // Tag routes
    Route::resource('tags', \App\Http\Controllers\TagController::class);

    // Attachment routes
    Route::post('tasks/{task}/attachments', [\App\Http\Controllers\AttachmentController::class, 'store'])->name('attachments.store');
    Route::get('attachments/{attachment}/download', [\App\Http\Controllers\AttachmentController::class, 'download'])->name('attachments.download');
    Route::delete('attachments/{attachment}', [\App\Http\Controllers\AttachmentController::class, 'destroy'])->name('attachments.destroy');

    // Template routes
    Route::resource('templates', \App\Http\Controllers\TemplateController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::post('templates/{template}/create-task', [\App\Http\Controllers\TemplateController::class, 'createFromTemplate'])->name('templates.create-task');
    Route::post('tasks/{task}/create-template', [\App\Http\Controllers\TemplateController::class, 'createFromTask'])->name('tasks.create-template');

    // Analytics route
    Route::get('analytics', [\App\Http\Controllers\AnalyticsController::class, 'index'])->name('analytics.index');

    // Guide route
    Route::get('guide', function () {
        return inertia('guide/index');
    })->name('guide.index');
});

require __DIR__.'/settings.php';
