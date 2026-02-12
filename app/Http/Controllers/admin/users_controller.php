<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class users_controller extends Controller
{
       // show_users
    public function show_users(){
     try {
          $users = User::all();
        return Inertia::render("admin/users/index",["users"=>$users]);
     } catch (\Throwable $th) {
       return Inertia::render("admin/404/index",["error"=>$th]);
     }
    }



    public function admin_users_change_role($id){
        try {
            $user = User::find($id);
            $user->role = $user->role === 'admin' ? 'user' : 'admin';
            $user->save();
            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render("admin/404/index",["error"=>$th]);
        }
    }
}
