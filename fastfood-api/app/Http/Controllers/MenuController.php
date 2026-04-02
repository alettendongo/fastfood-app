<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MenuItem;




class MenuController extends Controller
{
    // Lister tous les plats
    public function index()
    {
        return MenuItem::all();
    }

    // Ajouter un plat
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $menuItem = MenuItem::create($request->all());
        return response()->json($menuItem, 201);
    }
}

