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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            
            // 1. LIEN AVEC L'UTILISATEUR (Le Gérant)
            // Très important : c'est ce qui définit qui possède le resto
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->string('name');             // Nom du restaurant
            $table->string('address');          // Adresse physique
            $table->string('logo')->nullable(); // Chemin du logo (ex: logos/monresto.png)
            
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->text('description')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};