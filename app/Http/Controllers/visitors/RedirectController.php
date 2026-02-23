<?php
namespace App\Http\Controllers\visitors;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Store;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RedirectController extends Controller
{
    //index
    public function index()
    {
        try {
            $stores = Store::where('is_active', true)->limit(10)->get();
            return Inertia::render('index', [
                'stores' => $stores,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('404/index', [
                "error"   => $th->getMessage(),
                "message" => "Something went wrong",
            ]);
        }
    }

    /**
     * Redirect to dashboard based on user role
     *
     * @return \Inertia\Response
     */
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

                case 1: // user
                    return Inertia::render('index');
                    break;

                case 2: // admin
                    $users = User::all();
                    $stores = Store::all();
                    $orders = Order::all();
                    return Inertia::render('dashboard', [
                        'users' => $users,
                        'stores' => $stores,
                        'orders' => $orders,
                    ]);
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
