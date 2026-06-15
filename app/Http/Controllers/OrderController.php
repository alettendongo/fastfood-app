<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    // --- PARTIE GÉRANT ---

    public function index()
    {
        $restaurant = Restaurant::where('user_id', Auth::id())->first();

        if (!$restaurant) {
            return response()->json([], 200);
        }

        $orders = Order::where('restaurant_id', $restaurant->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|string']);

        $restaurant = Restaurant::where('user_id', Auth::id())->first();

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant non trouvé'], 404);
        }

        $order = Order::where('id', $id)
                      ->where('restaurant_id', $restaurant->id)
                      ->first();

        if (!$order) {
            return response()->json(['message' => 'Commande introuvable'], 403);
        }

        $order->status = $request->status;
        $order->save();

        return response()->json(['message' => 'Statut mis à jour !', 'order' => $order]);
    }

    // --- PARTIE CLIENT ---

    public function clientOrders()
    {
        $orders = Order::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    /**
     * Enregistre une nouvelle commande.
     * Corrigé pour récupérer automatiquement les infos du client connecté.
     */
    public function store(Request $request)
    {
        // 1. Validation simplifiée (on ne demande plus client_name car on l'a via Auth)
        $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'total' => 'required|numeric',
        ]);

        $user = Auth::user(); // Récupère l'utilisateur connecté (Alette Ndongo)

        // 2. Création de la commande avec les infos de l'utilisateur
        $order = Order::create([
            'user_id' => $user->id, 
            'restaurant_id' => $request->restaurant_id,
            'client_name' => $user->name ?? $user->prenom, // Utilise le nom du compte
            'total' => $request->total,
            'status' => 'En attente',
            'client_phone' => $request->client_phone ?? $user->phone ?? '785032471', // Valeur par défaut ou du profil
            'delivery_address' => $request->delivery_address ?? 'Malika / Diamniadio', // Valeur par défaut ou du profil
        ]);

        return response()->json(['message' => 'Commande passée avec succès !', 'order' => $order], 201);
    }

    public function destroy($id)
    {
        $order = Order::where('id', $id)
                      ->where('user_id', Auth::id())
                      ->first();

        if (!$order) {
            return response()->json(['message' => 'Commande introuvable'], 404);
        }

        if ($order->status !== 'En attente') {
            return response()->json(['message' => 'Impossible d\'annuler une commande déjà traitée'], 403);
        }

        $order->delete();
        return response()->json(['message' => 'Commande annulée avec succès']);
    }
}