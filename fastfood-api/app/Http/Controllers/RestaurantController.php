<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    // Liste tous les restaurants
    public function index()
    {
        return Restaurant::all();
    }

    // Créer un restaurant (ADMIN)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'description' => 'nullable|string'
        ]);

        $restaurant = Restaurant::create($request->all());

        return response()->json($restaurant, 201);
    }

    // Modifier un restaurant (ADMIN)
    public function update(Request $request, $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $restaurant->update($request->all());

        return response()->json($restaurant);
    }

    // Supprimer un restaurant (ADMIN)
    public function destroy($id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $restaurant->delete();

        return response()->json(['message' => 'Restaurant supprimé']);
    }
}
