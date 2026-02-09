<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;


    protected $fillable = [
        'store_id',
        'user_id',
        'table_id',
        'table',
        'status',
        'total',
        'order',
        'name',
        'address',
        'phone',
        'location',
        'note',
    ];

    protected $casts = [
        "order"=> "array",
    ];


    // Define relationship to Store model
    public function store(){
        return $this->belongsTo(Store::class);
    }
}
