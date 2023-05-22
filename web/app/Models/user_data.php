<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_data extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'shop_owner',
        'email_verified_at',
        'password',
        'shopify_grandfathered',
        'shopify_namespace',
        'shopify_freemium',
        'plan_id',
        'deleted_at',
        'password_updated_at'
    ];
}
