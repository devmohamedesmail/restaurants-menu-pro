<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TableController extends Controller
{
      public function storeTable(Request $request)
    {
        try {
            $user = Auth::user();
            $store = Store::where('user_id', $user->id)->first();

            if (!$store) {
                return back()->withErrors(['error' => 'Store not found']);
            }

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'capacity' => 'required|integer|min:1',
            ]);

            $table = $store->tables()->create([
                'name' => $validated['name'],
                'capacity' => $validated['capacity'],
            ]);

            // Generate QR Code
            $qrCode = $this->generateAndUploadQRCode($table, $store);
            $table->update(['qr_code' => $qrCode]);

            return redirect()->back();

        } catch (\Throwable $th) {
            \Log::error('Table creation error: ' . $th->getMessage());
            return back()->withErrors(['error' => 'Failed to create table: ' . $th->getMessage()]);
        }
    }

    /**
     * Update table
     */
    public function updateTable(Request $request, $id)
    {
    
        try {
            $user = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            
            if (!$store) {
                return back()->withErrors(['error' => 'Store not found']);
            }

            $table = $store->tables()->findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'capacity' => 'required|integer|min:1',
            ]);

            $table->update([
                'name' => $validated['name'],
                'capacity' => $validated['capacity'],
            ]);

            // Regenerate QR Code if name changed
            if ($table->wasChanged('name')) {
                $qrCode = $this->generateAndUploadQRCode($table, $store);
                $table->update(['qr_code' => $qrCode]);
            }

            return redirect()->back();

        } catch (\Throwable $th) {
            \Log::error('Table update error: ' . $th->getMessage());
            return back()->withErrors(['error' => 'Failed to update table: ' . $th->getMessage()]);
        }
    }

    /**
     * Delete table
     */
    public function deleteTable($id)
    {
        try {
            $user = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            
            if (!$store) {
                return back()->withErrors(['error' => 'Store not found']);
            }

            $table = $store->tables()->findOrFail($id);
            $table->delete();

            return redirect()->back();

        } catch (\Throwable $th) {
            \Log::error('Table deletion error: ' . $th->getMessage());
            return back()->withErrors(['error' => 'Failed to delete table: ' . $th->getMessage()]);
        }
    }

    /**
     * Generate QR Code and upload to Cloudinary
     */
    private function generateAndUploadQRCode($table, $store)
    {
        try {
            // Generate QR code URL (link to store with table number)
            $url = route('store.home', [
                'store_name' => $store->name,
                'store_id' => $store->id,
                'table' => $table->id
            ]);

            // Generate QR code as PNG
            $qrCode = \SimpleSoftwareIO\QrCode\Facades\QrCode::format('png')
                ->size(500)
                ->margin(2)
                ->generate($url);

            // Upload to Cloudinary
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => config('services.cloudinary.cloud_name'),
                    'api_key' => config('services.cloudinary.api_key'),
                    'api_secret' => config('services.cloudinary.api_secret'),
                ],
            ]);

            $uploadResult = $cloudinary->uploadApi()->upload(
                'data:image/png;base64,' . base64_encode($qrCode),
                [
                    'folder' => 'qr_codes',
                    'public_id' => 'table_' . $table->id . '_' . time(),
                ]
            );

            return $uploadResult['secure_url'];

        } catch (\Throwable $th) {
            \Log::error('QR Code generation error: ' . $th->getMessage());
            return null;
        }
    }
}
