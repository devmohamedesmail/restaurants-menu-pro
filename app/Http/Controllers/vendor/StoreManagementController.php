<?php
namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StoreManagementController extends Controller
{
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
}
