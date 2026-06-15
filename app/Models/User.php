<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Les attributs qui peuvent être assignés massivement.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * Les attributs à masquer pour la sérialisation (JSON).
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Casts des attributs.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * RELATION : Un utilisateur (client) peut avoir plusieurs commandes.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * RELATION : Un utilisateur (gérant) peut avoir un restaurant.
     */
    public function restaurant(): HasOne
    {
        return $this->hasOne(Restaurant::class);
    }
}