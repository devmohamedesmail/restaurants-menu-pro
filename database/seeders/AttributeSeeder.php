<?php

namespace Database\Seeders;

use App\Models\Attribute;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attributes = [
            [
                'name_en' => 'Size',
                'name_ar' => 'الحجم',
            ],
            [
                'name_en' => 'Extras',
                'name_ar' => 'إضافات',
            ],
            [
                'name_en' => 'Bread Type',
                'name_ar' => 'نوع الخبز',
            ],
            [
                'name_en' => 'Spice Level',
                'name_ar' => 'درجة الحرارة',
            ],
            [
                'name_en' => 'Drink',
                'name_ar' => 'المشروب',
            ],
        ];

         foreach ($attributes as $attribute) {

            Attribute::create([
                'name_en' => $attribute['name_en'],
                'name_ar' => $attribute['name_ar'],
                'slug_en' => Str::slug($attribute['name_en']),
                'slug_ar' => Str::slug($attribute['name_ar']),
            ]);

        }
    }
}
