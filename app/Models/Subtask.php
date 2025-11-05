<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subtask extends Model
{
    protected $fillable = [
        'task_id',
        'title',
        'order',
        'is_completed',
    ];

    protected function casts(): array
    {
        return [
            'is_completed' => 'boolean',
        ];
    }

    /**
     * Get the task that owns the subtask.
     */
    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
