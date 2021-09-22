<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TravelsController;
use App\Http\Controllers\RestourantsController;
use App\Http\Controllers\FilmsController;

use App\Models\Travel;
use App\Models\Restaurant;
use App\Models\Film;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Endpoints for Travel table
Route::get('/travels', [TravelsController::class, 'index']);
Route::get('/travels/{id}', [FIlmsController::class, 'row']);
Route::post('/travels', [TravelsController::class, 'store']);
Route::put('/travels/{travel}', [TravelsController::class, 'update']);
Route::delete('/travels/{travel}', [TravelsController::class, 'destroy']);

// Endpoints for Resourants table
Route::get('/restourants', [RestourantsController::class, 'index']);
Route::get('/restourants/{id}', [FIlmsController::class, 'row']);
Route::post('/restourants', [RestourantsController::class, 'store']);
Route::put('/restourants/{restourant}', [RestourantsController::class, 'update']);
Route::delete('/restourants/{restourant}', [RestourantsController::class, 'destroy']);

// Endpoints for Film table
Route::get('/films', [FilmsController::class, 'index']);
Route::get('/films/{id}', [FIlmsController::class, 'row']);
Route::post('/films', [FilmsController::class, 'store']);
Route::put('/films/{film}', [FilmsController::class, 'update']);
Route::delete('/films/{film}', [FilmsController::class, 'destroy']);


