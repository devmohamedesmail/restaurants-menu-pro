<?php

use App\Http\Controllers\vendor\CategoryController;
use App\Http\Controllers\vendor\MealController;
use App\Http\Controllers\vendor\OrderController;
use App\Http\Controllers\vendor\StoreManagementController;
use App\Http\Controllers\vendor\TableController;
use Illuminate\Support\Facades\Route;


Route::controller(StoreManagementController::class)->group(function () {
    Route::get('/register/store/page', 'register_store_page')->name('register.store.page')->middleware('auth');
    Route::post('/create/store', 'create_store')->name('create.store')->middleware('auth');
    Route::get('/store/update/page/{id}', 'update_store_page')->name('store.update.page')->middleware('auth');
    Route::post('/store/update/{id}', 'update_store')->name('store.update');
    Route::get('/store/menu/{slug}/{store_id}', 'store_menu')->name('store.menu');
});


Route::controller(CategoryController::class)->group(function () {
    Route::post('/store/categories', 'storeCategory')->name('store.category.store')->middleware('auth');
    Route::put('/store/categories/{id}', 'updateCategory')->name('store.category.update')->middleware('auth');
    Route::delete('/store/categories/{id}', 'deleteCategory')->name('store.category.delete')->middleware('auth');
});

Route::controller(MealController::class)->group(function () {
    Route::post('/store/meals', 'storeMeal')->name('store.meal.store')->middleware('auth');
    Route::put('/store/meals/{id}', 'updateMeal')->name('store.meal.update')->middleware('auth');
    Route::delete('/store/meals/{id}', 'deleteMeal')->name('store.meal.delete')->middleware('auth');
});

Route::controller(OrderController::class)->group(function () {
    Route::post('/store/create/order', 'createOrder')->name('store.create.order')->middleware('auth');
    Route::post('/store/order/{id}/status', 'updateOrderStatus')->name('store.order.update.status')->middleware('auth');
});

Route::controller(TableController::class)->group(function () {
    Route::post('/store/tables', 'storeTable')->name('store.table.store');
    Route::put('/store/tables/{id}', 'updateTable')->name('store.table.update');
    Route::delete('/store/tables/{id}', 'deleteTable')->name('store.table.delete');
});
