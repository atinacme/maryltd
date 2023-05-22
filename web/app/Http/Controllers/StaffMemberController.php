<?php

namespace App\Http\Controllers;

use App\Models\staff_member;
use Mail;
use Hash;
use App\Mail\StaffMemberMail;
use Illuminate\Http\Request;

class StaffMemberController extends Controller
{
    public function AddStaffMemberData(Request $req) {
        $staffMemberData = new staff_member;
        $staffMemberData->shop=$req->shop;
        $staffMemberData->shop_owner=$req->shop_owner;
        $staffMemberData->staff_member=$req->staff_member;
        $staffMemberData->email=$req->email;
        $staffMemberData->password=Hash::make($req->password);
        $staffMemberData->save();
        $staffMemberData->appDomain=env('HOST');
        Mail::to($staffMemberData->email)->send(new StaffMemberMail($staffMemberData));
        return response()->json(['result'=>$staffMemberData, 'status'=>200]);
    }

    public function VerifyStaffMemberData(Request $req,$id, $shop) {
        $staffMemberData = new staff_member;
        $staffMemberData::where('id', $id)->update(['is_verified'=>1]);
        return Redirect()->to('https://maryltd.net/authenticate?shop='.$shop);
    }

    public function LoginStaffMemberData(Request $req){
        $staffMemberData = staff_member::where('email', $req->email)->first();
        if ($staffMemberData && Hash::check($req->password, $staffMemberData->password, [])) {
            if ($staffMemberData->is_verified === 1) {
            return response()->json(['data'=>$staffMemberData, 'result'=>'Logged In Successfully', 'status'=>200]);
            } else {
            return response()->json(['result'=>'You are not Verified as Staff Member', 'status'=>400]);
            }
        } else {
            return response()->json(['result'=>'Wrong Credentials', 'status'=>500]);
        }
    }

    public function UpdateStaffMemberPassword(Request $req) {
        $staffMemberData = new staff_member;
        $staffMemberData::where('email', $req->email)->update(['password'=>Hash::make($req->password)]);
        return response()->json(['result'=>$staffMemberData, 'status'=>200]);
    }
}
