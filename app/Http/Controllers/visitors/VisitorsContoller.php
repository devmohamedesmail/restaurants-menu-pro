<?php
namespace App\Http\Controllers\visitors;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class VisitorsContoller extends Controller
{
    // contact_us
    public function contact_us()
    {

        try {
            return Inertia::render('visitors/contact-us/index');
        } catch (\Throwable $th) {
            return Inertia::render('404/index', ['error' => $th->getMessage()]);
        }
    }

    // privacy_policy
    public function privacy_policy()
    {
        try {
            return Inertia::render('visitors/privacy-policy/index');
        } catch (\Throwable $th) {
            return Inertia::render('404/index', ['error' => $th->getMessage()]);
        }
    }



    public function terms_of_service()
    {
        try {
            return Inertia::render('visitors/terms-of-service/index');
        } catch (\Throwable $th) {
            return Inertia::render('404/index', ['error' => $th->getMessage()]);
        }
    }
}
