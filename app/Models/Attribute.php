<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    /** @use HasFactory<\Database\Factories\AttributeFactory> */
    use HasFactory;

    public function valuesForMeal($mealId)
    {
        return $this->hasMany(AttributeValue::class)
            ->where('meal_id', $mealId);
    }

    public function attributeValues()
    {
        return $this->hasMany(AttributeValue::class)
            ->whereColumn('attribute_values.meal_id', 'meal_attributes.meal_id');
    }
}
