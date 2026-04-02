<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\MenuController;

// ----------------------
// AUTHENTICATION
// ----------------------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

// ----------------------
// RESTAURANTS (PUBLIC)
// ----------------------
Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}/menu', [MenuController::class, 'index']); // Voir menu d'un restaurant

// ----------------------
// ADMIN ONLY (CRUD)
// ----------------------
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {

    // Restaurants CRUD
    Route::post('/restaurants', [RestaurantController::class, 'store']);
    Route::put('/restaurants/{id}', [RestaurantController::class, 'update']);
    Route::delete('/restaurants/{id}', [RestaurantController::class, 'destroy']);

    // Menu CRUD
    Route::post('/menu', [MenuController::class, 'store']);
    Route::put('/menu/{id}', [MenuController::class, 'update']);
    Route::delete('/menu/{id}', [MenuController::class, 'destroy']);
});