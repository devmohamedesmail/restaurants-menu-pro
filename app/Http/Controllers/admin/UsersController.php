<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsersController extends Controller
{
       // show_users
    public function show_users(){
     try {
        $users = User::with('role')->get();
        return Inertia::render("admin/users/index",["users"=>$users]);
     } catch (\Throwable $th) {
       return Inertia::render("admin/404/index",["error"=>$th]);
     }
    }



    public function update(Request $request, $id){
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email,' . $id,
                'role' => 'required|in:user,admin,manager,store_owner',
            ]);

            $user = User::findOrFail($id);
            $user->update($validated);
            
            return redirect()->back()->with('success', 'User updated successfully');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to update user');
        }
    }

    public function delete($id){
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return redirect()->back()->with('success', 'User deleted successfully');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Failed to delete user');
        }
    }
}
