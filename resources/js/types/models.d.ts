export interface Category {
    id: number;
    user_id: number;
    name: string;
    color: string;
    description?: string;
    tasks_count?: number;
    created_at: string;
    updated_at: string;
}

export interface Tag {
    id: number;
    user_id: number;
    name: string;
    color: string;
    created_at: string;
    updated_at: string;
}

export interface Goal {
    id: number;
    user_id: number;
    title: string;
    description?: string;
    target_year: number;
    target_value: number;
    current_value: number;
    unit?: string;
    status: 'in_progress' | 'completed';
    start_date?: string;
    target_date?: string;
    completed_at?: string;
    progress_percentage?: number;
    created_at: string;
    updated_at: string;
}

export interface Subtask {
    id: number;
    task_id: number;
    title: string;
    order: number;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
}

export interface Task {
    id: number;
    user_id: number;
    category_id?: number;
    goal_id?: number;
    title: string;
    description?: string;
    notes?: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in_progress' | 'completed';
    due_date?: string;
    due_time?: string;
    is_recurring: boolean;
    recurrence_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    recurrence_interval?: number;
    recurrence_end_date?: string;
    estimated_minutes?: number;
    completed_at?: string;
    created_at: string;
    updated_at: string;
    
    // Relationships
    category?: Category;
    goal?: Goal;
    tags?: Tag[];
    subtasks?: Subtask[];
    dependencies?: Task[];
    dependents?: Task[];
    attachments?: TaskAttachment[];
}

export interface TaskAttachment {
    id: number;
    task_id: number;
    filename: string;
    file_path: string;
    file_size: number;
    mime_type: string;
    created_at: string;
    updated_at: string;
}

export interface TaskTemplate {
    id: number;
    user_id: number;
    name: string;
    description: string | null;
    priority: 'low' | 'medium' | 'high';
    category_id: number | null;
    estimated_minutes: number | null;
    created_at: string;
    updated_at: string;
}

export interface PaginatedTasks {
    data: Task[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}
