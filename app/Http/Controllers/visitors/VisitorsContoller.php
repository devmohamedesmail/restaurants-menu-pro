<?php
namespace App\Http\Controllers\visitors;

use App\Http\Controllers\Controller;
use App\Models\Plan;
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


    public function plans(){
        try {
            $plans = Plan::all();
            return Inertia::render('visitors/plans/index',[
                'plans'=> $plans
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('404/index', ['error' => $th->getMessage()]);
        }
    }





public function checkout_page($plan_id){
    try {
        $plan = Plan::find($plan_id);
        if(!$plan){
            return Inertia::render('404/index', ['error' => 'Plan not found']);
        }
        return Inertia::render('visitors/checkout/index',[
            'plan'=> $plan
        ]);
    } catch (\Throwable $th) {
        return Inertia::render('404/index', ['error' => $th->getMessage()]);
    }
}










}
