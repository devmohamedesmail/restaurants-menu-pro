<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    /** @use HasFactory<\Database\Factories\TableFactory> */
    use HasFactory;
       protected $fillable = [
        'store_id',
        'name',
        'capacity',
        'qr_code',
    ];

    /**
     * Get the store that owns the table
     */
    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * Get the orders for the table
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
