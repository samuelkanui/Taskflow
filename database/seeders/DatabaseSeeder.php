<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Goal;
use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create categories
        $work = Category::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Work',
        ], [
            'color' => '#3B82F6',
            'description' => 'Work-related tasks',
        ]);

        $personal = Category::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Personal',
        ], [
            'color' => '#10B981',
            'description' => 'Personal tasks',
        ]);

        $projects = Category::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Projects',
        ], [
            'color' => '#8B5CF6',
            'description' => 'Project tasks',
        ]);

        // Create tags
        $urgent = Tag::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Urgent',
        ], [
            'color' => '#EF4444',
        ]);

        $important = Tag::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Important',
        ], [
            'color' => '#F59E0B',
        ]);

        $learning = Tag::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Learning',
        ], [
            'color' => '#06B6D4',
        ]);

        // Create goals
        $goal1 = Goal::firstOrCreate([
            'user_id' => $user->id,
            'title' => 'Complete 50 Tasks',
        ], [
            'description' => 'Complete at least 50 tasks this year',
            'target_year' => now()->year,
            'target_value' => 50,
            'current_value' => 0,
            'unit' => 'tasks',
            'status' => 'in_progress',
            'start_date' => now()->startOfYear(),
            'target_date' => now()->endOfYear(),
        ]);

        $goal2 = Goal::firstOrCreate([
            'user_id' => $user->id,
            'title' => 'Learn New Skills',
        ], [
            'description' => 'Complete 10 learning projects',
            'target_year' => now()->year,
            'target_value' => 10,
            'current_value' => 0,
            'unit' => 'projects',
            'status' => 'in_progress',
            'start_date' => now()->startOfYear(),
            'target_date' => now()->endOfYear(),
        ]);

        // Create sample tasks
        $task1 = Task::firstOrCreate([
            'user_id' => $user->id,
            'title' => 'Review project documentation',
        ], [
            'description' => 'Review and update the project documentation for clarity',
            'priority' => 'high',
            'status' => 'pending',
            'category_id' => $work->id,
            'goal_id' => $goal1->id,
            'due_date' => now()->addDays(2),
            'estimated_minutes' => 60,
        ]);
        $task1->tags()->sync([$urgent->id, $important->id]);

        $task2 = Task::firstOrCreate([
            'user_id' => $user->id,
            'title' => 'Plan weekly tasks',
        ], [
            'description' => 'Plan out all tasks for the upcoming week',
            'priority' => 'medium',
            'status' => 'pending',
            'category_id' => $personal->id,
            'due_date' => now()->addDay(),
            'estimated_minutes' => 30,
            'is_recurring' => true,
            'recurrence_type' => 'weekly',
            'recurrence_interval' => 1,
        ]);
        $task2->tags()->sync([$important->id]);

        $task3 = Task::firstOrCreate([
            'user_id' => $user->id,
            'title' => 'Learn Laravel best practices',
        ], [
            'description' => 'Study Laravel documentation and best practices',
            'priority' => 'medium',
            'status' => 'in_progress',
            'category_id' => $projects->id,
            'goal_id' => $goal2->id,
            'due_date' => now()->addDays(5),
            'estimated_minutes' => 120,
        ]);
        $task3->tags()->sync([$learning->id]);

        // Add subtasks to task3
        $task3->subtasks()->createMany([
            ['title' => 'Read Eloquent documentation', 'order' => 1, 'is_completed' => true],
            ['title' => 'Practice with migrations', 'order' => 2, 'is_completed' => false],
            ['title' => 'Build sample project', 'order' => 3, 'is_completed' => false],
        ]);

        $task4 = Task::firstOrCreate([
            'user_id' => $user->id,
            'title' => 'Complete code review',
        ], [
            'description' => 'Review pull requests and provide feedback',
            'priority' => 'high',
            'status' => 'completed',
            'category_id' => $work->id,
            'goal_id' => $goal1->id,
            'due_date' => now()->subDays(1),
            'completed_at' => now()->subDays(1),
            'estimated_minutes' => 45,
        ]);
        $task4->tags()->sync([$important->id]);

        $task5 = Task::firstOrCreate([
            'user_id' => $user->id,
            'title' => 'Update dependencies',
        ], [
            'description' => 'Update all project dependencies to latest versions',
            'priority' => 'low',
            'status' => 'pending',
            'category_id' => $projects->id,
            'due_date' => now()->addWeek(),
            'estimated_minutes' => 90,
        ]);

        // Add more categories
        $health = Category::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Health',
        ], [
            'color' => '#EC4899',
            'description' => 'Health and fitness tasks',
        ]);

        $finance = Category::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Finance',
        ], [
            'color' => '#F59E0B',
            'description' => 'Financial tasks',
        ]);

        $home = Category::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Home',
        ], [
            'color' => '#14B8A6',
            'description' => 'Home and family tasks',
        ]);

        // Add more tags
        $bug = Tag::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Bug',
        ], [
            'color' => '#DC2626',
        ]);

        $feature = Tag::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Feature',
        ], [
            'color' => '#7C3AED',
        ]);

        $review = Tag::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Review',
        ], [
            'color' => '#0891B2',
        ]);

        $meeting = Tag::firstOrCreate([
            'user_id' => $user->id,
            'name' => 'Meeting',
        ], [
            'color' => '#EA580C',
        ]);

        // Add more goals
        $goal3 = Goal::firstOrCreate([
            'user_id' => $user->id,
            'title' => 'Improve Health',
        ], [
            'description' => 'Exercise 100 times this year',
            'target_year' => now()->year,
            'target_value' => 100,
            'current_value' => 15,
            'unit' => 'sessions',
            'status' => 'in_progress',
            'start_date' => now()->startOfYear(),
            'target_date' => now()->endOfYear(),
        ]);

        // Create many more tasks for testing - spanning 6 months
        $additionalTasks = [
            // === COMPLETED TASKS - 3 MONTHS AGO ===
            [
                'title' => 'Q2 Planning Meeting',
                'description' => 'Plan Q2 objectives and key results',
                'priority' => 'high',
                'status' => 'completed',
                'category_id' => $work->id,
                'goal_id' => $goal1->id,
                'due_date' => now()->subMonths(3)->startOfMonth(),
                'completed_at' => now()->subMonths(3)->startOfMonth(),
                'estimated_minutes' => 120,
                'tags' => [$important->id, $meeting->id],
            ],
            [
                'title' => 'Spring cleaning',
                'description' => 'Deep clean entire house',
                'priority' => 'medium',
                'status' => 'completed',
                'category_id' => $home->id,
                'due_date' => now()->subMonths(3)->addDays(5),
                'completed_at' => now()->subMonths(3)->addDays(5),
                'estimated_minutes' => 240,
                'tags' => [],
            ],
            [
                'title' => 'Setup CI/CD Pipeline',
                'description' => 'Configure automated deployment pipeline',
                'priority' => 'high',
                'status' => 'completed',
                'category_id' => $work->id,
                'due_date' => now()->subMonths(3)->addDays(10),
                'completed_at' => now()->subMonths(3)->addDays(10),
                'estimated_minutes' => 180,
                'tags' => [$important->id, $feature->id],
            ],
            
            // === COMPLETED TASKS - 2.5 MONTHS AGO ===
            [
                'title' => 'Annual health checkup completed',
                'description' => 'Complete annual physical examination',
                'priority' => 'medium',
                'status' => 'completed',
                'category_id' => $health->id,
                'goal_id' => $goal3->id,
                'due_date' => now()->subMonths(2)->subWeeks(2),
                'completed_at' => now()->subMonths(2)->subWeeks(2),
                'estimated_minutes' => 90,
                'tags' => [$important->id],
            ],
            [
                'title' => 'Migrate legacy database',
                'description' => 'Migrate old database to new schema',
                'priority' => 'high',
                'status' => 'completed',
                'category_id' => $work->id,
                'due_date' => now()->subMonths(2)->subWeeks(2)->addDays(3),
                'completed_at' => now()->subMonths(2)->subWeeks(2)->addDays(3),
                'estimated_minutes' => 360,
                'tags' => [$important->id],
            ],
            
            // === COMPLETED TASKS - 2 MONTHS AGO ===
            [
                'title' => 'File Q2 taxes',
                'description' => 'Complete quarterly tax filing',
                'priority' => 'high',
                'status' => 'completed',
                'category_id' => $finance->id,
                'due_date' => now()->subMonths(2),
                'completed_at' => now()->subMonths(2),
                'estimated_minutes' => 120,
                'tags' => [$important->id],
            ],
            [
                'title' => 'Summer fitness program start',
                'description' => 'Begin 12-week fitness program',
                'priority' => 'medium',
                'status' => 'completed',
                'category_id' => $health->id,
                'goal_id' => $goal3->id,
                'due_date' => now()->subMonths(2)->addDays(7),
                'completed_at' => now()->subMonths(2)->addDays(7),
                'estimated_minutes' => 60,
                'tags' => [],
            ],
            [
                'title' => 'Client demo presentation',
                'description' => 'Present new features to client',
                'priority' => 'high',
                'status' => 'completed',
                'category_id' => $work->id,
                'due_date' => now()->subMonths(2)->addDays(15),
                'completed_at' => now()->subMonths(2)->addDays(15),
                'estimated_minutes' => 90,
                'tags' => [$important->id, $meeting->id],
            ],
            
            // === COMPLETED TASKS - 1.5 MONTHS AGO ===
            [
                'title' => 'Refactor authentication system',
                'description' => 'Improve security and code quality',
                'priority' => 'high',
                'status' => 'completed',
                'category_id' => $work->id,
                'due_date' => now()->subMonths(1)->subWeeks(2),
                'completed_at' => now()->subMonths(1)->subWeeks(2),
                'estimated_minutes' => 240,
                'tags' => [$feature->id],
            ],
            [
                'title' => 'Home insurance renewal',
                'description' => 'Review and renew home insurance policy',
                'priority' => 'medium',
                'status' => 'completed',
                'category_id' => $finance->id,
                'due_date' => now()->subMonths(1)->subWeeks(2)->addDays(5),
                'completed_at' => now()->subMonths(1)->subWeeks(2)->addDays(5),
                'estimated_minutes' => 45,
                'tags' => [$important->id],
            ],
            
            // === COMPLETED TASKS - 1 MONTH AGO ===
            [
                'title' => 'Database backup',
                'description' => 'Monthly production database backup',
                'priority' => 'high',
                'status' => 'completed',
                'category_id' => $work->id,
                'due_date' => now()->subMonth(),
                'completed_at' => now()->subMonth(),
                'estimated_minutes' => 30,
                'tags' => [$important->id],
            ],
            [
                'title' => 'Team building event',
                'description' => 'Organize quarterly team building activity',
                'priority' => 'medium',
                'status' => 'completed',
                'category_id' => $work->id,
                'due_date' => now()->subMonth()->addDays(10),
                'completed_at' => now()->subMonth()->addDays(10),
                'estimated_minutes' => 180,
                'tags' => [$meeting->id],
            ],
            
            // === COMPLETED TASKS - 2 WEEKS AGO ===
            [
                'title' => 'Deploy v2.0 to production',
                'description' => 'Deploy major version update',
                'priority' => 'high',
                'status' => 'completed',
                'category_id' => $work->id,
                'due_date' => now()->subWeeks(2),
                'completed_at' => now()->subWeeks(2),
                'estimated_minutes' => 45,
                'tags' => [$important->id],
            ],
            [
                'title' => 'Gym workout session',
                'description' => 'Cardio and strength training',
                'priority' => 'medium',
                'status' => 'completed',
                'category_id' => $health->id,
                'goal_id' => $goal3->id,
                'due_date' => now()->subWeek(),
                'completed_at' => now()->subWeek(),
                'estimated_minutes' => 60,
                'is_recurring' => true,
                'recurrence_type' => 'weekly',
                'recurrence_interval' => 3,
                'tags' => [],
            ],
            
            // === CURRENT WEEK - IN PROGRESS & PENDING ===
            [
                'title' => 'Design new landing page',
                'description' => 'Create mockups for the new landing page',
                'priority' => 'high',
                'status' => 'in_progress',
                'category_id' => $work->id,
                'goal_id' => $goal1->id,
                'due_date' => now()->addDays(3),
                'estimated_minutes' => 180,
                'tags' => [$important->id, $feature->id],
            ],
            [
                'title' => 'Fix login bug',
                'description' => 'Users report login issues on mobile devices',
                'priority' => 'high',
                'status' => 'pending',
                'category_id' => $work->id,
                'due_date' => now()->addDay(),
                'estimated_minutes' => 90,
                'tags' => [$urgent->id, $bug->id],
            ],
            [
                'title' => 'Team standup meeting',
                'description' => 'Daily standup with development team',
                'priority' => 'medium',
                'status' => 'pending',
                'category_id' => $work->id,
                'due_date' => now()->addDay(),
                'due_time' => '09:00',
                'estimated_minutes' => 15,
                'is_recurring' => true,
                'recurrence_type' => 'daily',
                'recurrence_interval' => 1,
                'tags' => [$meeting->id],
            ],
            [
                'title' => 'Grocery shopping',
                'description' => 'Weekly grocery shopping',
                'priority' => 'medium',
                'status' => 'pending',
                'category_id' => $personal->id,
                'due_date' => now()->addDays(2),
                'estimated_minutes' => 60,
                'tags' => [],
            ],
            [
                'title' => 'Write blog post',
                'description' => 'Write about Laravel best practices',
                'priority' => 'medium',
                'status' => 'in_progress',
                'category_id' => $projects->id,
                'goal_id' => $goal2->id,
                'due_date' => now()->addDays(4),
                'estimated_minutes' => 120,
                'tags' => [$learning->id],
            ],
            
            // === NEXT 2 WEEKS ===
            [
                'title' => 'Pay electricity bill',
                'description' => 'Monthly electricity payment',
                'priority' => 'high',
                'status' => 'pending',
                'category_id' => $finance->id,
                'due_date' => now()->addDays(5),
                'estimated_minutes' => 10,
                'is_recurring' => true,
                'recurrence_type' => 'monthly',
                'recurrence_interval' => 1,
                'tags' => [$important->id],
            ],
            [
                'title' => 'Client progress review',
                'description' => 'Present monthly progress to client',
                'priority' => 'high',
                'status' => 'pending',
                'category_id' => $work->id,
                'due_date' => now()->addDays(7),
                'estimated_minutes' => 60,
                'tags' => [$important->id, $meeting->id],
            ],
            [
                'title' => 'Security audit',
                'description' => 'Perform quarterly security audit',
                'priority' => 'high',
                'status' => 'pending',
                'category_id' => $work->id,
                'due_date' => now()->addDays(8),
                'estimated_minutes' => 240,
                'tags' => [$important->id],
            ],
            [
                'title' => 'Code review for PR #123',
                'description' => 'Review pull request from team member',
                'priority' => 'medium',
                'status' => 'pending',
                'category_id' => $work->id,
                'due_date' => now()->addDays(10),
                'estimated_minutes' => 30,
                'tags' => [$review->id],
            ],
            [
                'title' => 'Clean garage',
                'description' => 'Organize and clean the garage',
                'priority' => 'low',
                'status' => 'pending',
                'category_id' => $home->id,
                'due_date' => now()->addWeeks(2),
                'estimated_minutes' => 120,
                'tags' => [],
            ],
            
            // === NEXT MONTH (1-2 MONTHS) ===
            [
                'title' => 'Refactor authentication module',
                'description' => 'Improve code quality and add tests',
                'priority' => 'medium',
                'status' => 'pending',
                'category_id' => $projects->id,
                'due_date' => now()->addMonth(),
                'estimated_minutes' => 240,
                'tags' => [$feature->id],
            ],
            [
                'title' => 'Update portfolio website',
                'description' => 'Add recent projects to portfolio',
                'priority' => 'low',
                'status' => 'pending',
                'category_id' => $projects->id,
                'due_date' => now()->addMonth()->addDays(5),
                'estimated_minutes' => 180,
                'tags' => [],
            ],
            [
                'title' => 'Meal prep routine',
                'description' => 'Setup weekly meal prep schedule',
                'priority' => 'medium',
                'status' => 'pending',
                'category_id' => $personal->id,
                'due_date' => now()->addMonth()->addDays(10),
                'estimated_minutes' => 120,
                'is_recurring' => true,
                'recurrence_type' => 'weekly',
                'recurrence_interval' => 1,
                'tags' => [],
            ],
            [
                'title' => 'Fix kitchen sink',
                'description' => 'Repair leaking kitchen faucet',
                'priority' => 'medium',
                'status' => 'pending',
                'category_id' => $home->id,
                'due_date' => now()->addMonth()->addDays(15),
                'estimated_minutes' => 90,
                'tags' => [],
            ],
            [
                'title' => 'Quarterly review meeting',
                'description' => 'Team performance review',
                'priority' => 'high',
                'status' => 'pending',
                'category_id' => $work->id,
                'due_date' => now()->addMonth()->addDays(20),
                'estimated_minutes' => 90,
                'tags' => [$important->id, $meeting->id],
            ],
            
            // === 2 MONTHS AHEAD ===
            [
                'title' => 'Annual health checkup',
                'description' => 'Schedule and attend annual physical exam',
                'priority' => 'medium',
                'status' => 'pending',
                'category_id' => $health->id,
                'due_date' => now()->addMonths(2),
                'estimated_minutes' => 90,
                'tags' => [$important->id],
            ],
            [
                'title' => 'Tax preparation',
                'description' => 'Gather documents for quarterly tax filing',
                'priority' => 'high',
                'status' => 'pending',
                'category_id' => $finance->id,
                'due_date' => now()->addMonths(2)->addDays(10),
                'estimated_minutes' => 180,
                'tags' => [$important->id],
            ],
            [
                'title' => 'Read technical book',
                'description' => 'Read "Clean Code" by Robert Martin',
                'priority' => 'low',
                'status' => 'pending',
                'category_id' => $personal->id,
                'goal_id' => $goal2->id,
                'due_date' => now()->addMonths(2)->addDays(15),
                'estimated_minutes' => 600,
                'tags' => [$learning->id],
            ],
            [
                'title' => 'Backend API redesign',
                'description' => 'Redesign REST API for better performance',
                'priority' => 'medium',
                'status' => 'pending',
                'category_id' => $projects->id,
                'due_date' => now()->addMonths(2)->addDays(20),
                'estimated_minutes' => 480,
                'tags' => [$feature->id],
            ],
            
            // === 3 MONTHS AHEAD ===
            [
                'title' => 'Q4 planning session',
                'description' => 'Plan Q4 objectives and key results',
                'priority' => 'high',
                'status' => 'pending',
                'category_id' => $work->id,
                'goal_id' => $goal1->id,
                'due_date' => now()->addMonths(3),
                'estimated_minutes' => 180,
                'tags' => [$important->id, $meeting->id],
            ],
            [
                'title' => 'Home maintenance check',
                'description' => 'Quarterly home maintenance inspection',
                'priority' => 'medium',
                'status' => 'pending',
                'category_id' => $home->id,
                'due_date' => now()->addMonths(3)->addDays(7),
                'estimated_minutes' => 120,
                'tags' => [],
            ],
            [
                'title' => 'Implement dark mode',
                'description' => 'Add dark mode support to application',
                'priority' => 'medium',
                'status' => 'pending',
                'category_id' => $projects->id,
                'due_date' => now()->addMonths(3)->addDays(15),
                'estimated_minutes' => 360,
                'tags' => [$feature->id],
            ],
            [
                'title' => 'Investment portfolio review',
                'description' => 'Review and rebalance investment portfolio',
                'priority' => 'medium',
                'status' => 'pending',
                'category_id' => $finance->id,
                'due_date' => now()->addMonths(3)->addDays(20),
                'estimated_minutes' => 90,
                'tags' => [$important->id],
            ],
            
            // === OVERDUE TASK (FOR TESTING) ===
            [
                'title' => 'Overdue task example',
                'description' => 'This task is overdue for testing alerts',
                'priority' => 'high',
                'status' => 'pending',
                'category_id' => $work->id,
                'due_date' => now()->subDays(5),
                'estimated_minutes' => 60,
                'tags' => [$urgent->id],
            ],
        ];

        foreach ($additionalTasks as $taskData) {
            $tags = $taskData['tags'] ?? [];
            unset($taskData['tags']);

            $task = Task::firstOrCreate([
                'user_id' => $user->id,
                'title' => $taskData['title'],
            ], $taskData);

            if (!empty($tags)) {
                $task->tags()->sync($tags);
            }
        }

        // Create task templates
        $templates = [
            [
                'name' => 'Bug Fix Template',
                'description' => 'Standard template for fixing bugs',
                'priority' => 'high',
                'estimated_minutes' => 60,
                'category_id' => $work->id,
            ],
            [
                'name' => 'Client Meeting',
                'description' => 'Template for client meetings',
                'priority' => 'medium',
                'estimated_minutes' => 60,
                'category_id' => $work->id,
            ],
            [
                'name' => 'Weekly Review',
                'description' => 'Weekly task and goal review',
                'priority' => 'medium',
                'estimated_minutes' => 30,
                'category_id' => $personal->id,
            ],
            [
                'name' => 'Code Review',
                'description' => 'Review team member code',
                'priority' => 'medium',
                'estimated_minutes' => 45,
                'category_id' => $work->id,
            ],
        ];

        foreach ($templates as $templateData) {
            \App\Models\TaskTemplate::firstOrCreate([
                'user_id' => $user->id,
                'name' => $templateData['name'],
            ], $templateData);
        }

        $this->command->info('Sample data created successfully!');
        $this->command->info('');
        $this->command->info('📊 Data Summary:');
        $this->command->info('- User: 1');
        $this->command->info('- Categories: ' . Category::where('user_id', $user->id)->count());
        $this->command->info('- Tags: ' . Tag::where('user_id', $user->id)->count());
        $this->command->info('- Goals: ' . Goal::where('user_id', $user->id)->count());
        $this->command->info('- Tasks: ' . Task::where('user_id', $user->id)->count());
        $this->command->info('- Templates: ' . \App\Models\TaskTemplate::where('user_id', $user->id)->count());
        $this->command->info('');
        $this->command->info('🔑 Login Credentials:');
        $this->command->info('Email: test@example.com');
        $this->command->info('Password: password');
    }
}
