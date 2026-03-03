<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
    /** @use HasFactory<\Database\Factories\AttributeValueFactory> */
    use HasFactory;

    protected $fillable = [
        'attribute_id',
        'meal_id',
        'value',
        'price',
    ];

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    public function meal()
    {
        return $this->belongsTo(Meal::class);
    }
}
