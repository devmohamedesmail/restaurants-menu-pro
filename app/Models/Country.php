<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    /** @use HasFactory<\Database\Factories\CountryFactory> */
    use HasFactory;

     protected $fillable = [
        'name_en',
        'name_ar',
        'currency_ar',
        'currency_en',
        'code',
    ];


    
    public function stores()
    {
        return $this->hasMany(Store::class);
    }
}
