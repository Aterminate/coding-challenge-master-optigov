<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ToDoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::resource("todo", ToDoController::class);
// Route::resource("category", CategoryController::class);

/*****************************************************/
/***              Routes related to category         ***/
/****************************************************/

Route::get('/categories', [CategoryController::class, 'index'])->name('category');