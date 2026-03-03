<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'store_id' => 2,
                'name_en'  => 'Burgers',
                'name_ar'  => 'برجر',
                'image'    => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
                'position' => 1,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Pizzas',
                'name_ar'  => 'بيتزا',
                'image'    => 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
                'position' => 2,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Fried Chicken',
                'name_ar'  => 'فراخ مقلية',
                'image'    => 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58',
                'position' => 3,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Pasta',
                'name_ar'  => 'باستا',
                'image'    => 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb',
                'position' => 4,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Sandwiches',
                'name_ar'  => 'ساندوتشات',
                'image'    => 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg',
                'position' => 5,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Grilled',
                'name_ar'  => 'مشويات',
                'image'    => 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd',
                'position' => 6,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Seafood',
                'name_ar'  => 'مأكولات بحرية',
                'image'    => 'https://images.unsplash.com/photo-1544025162-d76694265947',
                'position' => 7,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Rice Dishes',
                'name_ar'  => 'أطباق الأرز',
                'image'    => 'https://images.unsplash.com/photo-1512058564366-c9e3e046e3b9',
                'position' => 8,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Salads',
                'name_ar'  => 'سلطات',
                'image'    => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
                'position' => 9,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Soups',
                'name_ar'  => 'شوربة',
                'image'    => 'https://images.unsplash.com/photo-1547592180-85f173990554',
                'position' => 10,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Breakfast',
                'name_ar'  => 'فطار',
                'image'    => 'https://images.unsplash.com/photo-1533089860892-a9b969df67d8',
                'position' => 11,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Desserts',
                'name_ar'  => 'حلويات',
                'image'    => 'https://images.unsplash.com/photo-1551024601-bec78aea704b',
                'position' => 12,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Ice Cream',
                'name_ar'  => 'ايس كريم',
                'image'    => 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
                'position' => 13,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Cakes',
                'name_ar'  => 'كيك',
                'image'    => 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
                'position' => 14,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Juices',
                'name_ar'  => 'عصائر',
                'image'    => 'https://images.unsplash.com/photo-1553530666-ba11a7da3888',
                'position' => 15,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Hot Drinks',
                'name_ar'  => 'مشروبات ساخنة',
                'image'    => 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
                'position' => 16,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Cold Drinks',
                'name_ar'  => 'مشروبات باردة',
                'image'    => 'https://images.unsplash.com/photo-1544145945-f90425340c7e',
                'position' => 17,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Fries',
                'name_ar'  => 'بطاطس',
                'image'    => 'https://images.unsplash.com/photo-1576107232684-1279f390859f',
                'position' => 18,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Kids Meals',
                'name_ar'  => 'وجبات أطفال',
                'image'    => 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092',
                'position' => 19,
            ],
            [
                'store_id' => 2,
                'name_en'  => 'Special Offers',
                'name_ar'  => 'عروض خاصة',
                'image'    => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
                'position' => 20,
            ],
        ];

        DB::table('categories')->insert($categories);
    }
}
