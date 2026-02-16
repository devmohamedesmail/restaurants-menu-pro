<?php

use App\Http\Controllers\admin\BannersController;
use App\Http\Controllers\admin\CountryController;
use App\Http\Controllers\admin\RoleController;
use App\Http\Controllers\admin\SettingController;
use App\Http\Controllers\admin\StoresController;
use App\Http\Controllers\admin\UsersController;
use App\Http\Controllers\vendor\CategoryController;
use App\Http\Controllers\vendor\CreateStore;
use App\Http\Controllers\vendor\MealController;
use App\Http\Controllers\vendor\OrderController;
use App\Http\Controllers\vendor\TableController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('index', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

 Route::get('dashboard', [CreateStore::class, 'redirect_to_dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
// Route::get('dashboard', function () {
//     return Inertia::render('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';






Route::controller(SettingController::class)->group(function () {
    Route::get('/admin/settings', 'settings')->name('settings');
    Route::post('/admin/settings/update', 'update_settings')->name('update.settings');
});



Route::controller(CountryController::class)->group(function () {
    Route::get('/admin/countries', 'index')->name('countries.page');
    Route::post('/admin/store/country', 'store')->name('country.store');
    Route::get('/admin/edit/country/{id}', 'edit')->name('country.edit');
    Route::post('/admin/update/country/{id}', 'update')->name('country.update');
    Route::get('/admin/delete/country/{id}', 'delete')->name('country.delete');
});


Route::controller(UsersController::class)->group(function () {
    Route::get('/admin/users', 'show_users')->name('users.page');
    Route::post('/admin/users/update/{id}', 'update')->name('admin.users.update');
    Route::get('/admin/users/delete/{id}', 'delete')->name('admin.users.delete');
});


Route::controller(RoleController::class)->group(function () {
    Route::get('/admin/roles', 'index')->name('roles.page');
    Route::post('/admin/roles', 'store')->name('roles.store');
    Route::post('/admin/roles/{id}', 'update')->name('roles.update');
    Route::get('/admin/roles/{id}/delete', 'destroy')->name('roles.delete');
});



Route::controller(BannersController::class)->group(function () {
    Route::get('/admin/banners', 'index')->name('banners.page');
    Route::post('/admin/store/banner', 'store')->name('banner.store');
    Route::get('/admin/edit/banner/{id}', 'edit')->name('banner.edit');
    Route::post('/admin/update/banner/{id}', 'update')->name('banner.update');
    Route::get('/admin/delete/banner/{id}', 'delete')->name('banner.delete');
});



Route::controller(StoresController::class)->group(function () {
    Route::get('/admin/stores', 'index')->name('stores.page');
    Route::post('/admin/store/store', 'store')->name('store.store');
    Route::post('/admin/update/store/{id}', 'update')->name('store.update');
    Route::post('/admin/store/toggle-status/{id}', 'toggleStatus')->name('store.toggle-status');
    Route::get('/admin/delete/store/{id}', 'delete')->name('store.delete');
});



// ====================================================================================


Route::controller(CreateStore::class)->group(function () {
    // Route::get('/store/home/{store_name?}/{store_id?}/{table?}', 'store_home')->name('store.home');
    Route::get('/register/store', 'index')->name('register.store.page');
    Route::post('/register/store', 'register_store')->name('create.store');
    Route::get('/store/dashboard', 'store_dashboard')->name('store.dashboard');

    // Get dashboard data (categories, meals, stats)
    Route::get('/store/dashboard/data', 'getDashboardData')->name('store.dashboard.data');

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











