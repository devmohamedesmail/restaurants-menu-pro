<?php

namespace App\Http\Controllers\admin;

use Inertia\Inertia;
use App\Models\Setting;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class setting_controller extends Controller
{
       private function uploadToCloudinary($file, $folder)
    {
        try {
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key' => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
            ]);

            $result = $cloudinary->uploadApi()->upload($file->getRealPath(), [
                'folder' => $folder,
            ]);

            return $result['secure_url'];
        } catch (\Exception $e) {
            \Log::error('Cloudinary upload failed: ' . $e->getMessage());
            throw new \Exception('Image upload failed');
        }
    }
    // update_settings
    public function settings()
    {
        $setting = Setting::first();
        return Inertia::render(
            "admin/setting/index",
            ['setting' => $setting]
        );
    }

    public function update_settings(Request $request)
    {
        
        $setting = Setting::first();
        if ($setting) {
            $setting->title_en = $request->title_en;
            $setting->title_ar = $request->title_ar;
            $setting->description_en = $request->description_en;
            $setting->description_ar = $request->description_ar;
            $setting->keywords_en = $request->keywords_en;
            $setting->keywords_ar = $request->keywords_ar;
            $setting->email = $request->email;
            $setting->phone = $request->phone;
            $setting->address = $request->address;
            $setting->currency_en = $request->currency_en;
            $setting->currency_ar = $request->currency_ar;


            if ($request->hasFile('logo')) {
                $imagePath = $this->uploadToCloudinary($request->file('logo'), 'stores/logos');
                $setting->logo = $imagePath;
            }
            if ($request->hasFile('favicon')) {
                $bannerPath = $this->uploadToCloudinary($request->file('favicon'), 'stores/favicons');
                $setting->favicon = $bannerPath;
            }

            $setting->save();
            return redirect()->back();

          

        } else {
            $setting = new Setting();
            $setting->title_en = $request->title_en;
            $setting->title_ar = $request->title_ar;
            $setting->description_en = $request->description_en;
            $setting->description_ar = $request->description_ar;
            $setting->keywords_en = $request->keywords_en;
            $setting->keywords_ar = $request->keywords_ar;
            $setting->email = $request->email;
            $setting->phone = $request->phone;
            $setting->address = $request->address;
            $setting->currency_en = $request->currency_en;
            $setting->currency_ar = $request->currency_ar;
            if ($request->hasFile('logo')) {
                $imagePath = $this->uploadToCloudinary($request->file('logo'), 'stores/logos');
                $setting->logo = $imagePath;
            }
            if ($request->hasFile('favicon')) {
                $bannerPath = $this->uploadToCloudinary($request->file('favicon'), 'stores/favicons');
                $setting->favicon = $bannerPath;
            }
            $setting->save();
            return redirect()->back();
        }
        
    }
}
