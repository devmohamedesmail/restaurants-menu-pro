<?php
namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Traits\UploadsToCloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MealController extends Controller
{
    use UploadsToCloudinary;

    /**
     *
     * Sore New Meal
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function storeMeal(Request $request)
    {

        try {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();

            $validated = $request->validate([
                'category_id'    => 'required|exists:categories,id',
                'name_en'        => 'required|string|max:255',
                'name_ar'        => 'required|string|max:255',
                'description_en' => 'nullable|string',
                'description_ar' => 'nullable|string',
                'image'          => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'price'          => 'required|numeric|min:0',
                'sale_price'     => 'nullable|numeric|min:0',
            ]);

            $imagePath = $this->uploadToCloudinary($request->file('image'), 'meals');

            $meal = $store->meals()->create([
                'category_id'    => $validated['category_id'],
                'name_en'        => $validated['name_en'],
                'name_ar'        => $validated['name_ar'],
                'description_en' => $validated['description_en'] ?? null,
                'description_ar' => $validated['description_ar'] ?? null,
                'image'          => $imagePath,
                'price'          => $validated['price'],
                'sale_price'     => $validated['sale_price'] ?? null,
            ]);

            // Handle attributes
            if ($request->has('attributes')) {
                $attributes = json_decode($request->input('attributes'), true);
                if (is_array($attributes)) {
                    foreach ($attributes as $attributeId => $valueId) {
                        $meal->attributes()->attach($attributeId, [
                            'attribute_value_id' => $valueId,
                        ]);
                    }
                }
            }

            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render("500/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     *
     * Update the meal
     * @param Request $request
     * @param mixed $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateMeal(Request $request, $id)
    {
        try {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            $meal  = $store->meals()->findOrFail($id);

            $validated = $request->validate([
                'category_id'    => 'required|exists:categories,id',
                'name_en'        => 'required|string|max:255',
                'name_ar'        => 'required|string|max:255',
                'description_en' => 'nullable|string',
                'description_ar' => 'nullable|string',
                'image'          => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'price'          => 'required|numeric|min:0',
                'sale_price'     => 'nullable|numeric|min:0',
            ]);

            $data = [
                'category_id'    => $validated['category_id'],
                'name_en'        => $validated['name_en'],
                'name_ar'        => $validated['name_ar'],
                'description_en' => $validated['description_en'] ?? null,
                'description_ar' => $validated['description_ar'] ?? null,
                'price'          => $validated['price'],
                'sale_price'     => $validated['sale_price'] ?? null,
            ];

            if ($request->hasFile('image')) {
                $data['image'] = $this->uploadToCloudinary($request->file('image'), 'meals');
            }

            $meal->update($data);
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render("500/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * Summary of deleteMeal
     * @param mixed $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deleteMeal($id)
    {
        try {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            $meal  = $store->meals()->findOrFail($id);
            $meal->delete();
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render("500/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }
    /**
     * Store attribute values for a meal (from the attribute dialog).
     */
    public function storeAttributeValues(Request $request, $mealId)
    {
        try {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            $meal  = $store->meals()->findOrFail($mealId);

            $request->validate([
                'values'                => 'required|array|min:1',
                'values.*.attribute_id' => 'required|exists:attributes,id',
                'values.*.value'        => 'required|string|max:255',
                'values.*.price'        => 'nullable|numeric|min:0',
            ]);

            foreach ($request->values as $row) {
                \App\Models\AttributeValue::create([
                    'attribute_id' => $row['attribute_id'],
                    'meal_id'      => $meal->id,
                    'value'        => $row['value'],
                    'price'        => $row['price'] ?? 0,
                ]);

                \App\Models\MealAttribute::firstOrCreate([
                    'meal_id'      => $meal->id,
                    'attribute_id' => $row['attribute_id'],
                ]);
            }

            return redirect()->back();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => $th->getMessage()]);
        }
    }

    /**
     * Delete a single attribute value row.
     */
    public function deleteAttributeValue($id)
    {
        try {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            $av    = \App\Models\AttributeValue::findOrFail($id);
            // Ownership check
            $store->meals()->findOrFail($av->meal_id);
            $av->delete();
            return redirect()->back();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors(['error' => $th->getMessage()]);
        }
    }

}
