<?php

namespace App\Http\Controllers;

use App\Models\user_order_file;
use Illuminate\Http\Request;

class UserOrderFileController extends Controller
{
    public function GetAllUserOrderFiles(Request $req) {
        $File = new user_order_file;
        $files = $File::where('user_order_data_id', $req->user_order_data_id)->get();
        return response()->json(['data'=>$files,'status'=>200]);
    }
}
