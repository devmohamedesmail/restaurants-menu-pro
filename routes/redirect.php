<?php

use App\Http\Controllers\visitors\RedirectController;
use Illuminate\Support\Facades\Route;


Route::controller(RedirectController::class)->group(function () {
   Route::get('/','index')->name('home');
   Route::get('dashboard','redirect_to_dashboard')->middleware(['auth', 'verified'])->name('dashboard');
});