<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    // 1. Mise à jour du fillable pour inclure le lien vers le restaurant
    protected $fillable = [
        'restaurant_id', // 👈 Indispensable pour lier le plat au resto
        'name',
        'description',
        'price',
        'category',
        'image'
    ];

    /**
     * Relation : Un produit appartient à un Restaurant
     */
    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class);
    }
}