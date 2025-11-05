<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GoalMilestone extends Model
{
    protected $fillable = [
        'goal_id',
        'quarter',
        'target_value',
        'current_value',
        'status',
        'notes',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'target_value' => 'decimal:2',
            'current_value' => 'decimal:2',
            'completed_at' => 'datetime',
        ];
    }

    /**
     * Get the goal that owns the milestone.
     */
    public function goal(): BelongsTo
    {
        return $this->belongsTo(Goal::class);
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
