<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restaurant extends Model
{
    use HasFactory;

    // 1. Colonnes autorisées à être remplies via le formulaire
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'logo',
        'banner'
    ];

    /**
     * Relation : Un restaurant appartient à un Gérant (User)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation : Un restaurant possède plusieurs Plats (Products)
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}