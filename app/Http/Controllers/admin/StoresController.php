<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Traits\UploadsToCloudinary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoresController extends Controller
{
    use UploadsToCloudinary;

    public function index(){
      try {
         $stores = Store::with('user', 'country')->get();
         $users = \App\Models\User::all();
         $countries = \App\Models\Country::all();
        return Inertia::render('admin/stores/index', [
            'stores' => $stores,
            'users' => $users,
            'countries' => $countries,
        ]);
      } catch (\Throwable $th) {
        return Inertia::render('admin/error', [
            'error' => $th->getMessage(),
        ]);
      }
    }

    public function store(Request $request){
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'country_id' => 'required|exists:countries,id',
                'name' => 'required|string|max:255',
                'email' => 'nullable|email|max:255',
                'phone' => 'nullable|string|max:255',
                'address' => 'nullable|string|max:500',
                'description' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Upload image to Cloudinary
            if ($request->hasFile('image')) {
                $validated['image'] = $this->uploadToCloudinary($request->file('image'), 'stores/logos');
            }

            // Upload banner to Cloudinary
            if ($request->hasFile('banner')) {
                $validated['banner'] = $this->uploadToCloudinary($request->file('banner'), 'stores/banners');
            }

            // Generate slug from name
            $validated['slug'] = \Str::slug($validated['name']);

            Store::create($validated);

            return redirect()->route('stores.page')->with('success', 'Store created successfully');
        } catch (\Throwable $th) {
            return back()->withErrors(['error' => $th->getMessage()]);
        }
    }

    public function update(Request $request, $id){
        try {
            $store = Store::findOrFail($id);

            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'country_id' => 'required|exists:countries,id',
                'name' => 'required|string|max:255',
                'email' => 'nullable|email|max:255',
                'phone' => 'nullable|string|max:255',
                'address' => 'nullable|string|max:500',
                'description' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'banner' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            // Upload new image to Cloudinary if provided
            if ($request->hasFile('image')) {
                $validated['image'] = $this->uploadToCloudinary($request->file('image'), 'stores/logos');
            }

            // Upload new banner to Cloudinary if provided
            if ($request->hasFile('banner')) {
                $validated['banner'] = $this->uploadToCloudinary($request->file('banner'), 'stores/banners');
            }

            // Update slug if name changed
            if ($validated['name'] !== $store->name) {
                $validated['slug'] = \Str::slug($validated['name']);
            }

            $store->update($validated);

            return redirect()->route('stores.page')->with('success', 'Store updated successfully');
        } catch (\Throwable $th) {
            return back()->withErrors(['error' => $th->getMessage()]);
        }
    }

    public function delete($id){
        try {
            $store = Store::findOrFail($id);
            $store->delete();

            return redirect()->route('stores.page')->with('success', 'Store deleted successfully');
        } catch (\Throwable $th) {
            return back()->withErrors(['error' => $th->getMessage()]);
        }
    }

    public function toggleStatus(Request $request, $id){
        try {
            $store = Store::findOrFail($id);

            $validated = $request->validate([
                'field' => 'required|in:is_active,is_featured,is_verified',
                'value' => 'required|boolean',
            ]);

            $store->update([
                $validated['field'] => $validated['value']
            ]);

            return back()->with('success', 'Store status updated successfully');
        } catch (\Throwable $th) {
            return back()->withErrors(['error' => $th->getMessage()]);
        }
    }
}

