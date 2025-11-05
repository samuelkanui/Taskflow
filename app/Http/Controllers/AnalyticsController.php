<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Goal;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        // Task Status Distribution (for Pie Chart)
        $tasksByStatus = Task::where('user_id', $userId)
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->mapWithKeys(fn($item) => [$item->status => $item->count]);

        // Task Priority Distribution (for Pie Chart)
        $tasksByPriority = Task::where('user_id', $userId)
            ->select('priority', DB::raw('count(*) as count'))
            ->groupBy('priority')
            ->get()
            ->mapWithKeys(fn($item) => [$item->priority => $item->count]);

        // Tasks by Category (for Bar Chart)
        $tasksByCategory = Task::where('tasks.user_id', $userId)
            ->join('categories', 'tasks.category_id', '=', 'categories.id')
            ->select('categories.name', DB::raw('count(*) as count'))
            ->groupBy('categories.name')
            ->get();

        // Tasks Created Over Last 7 Days (for Line Chart)
        $tasksOverTime = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $count = Task::where('user_id', $userId)
                ->whereDate('created_at', $date->format('Y-m-d'))
                ->count();
            
            $tasksOverTime[] = [
                'date' => $date->format('M d'),
                'count' => $count,
            ];
        }

        // Completion Rate Over Last 7 Days (for Line Chart)
        $completionRateOverTime = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $total = Task::where('user_id', $userId)
                ->whereDate('created_at', '<=', $date->format('Y-m-d'))
                ->count();
            
            $completed = Task::where('user_id', $userId)
                ->whereDate('completed_at', '<=', $date->format('Y-m-d'))
                ->count();
            
            $rate = $total > 0 ? round(($completed / $total) * 100, 1) : 0;
            
            $completionRateOverTime[] = [
                'date' => $date->format('M d'),
                'rate' => $rate,
            ];
        }

        // Goal Progress (for Bar Chart)
        $goalProgress = Goal::where('user_id', $userId)
            ->where('status', '!=', 'completed')
            ->get()
            ->map(function ($goal) {
                $percentage = $goal->target_value > 0 
                    ? round(($goal->current_value / $goal->target_value) * 100, 1)
                    : 0;
                
                return [
                    'name' => $goal->title,
                    'progress' => $percentage,
                    'current' => $goal->current_value,
                    'target' => $goal->target_value,
                ];
            });

        // Monthly Task Completion (for Bar Chart)
        $monthlyCompletion = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $completed = Task::where('user_id', $userId)
                ->whereYear('completed_at', $month->year)
                ->whereMonth('completed_at', $month->month)
                ->count();
            
            $monthlyCompletion[] = [
                'month' => $month->format('M Y'),
                'completed' => $completed,
            ];
        }

        // Summary Statistics
        $stats = [
            'totalTasks' => Task::where('user_id', $userId)->count(),
            'completedTasks' => Task::where('user_id', $userId)->where('status', 'completed')->count(),
            'pendingTasks' => Task::where('user_id', $userId)->where('status', 'pending')->count(),
            'inProgressTasks' => Task::where('user_id', $userId)->where('status', 'in_progress')->count(),
            'overdueTasks' => Task::where('user_id', $userId)
                ->where('status', '!=', 'completed')
                ->where('due_date', '<', now())
                ->count(),
            'totalGoals' => Goal::where('user_id', $userId)->count(),
            'completedGoals' => Goal::where('user_id', $userId)->where('status', 'completed')->count(),
        ];

        return Inertia::render('analytics/index', [
            'tasksByStatus' => $tasksByStatus,
            'tasksByPriority' => $tasksByPriority,
            'tasksByCategory' => $tasksByCategory,
            'tasksOverTime' => $tasksOverTime,
            'completionRateOverTime' => $completionRateOverTime,
            'goalProgress' => $goalProgress,
            'monthlyCompletion' => $monthlyCompletion,
            'stats' => $stats,
        ]);
    }
}
