<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_order_data_activities extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_order_data_id',
        'user',
        'action',
        'time'
    ];
}
