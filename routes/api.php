<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes - DÉLICES D'ALETTE
|--------------------------------------------------------------------------
*/

// --- ROUTES PUBLIQUES (Accessibles sans token) ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Cette route doit correspondre EXACTEMENT à ce que React appelle
// On la met en dehors du middleware auth pour que le menu s'affiche même si le token expire
Route::get('/restaurants/{restaurant_id}/products', [ProductController::class, 'getRestaurantProducts']);
Route::get('/restaurants', [RestaurantController::class, 'index']);


// --- ROUTES PROTÉGÉES (Nécessitent d'être connecté) ---
Route::middleware('auth:sanctum')->group(function () {
    
    // --- Authentification ---
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) { return $request->user(); });

    // --- Espace Gérant (Gestion du Restaurant) ---
    Route::get('/my-restaurant', [RestaurantController::class, 'showMyRestaurant']); 
    Route::post('/restaurants', [RestaurantController::class, 'store']); 
    Route::post('/my-restaurant/update', [RestaurantController::class, 'update']); // Utilise POST pour les images

    // --- Gestion des Produits (Le Menu du Gérant) ---
    Route::get('/products', [ProductController::class, 'index']);      
    Route::post('/products', [ProductController::class, 'store']);     
    Route::post('/products/{id}', [ProductController::class, 'update']); // POST au lieu de PUT pour gérer les images Laravel
    Route::delete('/products/{id}', [ProductController::class, 'destroy']); 

    // --- Gestion des Commandes (Espace Gérant) ---
    Route::get('/orders', [OrderController::class, 'index']); 
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);

    // --- Espace Client ---
    // Voir ses propres commandes
    Route::get('/client/orders', [OrderController::class, 'clientOrders']);
    // Passer une nouvelle commande
    Route::post('/orders', [OrderController::class, 'store']);
    // Annuler une commande
    Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
});