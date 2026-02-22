<?php
namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Store;
use App\Traits\UploadsToCloudinary;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CreateStore extends Controller
{
    use UploadsToCloudinary;

    public function store_dashboard()
    {

        try {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            if ($store) {
                $categories = $store->categories()->withCount('meals')->get();
                $meals      = $store->meals()->with('category')->get();
                $country    = $store->country()->first();
                $orders     = $store->orders()->get();
                $tables     = $store->tables()->get();

                $stats = [
                    'totalCategories' => $categories->count(),
                    'totalMeals'      => $meals->count(),
                    'totalOrders'     => $orders->count(),
                    'totalRevenue'    => 0,
                ];

                return Inertia::render("store/index", [
                    'store'      => $store,
                    'categories' => $categories,
                    'country'    => $country,
                    'meals'      => $meals,
                    'stats'      => $stats,
                    'attributes' => $attributes,
                    'orders'     => $orders,
                    'tables'     => $tables,
                ]);
            } else {
                return Inertia::render("store/register-store/index");
            }
        } catch (\Throwable $th) {
            return Inertia::render("404/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    // public function redirect_to_dashboard()
    // {
    //     try {
    //         $user = Auth::user();
    //         dd($user->role_id);
    //         if ($user->role_id == 4) {
    //             $store = $user->stores()->first();
    //             if ($store) {
    //                 return Inertia::render('vendor/dashboard/index', [
    //                     'store'      => $store,
    //                     'categories' => $store->categories()->withCount('meals')->get(),
    //                     'meals'      => $store->meals()->with('category')->get(),
    //                     'country'    => $store->country()->first(),
    //                     'orders'     => $store->orders()->get(),
    //                     'tables'     => $store->tables()->get(),
    //                 ]);
    //             } else {
    //                 return redirect()->route('register.store.page');
    //             }
    //         } else {
    //             // dd("fdsfasdf");
    //             return Inertia::render('dashboard');
    //         }
    //     } catch (\Throwable $th) {
    //         return Inertia::render("404/index", [
    //             "error" => $th->getMessage(),
    //         ]);
    //     }
    // }
    public function redirect_to_dashboard()
    {
        try {
            $user = Auth::user();

            
            switch ($user->role_id) {
                case 4: // Vendor
                    $store = $user->stores()->first();
                    if ($store) {
                        return Inertia::render('vendor/dashboard/index', [
                            'store'      => $store,
                            'categories' => $store->categories()->withCount('meals')->get(),
                            'meals'      => $store->meals()->with('category')->get(),
                            'country'    => $store->country()->first(),
                            'orders'     => $store->orders()->get(),
                            'tables'     => $store->tables()->get(),
                        ]);
                    } else {
                        return redirect()->route('register.store.page');
                    }
                    break;

                case 1: 
                    return Inertia::render('admin/dashboard/index');
                    break;

                case 2: 
                    return Inertia::render('dashboard');
                    break;

                default:
                    return redirect()->route('login'); 
            }
        } catch (\Throwable $th) {
            return Inertia::render("404/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

}
