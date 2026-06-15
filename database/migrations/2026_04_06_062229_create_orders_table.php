<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            // Lien avec le restaurant (clé étrangère)
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade');
            
            // Informations de la commande
            $table->string('client_name'); // Nom du client qui a commandé
            $table->decimal('total', 10, 2); // Montant total (ex: 5500.00)
            $table->string('status')->default('En attente'); // Statut : En attente, En préparation, Livré
            
            // Détails optionnels (ex: adresse de livraison ou téléphone)
            $table->string('delivery_address')->nullable();
            $table->string('client_phone')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};