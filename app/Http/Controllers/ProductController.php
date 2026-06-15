<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * Affiche les produits du restaurant spécifié (Pour le Client)
     */
    public function getRestaurantProducts($restaurant_id)
    {
        $products = Product::where('restaurant_id', $restaurant_id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($product) {
                if ($product->image) {
                    // S'assure que l'URL de l'image est complète pour React
                    $product->image = asset($product->image);
                }
                return $product;
            });

        return response()->json($products);
    }

    /**
     * Liste les produits du restaurant du gérant connecté (Espace Gérant)
     */
    public function index()
    {
        $restaurant = Restaurant::where('user_id', Auth::id())->first();

        if (!$restaurant) {
            return response()->json([]);
        }

        $products = Product::where('restaurant_id', $restaurant->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($product) {
                if ($product->image) {
                    $product->image = asset($product->image);
                }
                return $product;
            });

        return response()->json($products);
    }

    /**
     * Ajouter un nouveau produit
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $restaurant = Restaurant::where('user_id', Auth::id())->first();

        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant non trouvé.'], 403);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            try {
                $file = $request->file('image');
                $fileName = time() . '_' . str_replace([' ', '(', ')'], '_', $file->getClientOriginalName());
                $destinationPath = public_path('products');

                if (!File::exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $fileName);
                $imagePath = 'products/' . $fileName;
            } catch (\Exception $e) {
                return response()->json(['message' => 'Erreur upload : ' . $e->getMessage()], 500);
            }
        }

        $product = Product::create([
            'restaurant_id' => $restaurant->id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'category' => $request->category ?? 'Plat',
            'image' => $imagePath,
        ]);

        return response()->json(['message' => 'Plat ajouté !', 'product' => $product], 201);
    }

    /**
     * Modifier un produit existant
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $restaurant = Restaurant::where('user_id', Auth::id())->first();

        if (!$restaurant || $product->restaurant_id !== $restaurant->id) {
            return response()->json(['message' => 'Action non autorisée'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->category = $request->category;

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image
            if ($product->image) {
                $oldPath = str_replace(asset(''), '', $product->image);
                $oldFilePath = public_path($oldPath);
                if (File::exists($oldFilePath)) {
                    File::delete($oldFilePath);
                }
            }

            $file = $request->file('image');
            $fileName = time() . '_' . str_replace([' ', '(', ')'], '_', $file->getClientOriginalName());
            $file->move(public_path('products'), $fileName);
            $product->image = 'products/' . $fileName;
        }

        $product->save();

        return response()->json(['message' => 'Produit modifié avec succès', 'product' => $product]);
    }

    /**
     * Supprimer un produit
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $restaurant = Restaurant::where('user_id', Auth::id())->first();
        
        if (!$restaurant || $product->restaurant_id !== $restaurant->id) {
            return response()->json(['message' => 'Action non autorisée'], 403);
        }

        if ($product->image) {
            $relativePath = str_replace(asset(''), '', $product->image);
            $filePath = public_path($relativePath);
            
            if (File::exists($filePath)) {
                File::delete($filePath);
            }
        }

        $product->delete();
        return response()->json(['message' => 'Produit supprimé']);
    }
}