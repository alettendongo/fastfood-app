<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * Les attributs qui peuvent être assignés massivement.
     */
    protected $fillable = [
        'user_id',         // Ajouté pour lier la commande au client
        'restaurant_id',
        'client_name',
        'total',
        'status',
        'delivery_address',
        'client_phone'
    ];

    /**
     * Relation : Une commande appartient à un restaurant.
     */
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    /**
     * Relation : Une commande appartient à un utilisateur (le client).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}