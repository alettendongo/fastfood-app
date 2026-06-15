<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller
{
    // 1. CRÉER le restaurant
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'nullable|string|max:20',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:5120', 
        ]);

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('logos', 'public');
        }

        $restaurant = Restaurant::create([
            'user_id' => Auth::id(), 
            'name' => $request->name,
            'address' => $request->address,
            'phone' => $request->phone,
            'description' => $request->description,
            'logo' => $logoPath,
        ]);

        return response()->json([
            'message' => 'Restaurant créé avec succès !',
            'restaurant' => $restaurant
        ], 201);
    }

    // 2. VOIR TOUS les restaurants (Pour les clients)
    public function index()
    {
        $restaurants = Restaurant::all()->map(function ($restaurant) {
            if ($restaurant->logo) {
                $restaurant->logo = asset('storage/' . $restaurant->logo);
            }
            return $restaurant;
        });

        return response()->json($restaurants);
    }

    // 3. VOIR MON restaurant (Pour le gérant connecté)
    public function showMyRestaurant()
    {
        $restaurant = Restaurant::where('user_id', Auth::id())->first();

        if (!$restaurant) {
            return response()->json(['message' => 'Aucun restaurant trouvé'], 404);
        }

        if ($restaurant->logo) {
            $restaurant->logo = asset('storage/' . $restaurant->logo);
        }
        
        return response()->json($restaurant);
    }

    // 4. METTRE À JOUR le restaurant et le logo
    public function update(Request $request)
    {
        $restaurant = Restaurant::where('user_id', Auth::id())->firstOrFail();

        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'nullable|string|max:20',
            'description' => 'nullable|string',
            'logo' => 'nullable|image|max:5120',
        ]);

        // Mise à jour des textes
        $restaurant->name = $request->name;
        $restaurant->address = $request->address;
        $restaurant->phone = $request->phone;
        $restaurant->description = $request->description;

        // Gestion du logo
        if ($request->hasFile('logo')) {
            // Supprimer l'ancien logo du disque s'il existe
            if ($restaurant->logo) {
                Storage::disk('public')->delete($restaurant->logo);
            }
            // Stocker le nouveau
            $restaurant->logo = $request->file('logo')->store('logos', 'public');
        }

        $restaurant->save();

        // On prépare l'URL pour la réponse React
        if ($restaurant->logo) {
            $restaurant->logo = asset('storage/' . $restaurant->logo);
        }

        return response()->json([
            'message' => 'Restaurant mis à jour !',
            'restaurant' => $restaurant
        ]);
    }
}