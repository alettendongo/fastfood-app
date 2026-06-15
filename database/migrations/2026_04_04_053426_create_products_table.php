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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            
            // 1. CHANGEMENT ICI : On lie le produit au RESTAURANT (et plus à l'user)
            // Cela permet au client de cliquer sur un resto et voir ses menus.
            $table->foreignId('restaurant_id')->constrained()->onDelete('cascade');
            
            $table->string('name');                   // Nom du plat (ex: Burger Royal)
            $table->text('description')->nullable();  // Ingrédients ou détails
            $table->decimal('price', 10, 2);          // Prix (ex: 4000.00)
            $table->string('image')->nullable();      // Chemin de la photo
            $table->string('category')->default('Plat'); // Entrée, Plat, Boisson
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};