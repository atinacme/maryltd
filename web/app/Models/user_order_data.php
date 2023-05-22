<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_order_data extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
        'stock_number',
        'quantity',
        'karat',
        'colour',
        'size',
        'description',
        'notes',
        'scanned_copy',
        'files_change',
        'customer',
        'customer_company',
        'manufacturer',
        'product_image'
    ];
}
