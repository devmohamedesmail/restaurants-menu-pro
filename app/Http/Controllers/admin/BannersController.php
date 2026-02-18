<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Traits\UploadsToCloudinary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BannersController extends Controller
{
    use UploadsToCloudinary;

    /**
     * Display a listing of banners
     */
    public function index()
    {
        try {
            $banners = Banner::latest()->get();
            return Inertia::render("admin/banners/index", ["banners" => $banners]);
        } catch (\Throwable $th) {
            return Inertia::render('admin/404/index', ["error" => $e->getMessage()]);
        }
    }

    /**
     * Store a newly created banner
     */
    public function store(Request $request)
    {
        try {
            $validate = $request->validate([
                "title_en" => "required|string|max:255",
                "title_ar" => "required|string|max:255",
                "image"    => "required|image|mimes:jpeg,png,jpg,gif|max:2048",
            ]);

            $banner           = new Banner();
            $banner->title_en = $request->title_en;
            $banner->title_ar = $request->title_ar;

            $bannerPath = null;
            if ($request->hasFile('image')) {
                $bannerPath = $this->uploadToCloudinary($request->file('image'), 'stores/banners');
            }

            $banner->image = $bannerPath;
            $banner->save();

            return redirect()->back();
        } catch (\Throwable $th) {
            return Inertia::render('admin/404/index', ["error" => $e->getMessage()]);
        }
    }

    /**
     * Show the form for editing the specified banner
     */
    public function edit($id)
    {
        try {
            $banner = Banner::findOrFail($id);
            return Inertia::render("admin/banners/edit", ["banner" => $banner]);
        } catch (\Throwable $th) {
            return Inertia::render('admin/404/index', ["error" => $e->getMessage()]);
        }
    }

    /**
     * Update the specified banner
     */
    public function update(Request $request, $id)
    {
        try {
            $banner = Banner::findOrFail($id);

            $validate = $request->validate([
                "title_en" => "required|string|max:255",
                "title_ar" => "required|string|max:255",
                "image"    => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
            ]);

            $banner->title_en = $request->title_en;
            $banner->title_ar = $request->title_ar;
            $bannerPath       = null;
            if ($request->hasFile('image')) {
                $bannerPath = $this->uploadToCloudinary($request->file('image'), 'stores/banners');
            }

            if ($bannerPath) {
                $banner->image = $bannerPath;
            }

            $banner->save();

            return redirect()->route('banners.page');
        } catch (\Throwable $th) {
            return Inertia::render('admin/404/index', ["error" => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified banner
     */
    public function delete($id)
    {
        try {
            $banner = Banner::findOrFail($id);
            if ($banner->image && file_exists(public_path('uploads/' . $banner->image))) {
                unlink(public_path('uploads/' . $banner->image));
            }
            $banner->delete();
            return redirect()->route('banners.page');
        } catch (\Throwable $th) {
            return Inertia::render('admin/404/index', ["error" => $e->getMessage()]);
        }
    }
}
