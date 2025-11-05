<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TimeLog extends Model
{
    protected $fillable = [
        'user_id',
        'task_id',
        'started_at',
        'ended_at',
        'duration_minutes',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'started_at' => 'datetime',
            'ended_at' => 'datetime',
        ];
    }

    /**
     * Get the user that owns the time log.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the task for the time log.
     */
    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
