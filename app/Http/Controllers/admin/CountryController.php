<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountryController extends Controller
{
    
    public function index()
    {
       try {
        $countries = Country::latest()->get();
        return Inertia::render('admin/countries/index', [
            'countries' => $countries,
        ]);
       } catch (\Throwable $th) {
        return Inertia::render('admin/404/index');
       }
    }

    public function store(Request $request)
    {
      try {
         $validated = $request->validate([
            'name_en' => 'required|string|max:255|unique:countries,name_en',
            'name_ar' => 'required|string|max:255|unique:countries,name_ar',
            'currency_en' => 'nullable|string|max:255',
            'currency_ar' => 'nullable|string|max:255',
            'code' => 'required|string|max:10|unique:countries,code',
        ]);

        Country::create($validated);

        return redirect()->back();
      } catch (\Throwable $th) {
        return Inertia::render('admin/404/index');
      }
    }

    public function edit($id)
    {
      try {
          $country = Country::findOrFail($id);
        $countries = Country::latest()->get();
        
        return Inertia::render('admin/countries/edit', [
            'country' => $country,
            'countries' => $countries,
        ]);
      } catch (\Throwable $th) {
       return Inertia::render('admin/404/index');
      }
    }

    public function update(Request $request, $id)
    {
       try {
         $country = Country::findOrFail($id);
        
        $validated = $request->validate([
            'name_en' => 'required|string|max:255|unique:countries,name_en,' . $id,
            'name_ar' => 'required|string|max:255|unique:countries,name_ar,' . $id,
            'currency_en' => 'nullable|string|max:255',
            'currency_ar' => 'nullable|string|max:255',
            'code' => 'required|string|max:10|unique:countries,code,' . $id,
        ]);

        $country->update($validated);

        return redirect()->route('countries.page');
       } catch (\Throwable $th) {
        return Inertia::render('admin/404/index');
       }
    }

    public function delete($id)
    {
       try {
         $country = Country::findOrFail($id);
        $country->delete();

        return redirect()->back();
       } catch (\Throwable $th) {
        return Inertia::render('admin/404/index');
       }
    }
}
