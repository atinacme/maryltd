<?php

namespace App\Http\Controllers;

use App\Models\new_task_file;
use Illuminate\Http\Request;

class NewTaskFileController extends Controller
{
    public function GetAllNewTaskFiles(Request $req) {
        $File = new new_task_file;
        $files = $File::where('new_task_id', $req->new_task_id)->get();
        return response()->json(['data'=>$files,'status'=>200]);
    }
}
