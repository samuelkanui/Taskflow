<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskTemplate extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'priority',
        'category_id',
        'estimated_minutes',
    ];

    /**
     * Get the user that owns the template.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category for the template.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
