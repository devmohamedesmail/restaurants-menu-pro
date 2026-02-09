<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    protected $fillable = [
        'store_id',
        'name_en',
        'name_ar',
        'image',
        'position',
    ];

    /**
     * relation with meals
     */
    public function meals()
    {
        return $this->hasMany(Meal::class);
    }
/**
 * relation with store
 */
    public function store()
    {
        return $this->belongsTo(Store::class);
    }

}
