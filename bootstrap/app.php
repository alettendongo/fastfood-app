<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // 1. On autorise les requêtes API à ignorer la vérification CSRF (obligatoire pour React)
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);

        // 2. On configure le CORS pour accepter ton frontend React (port 5173)
        // Note : On utilise l'étoile '*' pour le test, c'est le plus simple pour débloquer
        $middleware->statefulApi(); 
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();