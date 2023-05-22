<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class staff_member extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop',
        'shop_owner',
        'staff_member',
        'email',
        'password'
    ];
}
