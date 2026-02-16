<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Traits\UploadsToCloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    use UploadsToCloudinary;

    /**
     * 
     * Create New Category
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function storeCategory(Request $request)
    {

        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();

        $validated = $request->validate([
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'position' => 'nullable|integer',
        ]);

        $imagePath = $this->uploadToCloudinary($request->file('image'), 'categories');


        $store->categories()->create([
            'name_en' => $validated['name_en'],
            'name_ar' => $validated['name_ar'],
            'image' => $imagePath,
            'position' => $validated['position'] ?? 0,
        ]);

        return redirect()->back();
    }


    /**
     * Summary of updateCategory
     * @param Request $request
     * @param mixed $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateCategory(Request $request, $id)
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $category = $store->categories()->findOrFail($id);

        $validated = $request->validate([
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'position' => 'nullable|integer',
        ]);

        $data = [
            'name_en' => $validated['name_en'],
            'name_ar' => $validated['name_ar'],
            'position' => $validated['position'] ?? $category->position,
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadToCloudinary($request->file('image'), 'categories');
        }

        $category->update($data);
        return redirect()->back();
    }

    /**
     * 
     * Delete Category
     * @param mixed $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deleteCategory($id)
    {
        $user = Auth::user();
        $store = Store::where('user_id', $user->id)->first();
        $category = $store->categories()->findOrFail($id);
        $category->delete();
        return redirect()->back();
    }
}
