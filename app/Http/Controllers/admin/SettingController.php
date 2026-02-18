<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Traits\UploadsToCloudinary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{

    use UploadsToCloudinary;

    // update_settings
    public function settings()
    {
        try {
            $setting = Setting::first();
            return Inertia::render(
                "admin/setting/index",
                ['setting' => $setting]
            );
        } catch (\Throwable $th) {
            return Inertia::render('admin/404/index', [
                "error" => $th->getMessage(),
            ]);
        }
    }

    public function update_settings(Request $request)
    {

        try {
            $setting = Setting::first();
            if ($setting) {
                $setting->title_en       = $request->title_en;
                $setting->title_ar       = $request->title_ar;
                $setting->description_en = $request->description_en;
                $setting->description_ar = $request->description_ar;
                $setting->keywords_en    = $request->keywords_en;
                $setting->keywords_ar    = $request->keywords_ar;
                $setting->email          = $request->email;
                $setting->phone          = $request->phone;
                $setting->address        = $request->address;
                $setting->currency_en    = $request->currency_en;
                $setting->currency_ar    = $request->currency_ar;

                if ($request->hasFile('logo')) {
                    $imagePath     = $this->uploadToCloudinary($request->file('logo'), 'stores/logos');
                    $setting->logo = $imagePath;
                }
                if ($request->hasFile('favicon')) {
                    $bannerPath       = $this->uploadToCloudinary($request->file('favicon'), 'stores/favicons');
                    $setting->favicon = $bannerPath;
                }

                $setting->save();
                return redirect()->back();

            } else {
                $setting                 = new Setting();
                $setting->title_en       = $request->title_en;
                $setting->title_ar       = $request->title_ar;
                $setting->description_en = $request->description_en;
                $setting->description_ar = $request->description_ar;
                $setting->keywords_en    = $request->keywords_en;
                $setting->keywords_ar    = $request->keywords_ar;
                $setting->email          = $request->email;
                $setting->phone          = $request->phone;
                $setting->address        = $request->address;
                $setting->currency_en    = $request->currency_en;
                $setting->currency_ar    = $request->currency_ar;
                if ($request->hasFile('logo')) {
                    $imagePath     = $this->uploadToCloudinary($request->file('logo'), 'stores/logos');
                    $setting->logo = $imagePath;
                }
                if ($request->hasFile('favicon')) {
                    $bannerPath       = $this->uploadToCloudinary($request->file('favicon'), 'stores/favicons');
                    $setting->favicon = $bannerPath;
                }
                $setting->save();
                return redirect()->back();
            }
        } catch (\Throwable $th) {
            return Inertia::render('admin/404/index', [
                "error" => $th->getMessage(),
            ]);
        }

    }
}
