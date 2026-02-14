<?php

namespace App\Traits;

use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Log;

trait UploadsToCloudinary
{
    protected function uploadToCloudinary($file, string $folder): string
    {
        try {
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key'    => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
            ]);

            $result = $cloudinary->uploadApi()->upload(
                $file->getRealPath(),
                ['folder' => $folder]
            );

            return $result['secure_url'];

        } catch (\Exception $e) {
            Log::error('Cloudinary upload failed: ' . $e->getMessage());
            throw new \Exception('Image upload failed');
        }
    }
}
