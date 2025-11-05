<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Goal extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'target_year',
        'target_value',
        'current_value',
        'unit',
        'status',
        'start_date',
        'target_date',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'target_value' => 'decimal:2',
            'current_value' => 'decimal:2',
            'start_date' => 'date',
            'target_date' => 'date',
            'completed_at' => 'datetime',
        ];
    }

    /**
     * Get the user that owns the goal.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the tasks for the goal.
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Get the milestones for the goal.
     */
    public function milestones(): HasMany
    {
        return $this->hasMany(GoalMilestone::class);
    }

    /**
     * Calculate progress percentage.
     */
    public function getProgressPercentageAttribute(): float
    {
        if ($this->target_value == 0) {
            return 0;
        }
        return min(($this->current_value / $this->target_value) * 100, 100);
    }
}
