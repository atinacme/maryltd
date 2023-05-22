<?php

namespace App\Http\Controllers;

use App\Models\new_task_activities;
use Illuminate\Http\Request;

class NewTaskActivitiesController extends Controller
{
    
    public function NewTaskActivityCreate(Request $req) {
        foreach($req->array_activity as $activities) {
            $newTaskActivity = new new_task_activities;
            $newTaskActivity->new_task_id = $req->new_task_id;
            $newTaskActivity->user = $activities["user"];
            $newTaskActivity->action = $activities["action"];
            $newTaskActivity->time = $activities["time"];
            $newTaskActivity->save();
        }
        return response()->json(['result'=>$newTaskActivity, 'status'=>200]);
    }

    public function GetNewTaskActivityData(Request $req,$new_task_id,$per_page='10',$order_field='id',$order_type='asc',$searchField='',$searchData="") {
        if($searchData != ""){
            $Alldata =  new_task_activities::where($searchField,'like','%'.$searchData.'%')->where("new_task_id", $new_task_id)->orderBy("$order_field","$order_type")->paginate($per_page);
        } else {
            $Alldata =  new_task_activities::where("new_task_id", $new_task_id)->orderBy("$order_field","$order_type")->paginate($per_page);
        }
        return response()->json(['data'=> $Alldata, 'status'=>200]);
    }
}
