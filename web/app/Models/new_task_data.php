<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class new_task_data extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'status',
        'company',
        'order_placed_by',
        'order_type',
        'shipping_method',
        'ship_date',
        'order_details',
        'internal_notes',
        'attachments',
        'files_change'
    ];
}
