<?php
namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Traits\UploadsToCloudinary;
use Cloudinary\Cloudinary;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TableController extends Controller
{
    use UploadsToCloudinary;
    public function storeTable(Request $request)
    {
        try {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            if (! $store) {
                return back()->withErrors(['error' => 'Store not found']);
            }
            $validated = $request->validate([
                'name'     => 'required|string|max:255',
                'capacity' => 'required|integer|min:1',
            ]);

            $table = $store->tables()->create([
                'name'     => $validated['name'],
                'capacity' => $validated['capacity'],
            ]);

            // Generate QR Code
            $qrCode = $this->generateAndUploadQRCode($table, $store);
            $table->update(['qr_code' => $qrCode]);

            return redirect()->back();

        } catch (\Throwable $th) {
            return Inertia::render("500/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * Update table
     */
    public function updateTable(Request $request, $id)
    {

        try {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();

            if (! $store) {
                return back()->withErrors(['error' => 'Store not found']);
            }

            $table = $store->tables()->findOrFail($id);

            $validated = $request->validate([
                'name'     => 'required|string|max:255',
                'capacity' => 'required|integer|min:1',
            ]);

            $table->update([
                'name'     => $validated['name'],
                'capacity' => $validated['capacity'],
            ]);

            // Regenerate QR Code if name changed
            if ($table->wasChanged('name')) {
                $qrCode = $this->generateAndUploadQRCode($table, $store);
                $table->update(['qr_code' => $qrCode]);
            }

            return redirect()->back();

        } catch (\Throwable $th) {
            return Inertia::render("500/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * Delete table
     */
    public function deleteTable($id)
    {
        try {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();

            if (! $store) {
                return back()->withErrors(['error' => 'Store not found']);
            }

            $table = $store->tables()->findOrFail($id);
            $table->delete();

            return redirect()->back();

        } catch (\Throwable $th) {
            return Inertia::render("500/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * Generate QR Code and upload to Cloudinary
     */
    private function generateAndUploadQRCode($table, $store)
    {
        try {

            $slug = $store->slug ?? \Illuminate\Support\Str::slug($store->name);

            $url = route('store.menu', [
                'slug'     => $slug,
                'store_id' => $store->id,
                'table'    => $table->id,
            ]);

            \Log::info('Generating QR for table: ' . $table->id);
            $result = (new \Endroid\QrCode\Builder\Builder(
                writer: new \Endroid\QrCode\Writer\PngWriter(),
                writerOptions: [],
                validateResult: false,
                data: $url,
                encoding: new \Endroid\QrCode\Encoding\Encoding('UTF-8'),
                errorCorrectionLevel: \Endroid\QrCode\ErrorCorrectionLevel::High,
                size: 500,
                margin: 10,
                roundBlockSizeMode: \Endroid\QrCode\RoundBlockSizeMode::Margin
            ))->build();
            \Log::info('QR Generated successfully');

            // حفظ مؤقت في storage
            $fileName = 'qr_' . $table->id . '_' . time() . '.png';
            $tempPath = storage_path('app/public/' . $fileName);

            file_put_contents($tempPath, $result->getString());

            // رفع إلى Cloudinary باستخدام الـ Trait
            $uploadedUrl = $this->uploadToCloudinary(
                new \Illuminate\Http\File($tempPath),
                'qr_codes'
            );

            // حذف الملف المؤقت
            unlink($tempPath);

            return $uploadedUrl;

        } catch (\Throwable $th) {
            return Inertia::render("500/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

}
