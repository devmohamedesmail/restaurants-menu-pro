<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /** @use HasFactory<\Database\Factories\SettingFactory> */
    use HasFactory;
    protected $fillable =[
          'title_en',
           'title_ar',
            description_en',
            description_ar',
            keywords_en',
            keywords_ar',
            'logo',
            'favicon',
        'email',
        'phone',
        'address',
        'currency_en',
        'currency_ar',
    ]
}
