<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Store;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class create_store extends Controller
{
     public function index(){
       try {
         $countries = Country::all();
        return Inertia::render("vendor/create-store/index", [
            'countries' => $countries,
        ]);
       } catch (\Throwable $th) {
        return Inertia::render("404/index" , [
            "error" => $th->getMessage(),
        ]);
       }
    }
      public function register_store(Request $request)
    {
        try {
          
            // Validate the request
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'store_name' => 'required|string|max:255|unique:stores,name',
                'slug' => 'nullable|string|max:255|unique:stores,slug',
                'country_id' => 'nullable',
                'store_email' => 'nullable|email|max:255',
                'store_phone' => 'nullable|string|max:50',
                'store_address' => 'nullable|string|max:500',
                'store_description' => 'nullable|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            // Create the user
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                 "role" => "store_owner",
            ]);

            event(new Registered($user));

            // Upload images to Cloudinary
            $imagePath = $this->uploadToCloudinary($request->file('image'), 'stores/logos');
            
            $bannerPath = null;
            if ($request->hasFile('banner')) {
                $bannerPath = $this->uploadToCloudinary($request->file('banner'), 'stores/banners');
            }

            // Create the store
            $store = Store::create([
                'user_id' => $user->id,
                'country_id' => $validated['country_id'] ?? null,
                'name' => $validated['store_name'],
                'slug' => $validated['slug'] ?? null,
                'email' => $validated['store_email'] ?? null,
                'phone' => $validated['store_phone'] ?? null,
                'address' => $validated['store_address'] ?? null,
                'description' => $validated['store_description'] ?? null,
                'image' => $imagePath,
                'banner' => $bannerPath,
            ]);

            // Log the user in
            Auth::login($user);

            return redirect()->route('store.dashboard');

        } catch (\Illuminate\Validation\ValidationException $e) {
            return Inertia::render("404/index" , [
                "error" => $th->getMessage(),
            ]);
        } catch (\Throwable $th) {
            // \Log::error('Store registration error: ' . $th->getMessage());
            // return back()->withErrors(['error' => $th->getMessage()])->withInput();
            return Inertia::render("404/index" , [
                "error" => $th->getMessage(),
            ]);
        }
    }
}
