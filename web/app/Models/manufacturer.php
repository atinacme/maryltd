<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class manufacturer extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'company',
        'tag',
        'contact',
        'phone',
        'phone_ext',
        'phone_other_1',
        'phone_other_2',
        'phone_other_3',
        'fax',
        'toll_free',
        'toll_free_ext',
        'cell',
        'home_phone',
        'department',
        'address',
        'address_line_2',
        'address_line_3',
        'city',
        'province',
        'country',
        'postal_code',
        'email',
        'email_other_1',
        'email_other_2',
        'email_other_3',
        'email_other_4',
        'email_other_5',
        'website',
        'shipping_acc',
        'notes'
    ];
}
