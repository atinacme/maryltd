<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class new_task_activities extends Model
{
    use HasFactory;

    protected $fillable = [
        'new_task_id',
        'user',
        'action',
        'time'
    ];
}
