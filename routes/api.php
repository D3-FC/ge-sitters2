<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\UserController;

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
Route::post('/users/register', [UserController::class, 'register']);

Route::middleware('auth:api')->group(function () {

    Route::post('/users/update', [UserController::class, 'update']);

    Route::post('/articles/get-paginated', [ArticleController::class, 'getPaginated']);
    Route::post('/articles/create', [ArticleController::class, 'create']);
    Route::post('/articles/destroy', [ArticleController::class, 'destroy']);
});
