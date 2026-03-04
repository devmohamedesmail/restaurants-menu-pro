<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    /** @use HasFactory<\Database\Factories\PlanFactory> */
    use HasFactory;

       protected $fillable = [
        'name_en',
        'name_ar',
        'description_en',
        'description_ar',
        'slug',
        'price',
        'interval',
        'duration_days',
        'max_menus',
        'max_categories',
        'max_items',
        'custom_domain',
        'qr_code',
        'is_active',
    ];
}
