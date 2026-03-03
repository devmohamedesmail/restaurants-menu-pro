<?php
namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Country;
use App\Models\Store;
use App\Traits\UploadsToCloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StoreManagementController extends Controller
{
    use UploadsToCloudinary;
    /**
     * Register a new store page
     *
     */
    public function register_store_page()
    {
        try {
            $countries = Country::all();
            return Inertia::render("vendor/create-store/index", [
                'countries' => $countries,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render("404/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * Create a new store
     *
     */
    public function create_store(Request $request)
    {
        try {

            $user = Auth::user();
            // Validate the request
            $validated = $request->validate([
                'store_name'        => 'required|string|max:255|unique:stores,name',
                'slug'              => 'nullable|string|max:255|unique:stores,slug',
                'country_id'        => 'nullable',
                'store_email'       => 'nullable|email|max:255',
                'store_phone'       => 'nullable|string|max:50',
                'store_address'     => 'nullable|string|max:500',
                'store_description' => 'nullable|string',
                'image'             => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'banner'            => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            // Upload images to Cloudinary
            $imagePath = $this->uploadToCloudinary($request->file('image'), 'stores/logos');

            $bannerPath = null;
            if ($request->hasFile('banner')) {
                $bannerPath = $this->uploadToCloudinary($request->file('banner'), 'stores/banners');
            }

            // Create the store
            $store = Store::create([
                'user_id'     => $user->id,
                'country_id'  => $validated['country_id'] ?? null,
                'name'        => $validated['store_name'],
                'slug'        => $validated['slug'] ?? null,
                'email'       => $validated['store_email'] ?? null,
                'phone'       => $validated['store_phone'] ?? null,
                'address'     => $validated['store_address'] ?? null,
                'description' => $validated['store_description'] ?? null,
                'image'       => $imagePath,
                'banner'      => $bannerPath,
            ]);
            return redirect()->route('store.dashboard');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return Inertia::render("404/index", [
                "error" => $e->getMessage(),
            ]);
        } catch (\Throwable $th) {
            return Inertia::render("404/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * Update store page
     *
     */
    public function update_store_page($id)
    {
        try {
            $countries = Country::all();
            return Inertia::render("vendor/update-store/index", [
                "store"     => Store::where('id', $id)->first(),
                "countries" => $countries,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render("404/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * Update store
     *
     */
    public function update_store(Request $request, $id)
    {

        try {
            $store = Store::findOrFail($id);

            // Validate the request
            $validated = $request->validate([
                'store_name'        => 'required|string|max:255|unique:stores,name,' . $id,
                'slug'              => 'nullable|string|max:255|unique:stores,slug,' . $id,
                'country_id'        => 'nullable',
                'store_email'       => 'nullable|email|max:255',
                'store_phone'       => 'nullable|string|max:50',
                'store_address'     => 'nullable|string|max:500',
                'store_description' => 'nullable|string',
                'image'             => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'banner'            => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            // Upload images to Cloudinary if verified
            if ($request->hasFile('image')) {
                $imagePath    = $this->uploadToCloudinary($request->file('image'), 'stores/logos');
                $store->image = $imagePath;
            }

            if ($request->hasFile('banner')) {
                $bannerPath    = $this->uploadToCloudinary($request->file('banner'), 'stores/banners');
                $store->banner = $bannerPath;
            }

            // Update the store
            $store->update([
                'country_id'  => $validated['country_id'] ?? $store->country_id,
                'name'        => $validated['store_name'],
                'slug'        => $validated['slug'] ?? $store->slug,
                'email'       => $validated['store_email'] ?? $store->email,
                'phone'       => $validated['store_phone'] ?? $store->phone,
                'address'     => $validated['store_address'] ?? $store->address,
                'description' => $validated['store_description'] ?? $store->description,
            ]);

            return redirect()->back();

        } catch (\Illuminate\Validation\ValidationException $e) {
            
            return Inertia::render("404/index", [
                "error" => $e->getMessage(),
            ]);
        } catch (\Throwable $th) {
             
            return Inertia::render("404/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * Show store menu
     *
     */

    public function store_menu($slug, $store_id, $table = null)
    {
        try {
            $store = Store::where('id', $store_id)->first();
            if ($store) {
                $categories = $store->categories()->withCount('meals')->get();
                $meals      = $store->meals()->with(['category','attributeValues'])->get();
                $country    = $store->country()->first();

                return Inertia::render("vendor/menu/index", [
                    'store'      => $store,
                    'categories' => $categories,
                    'country'    => $country,
                    'meals'      => $meals,
                    'table'      => $table,
                ]);
            } else {
                return Inertia::render("404/index", [
                    "error" => "Store not found",
                ]);
            }
        } catch (\Throwable $th) {
            return Inertia::render("404/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * Show store dashboard
     *
     */

    public function store_dashboard()
    {
        try {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            if ($store) {
                $categories = $store->categories()->withCount('meals')->get();
                $meals      = $store->meals()->with(['category','attributeValues'])->get();
                $country    = $store->country()->first();
                $orders     = $store->orders()->get();
                $tables     = $store->tables()->get();
                $attributes = Attribute::all();

                $stats = [
                    'totalCategories' => $categories->count(),
                    'totalMeals'      => $meals->count(),
                    'totalOrders'     => $orders->count(),
                    'totalRevenue'    => 0,
                ];

                return Inertia::render("vendor/dashboard/index", [
                    'store'      => $store,
                    'categories' => $categories,
                    'country'    => $country,
                    'meals'      => $meals,
                    'stats'      => $stats,
                    'orders'     => $orders,
                    'tables'     => $tables,
                    'attributes' => $attributes,
                ]);
            } else {
                return Inertia::render("vendor/create-store/index",[
                    'countries'=>Country::all(),
                ]);
            }
        } catch (\Throwable $th) {
            return Inertia::render("404/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * vendor_profile
     */
    public function vendor_profile()
    {
        try {
            $user = Auth()->user();
            return Inertia::render('auth/vendor-profile', [
                'user' => $user,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render("404/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * Update vendor profile (name, email, avatar, password)
     */
    public function update_vendor_profile(Request $request)
    {
        try {
            $user = Auth::user();

            // Validate the request
            $validated = $request->validate([
                'name'             => 'required|string|max:255',
                'email'            => 'required|email|max:255|unique:users,email,' . $user->id,
                'avatar'           => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'current_password' => 'nullable|string',
                'new_password'     => 'nullable|string|min:8|confirmed',
            ]);

            // Handle password change
            if (! empty($validated['new_password'])) {
                if (empty($validated['current_password']) || ! Hash::check($validated['current_password'], $user->password)) {
                    return back()->withErrors(['current_password' => 'The current password is incorrect.'])->withInput();
                }
            }

            // Build update data
            $updateData = [
                'name'  => $validated['name'],
                'email' => $validated['email'],
            ];

            // Upload avatar to Cloudinary if provided
            if ($request->hasFile('avatar')) {
                $updateData['avatar'] = $this->uploadToCloudinary($request->file('avatar'), 'users/avatars');
            }

            // Update password if requested
            if (! empty($validated['new_password'])) {
                $updateData['password'] = Hash::make($validated['new_password']);
            }

            $user->update($updateData);

            return redirect()->back()->with('success', 'Profile updated successfully.');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (\Throwable $th) {
            return back()->withErrors(['error' => $th->getMessage()])->withInput();
        }
    }

}
