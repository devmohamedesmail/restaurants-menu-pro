<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    /** @use HasFactory<\Database\Factories\StoreFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'country_id',
        'slug',
        'name',
        'email',
        'phone',
        'address',
        'image',
        'description',
        'banner',
        'is_active',
        'is_featured',
        'is_verified',
    ];


    // Define relationship to User model
    public function categories()
    {
        return $this->hasMany(Category::class);
    }


    public function meals(){
        return $this->hasMany(Meal::class);
    }

    // Define relationship to Country model
    public function country()
    {
        return $this->belongsTo(Country::class);   
    }


    // Define relationship to Order model
    public function orders(){
        return $this->hasMany(Order::class);
    }

    // Define relationship to Table model
    public function tables(){
        return $this->hasMany(Table::class);
    }

    // Define relationship to User model (store owner)
    public function user(){
        return $this->belongsTo(User::class);
    }
}
