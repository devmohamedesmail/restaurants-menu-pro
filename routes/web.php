<?php

use App\Http\Controllers\admin\setting_controller;
use App\Http\Controllers\admin\country_controller;
use App\Http\Controllers\admin\users_controller;
use App\Http\Controllers\admin\banners_controller;
use App\Http\Controllers\vendor\create_store;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('index', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/settings.php';






Route::controller(setting_controller::class)->group(function () {
    Route::get('/admin/settings', 'settings')->name('settings');
    Route::post('/admin/settings/update', 'update_settings')->name('update.settings');
});



Route::controller(country_controller::class)->group(function () {
    Route::get('/admin/countries', 'index')->name('countries.page');
    Route::post('/admin/store/country', 'store')->name('country.store');
    Route::get('/admin/edit/country/{id}', 'edit')->name('country.edit');
    Route::post('/admin/update/country/{id}', 'update')->name('country.update');
    Route::get('/admin/delete/country/{id}', 'delete')->name('country.delete');
});


Route::controller(users_controller::class)->group(function () {
    Route::get('/admin/users', 'show_users')->name('users.page');
    Route::post('/admin/users/update/{id}', 'update')->name('admin.users.update');
    Route::get('/admin/users/delete/{id}', 'delete')->name('admin.users.delete');
});



Route::controller(banners_controller::class)->group(function () {
    Route::get('/admin/banners', 'index')->name('banners.page');
    Route::post('/admin/store/banner', 'store')->name('banner.store');
    Route::get('/admin/edit/banner/{id}', 'edit')->name('banner.edit');
    Route::post('/admin/update/banner/{id}', 'update')->name('banner.update');
    Route::get('/admin/delete/banner/{id}', 'delete')->name('banner.delete');
});




// ====================================================================================


Route::controller(create_store::class)->group(function () {
    // Route::get('/store/home/{store_name?}/{store_id?}/{table?}', 'store_home')->name('store.home');
    Route::get('/register/store', 'index')->name('register.store.page');
    Route::post('/register/store', 'register_store')->name('register.store');
    Route::get('/store/dashboard', 'dashboard')->name('store.dashboard');

    // Get dashboard data (categories, meals, stats)
    Route::get('/store/dashboard/data', 'getDashboardData')->name('store.dashboard.data');

});











