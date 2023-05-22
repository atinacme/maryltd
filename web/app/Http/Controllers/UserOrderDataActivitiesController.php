<?php

namespace App\Http\Controllers;

use App\Models\user_order_data_activities;
use Illuminate\Http\Request;

class UserOrderDataActivitiesController extends Controller
{
    public function UserOrderDataActivityCreate(Request $req) {
        foreach($req->array_activity as $activities) {
            $userOrderDataActivity = new user_order_data_activities;
            $userOrderDataActivity->user_order_data_id = $req->user_order_data_id;
            $userOrderDataActivity->user = $activities["user"];
            $userOrderDataActivity->action = $activities["action"];
            $userOrderDataActivity->time = $activities["time"];
            $userOrderDataActivity->save();
        }
        return response()->json(['result'=>$userOrderDataActivity, 'status'=>200]);
    }

    public function GetUserOrderActivityData(Request $req,$user_order_data_id,$per_page='10',$order_field='id',$order_type='asc',$searchField='',$searchData="") {
        if($searchData != ""){
            $Alldata =  user_order_data_activities::where($searchField,'like','%'.$searchData.'%')->where("user_order_data_id", $user_order_data_id)->orderBy("$order_field","$order_type")->paginate($per_page);
        } else {
            $Alldata =  user_order_data_activities::where("user_order_data_id", $user_order_data_id)->orderBy("$order_field","$order_type")->paginate($per_page);
        }
        return response()->json(['data'=> $Alldata, 'status'=>200]);
    }
}
