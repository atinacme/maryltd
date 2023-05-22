<?php

namespace App\Http\Controllers;

use App\Models\manufacturer;
use App\Models\user_order_data;
use App\Mail\OrderMail;
use Mail;
use Illuminate\Http\Request;

class ManufacturerController extends Controller
{
    public function ManufacturerCreate(Request $req) {
        $manufacturerData = new manufacturer;
        $manufacturerData->company=$req->company;
        $manufacturerData->tag=$req->tag;
        $manufacturerData->contact=$req->contact;
        $manufacturerData->phone=$req->phone;
        $manufacturerData->phone_ext=$req->phone_ext;
        $manufacturerData->phone_other_1=$req->phone_other_1;
        $manufacturerData->phone_other_2=$req->phone_other_2;
        $manufacturerData->phone_other_3=$req->phone_other_3;
        $manufacturerData->fax=$req->fax;
        $manufacturerData->toll_free=$req->toll_free;
        $manufacturerData->toll_free_ext=$req->toll_free_ext;
        $manufacturerData->cell=$req->cell;
        $manufacturerData->home_phone=$req->home_phone;
        $manufacturerData->department=$req->department;
        $manufacturerData->address=$req->address;
        $manufacturerData->address_line_2=$req->address_line_2;
        $manufacturerData->address_line_3=$req->address_line_3;
        $manufacturerData->city=$req->city;
        $manufacturerData->province=$req->province;
        $manufacturerData->country=$req->country;
        $manufacturerData->postal_code=$req->postal_code;
        $manufacturerData->email=$req->email;
        $manufacturerData->email_other_1=$req->email_other_1;
        $manufacturerData->email_other_2=$req->email_other_2;
        $manufacturerData->email_other_3=$req->email_other_3;
        $manufacturerData->email_other_4=$req->email_other_4;
        $manufacturerData->email_other_5=$req->email_other_5;
        $manufacturerData->website=$req->website;
        $manufacturerData->shipping_acc=$req->shipping_acc;
        $manufacturerData->notes=$req->notes;
        $result="";
        $res=$manufacturerData->save();
        if ($res) {
            $result="Manufacturer Created Successfully";
        }
        return response()->json(['data'=>$manufacturerData, 'result'=>$result,'status'=>200]);
    }

    public function GetDataManufacturer(Request $res,$per_page='10',$order_field='id',$order_type='asc',$searchField='id',$searchData=""){
        if($searchData != ""){
            $data = manufacturer::where($searchField,'like','%'.$searchData.'%')->orderBy("$order_field","$order_type")->paginate($per_page);
        } else {
            $data = manufacturer::orderBy("$order_field","$order_type")->paginate($per_page);    
        }
        return response()->json(['data'=>$data,'status'=>200]); 
    }

    public function GetDataManufacturerApi(Request $res,$order_field='id',$order_type='asc',$searchField='id',$searchData=""){
        if($searchData != ""){
            $data = manufacturer::where($searchField,'like','%'.$searchData.'%')->orderBy("$order_field","$order_type")->get();
        } else {
            $data = manufacturer::orderBy("$order_field","$order_type")->get();    
        }
        return response()->json(['data'=>$data,'status'=>200]); 
    }

    public function UpdateParticularManufacturerData(Request $req) {
        $manuData = new manufacturer;
        $res="";
        $result="";
        $res = $manuData::where('id', $req->manufacturer_id)->update([
            'company'=>$req->company,
            'tag'=>$req->tag,
            'contact'=>$req->contact,
            'phone'=>$req->phone,
            'phone_ext'=>$req->phone_ext,
            'phone_other_1'=>$req->phone_other_1,
            'phone_other_2'=>$req->phone_other_2,
            'phone_other_3'=>$req->phone_other_3,
            'fax'=>$req->fax,
            'toll_free'=>$req->toll_free,
            'toll_free_ext'=>$req->toll_free_ext,
            'cell'=>$req->cell,
            'home_phone'=>$req->home_phone,
            'department'=>$req->department,
            'address'=>$req->address,
            'address_line_2'=>$req->address_line_2,
            'address_line_3'=>$req->address_line_3,
            'city'=>$req->city,
            'province'=>$req->province,
            'country'=>$req->country,
            'postal_code'=>$req->postal_code,
            'email'=>$req->email,
            'email_other_1'=>$req->email_other_1,
            'email_other_2'=>$req->email_other_2,
            'email_other_3'=>$req->email_other_3,
            'email_other_4'=>$req->email_other_4,
            'email_other_5'=>$req->email_other_5,
            'website'=>$req->website,
            'shipping_acc'=>$req->shipping_acc,
            'notes'=>$req->notes
        ]);
        if ($res) {
            $result = "Manufacturer Updated Successfully";
        } else {
            $result = "Manufacturer Already Updated";
        }
        return response()->json(['result'=>$result, 'status'=>200]);
    }

    public function DeleteParticularManufacturerData(Request $req) {
        $manuData = new manufacturer;
        $res="";
        $result="";
        $res = $manuData::where('id', $req->manufacturer_id)->delete();
        if ($res) {
            $result = "Manufacturer Deleted Successfully";
        }
        return response()->json(['result'=>$result, 'status'=>200]);
    }
    
    public function EmailParticularManufacturer(Request $req) {
        $userOrderData = new user_order_data;
        $manuData = new manufacturer;
        $res="";
        $email = "";
        if($req->manufacturer_name) {
            $res = $userOrderData::where('manufacturer', $req->manufacturer_name)->get();
            $manuName=$req->manufacturer_name;
            $email = $manuData::where('company', $manuName)->get();
        } else {
            $res = $userOrderData::where('id', '=', $req->id)->get();
            $manuName=$res[0]->manufacturer;
            $email = $manuData::where('company', $manuName)->get();
        }
        Mail::to($email[0]->email)->send(new OrderMail($res));
        return response()->json(['result'=>$res, 'mail_status'=>'mail sent successfully', 'status'=>200]);
    }
}
