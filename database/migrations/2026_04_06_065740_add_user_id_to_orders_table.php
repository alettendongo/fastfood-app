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
        Schema::table('orders', function (Blueprint $table) {
            // On ajoute l'ID de l'utilisateur (le client)
            // after('id') permet de placer la colonne juste après l'ID pour plus de clarté
            $table->foreignId('user_id')->after('id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // On supprime la clé étrangère puis la colonne
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
};