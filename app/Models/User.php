<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Get the tasks for the user.
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Get the goals for the user.
     */
    public function goals()
    {
        return $this->hasMany(Goal::class);
    }

    /**
     * Get the categories for the user.
     */
    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    /**
     * Get the tags for the user.
     */
    public function tags()
    {
        return $this->hasMany(Tag::class);
    }

    /**
     * Get the task templates for the user.
     */
    public function taskTemplates()
    {
        return $this->hasMany(TaskTemplate::class);
    }

    /**
     * Get the time logs for the user.
     */
    public function timeLogs()
    {
        return $this->hasMany(TimeLog::class);
    }
}
