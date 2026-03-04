<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PlanController extends Controller
{
    public function CreatePlanPage()
    {
        try {
            return Inertia::render("admin/plans/create");
        } catch (\Throwable $th) {
            return Inertia::render("admin/error/index");
        }
    }
    /**
     * show all plans
     */

    public function index()
    {
        try {
            $plans = Plan::all();
            return Inertia::render("admin/plans/index", ["plans" => $plans]);
        } catch (\Throwable $th) {
            
            return Inertia::render("admin/404/index");
        }
    }

    /**
     * store new plan
     */
    public function create(Request $request)
    {
        try {
            $data = $request->validate([
                'name_en'        => 'required|string|max:255',
                'name_ar'        => 'required|string|max:255',

                'description_en' => 'nullable|string',
                'description_ar' => 'nullable|string',

                'price'          => 'required|numeric|min:0',

                'interval'       => 'required|in:monthly,quarterly,yearly',
                'duration_days'  => 'required|integer|min:1',

                'max_menus'      => 'required|integer|min:1',
                'max_categories' => 'required|integer|min:1',
                'max_items'      => 'required|integer|min:1',

                'custom_domain'  => 'boolean',
                'qr_code'        => 'boolean',
                'is_active'      => 'boolean',
            ]);

            $data['slug'] = Str::slug($data['name_en']);

            Plan::create($data);
            return redirect()->back();
        } catch (\Throwable $th) {
            return $th->getMessage();
            return Inertia::render("admin/404/index");
        }
    }

/**
 * edit_page
 *
 */
    public function edit_page($id)
    {
        try {
            $plan = Plan::findOrFail($id);
            return Inertia::render("admin/plans/edit", ["plan" => $plan]);
        } catch (\Throwable $th) {
            return Inertia::render("admin/error/index");
        }
    }

    /**
     * update the plan
     *
     */
    public function update(Request $request, $id)
    {
        try {
            $data = $request->validate([
                'name_en'        => 'required|string|max:255',
                'name_ar'        => 'required|string|max:255',

                'description_en' => 'nullable|string',
                'description_ar' => 'nullable|string',

                'price'          => 'required|numeric|min:0',

                'interval'       => 'required|in:monthly,quarterly,yearly',
                'duration_days'  => 'required|integer|min:1',

                'max_menus'      => 'required|integer|min:1',
                'max_categories' => 'required|integer|min:1',
                'max_items'      => 'required|integer|min:1',

                'custom_domain'  => 'boolean',
                'qr_code'        => 'boolean',
                'is_active'      => 'boolean',
            ]);

            $data['slug'] = Str::slug($data['name_en']);

            $plan = Plan::findOrFail($id);
            $plan->update($data);
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render("admin/error/index");
        }
    }

    /**
     * delete the plan
     *
     */
    public function delete($id)
    {
        try {
            $plan = Plan::findOrFail($id);
            $plan->delete();
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render("admin/error/index");
        }
    }
}
