<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        try {
            $roles = Role::orderBy('created_at', 'desc')->get();
            return Inertia::render('admin/roles/index', [
                'roles' => $roles,
            ]);
        } catch (\Throwable $th) {
            return Inertia::render('admin/404/index', [
                "error" => $th->getMessage(),
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:roles,name',
                'slug' => 'required|string|max:255|unique:roles,slug',
            ]);

            Role::create($validated);
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render('admin/404/index', [
                "error" => $th->getMessage(),
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $role = Role::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:roles,name,' . $id,
                'slug' => 'required|string|max:255|unique:roles,slug,' . $id,
            ]);

            $role->update($validated);
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render('admin/404/index', [
                "error" => $th->getMessage(),
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $role = Role::findOrFail($id);
            $role->delete();
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render('admin/404/index', [
                "error" => $th->getMessage(),
            ]);
        }
    }
}
