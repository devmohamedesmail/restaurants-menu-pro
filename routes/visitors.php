<?php

use App\Http\Controllers\visitors\VisitorsContoller;
use Illuminate\Support\Facades\Route;



Route::controller(VisitorsContoller::class)->group(function () {
    Route::get('/contact-us', 'contact_us')->name('contact.us');
    Route::get('/privacy-policy', 'privacy_policy')->name('privacy.policy');
    Route::get('/terms-of-service', 'terms_of_service')->name('terms.of.service');
});
