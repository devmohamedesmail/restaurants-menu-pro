<?php


use App\Http\Controllers\vendor\CreateStore;
use App\Models\Store;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $stores = Store::where('is_active', true)->limit(10)->get();
    return Inertia::render('index', [
        'stores' => $stores,
    ]);
})->name('home');

Route::get('dashboard', [CreateStore::class, 'redirect_to_dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/settings.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/visitors.php';
require __DIR__ . '/vendor.php';
// ====================================================================================

Route::controller(CreateStore::class)->group(function () {
    // Route::get('/store/home/{store_name?}/{store_id?}/{table?}', 'store_home')->name('store.home');
    Route::get('/store/dashboard', 'store_dashboard')->name('store.dashboard');
    // Get dashboard data (categories, meals, stats)
    Route::get('/store/dashboard/data', 'getDashboardData')->name('store.dashboard.data');
});


