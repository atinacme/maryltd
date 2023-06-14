<?php

namespace App\Http\Controllers;

use App\Models\user_order_data;
use App\Models\user_order_file;
use App\Models\customer;
use App\Mail\OrderMail;
use App\Mail\OrderMailCustomer;
use Mail;
use Illuminate\Http\Request;

class UserOrderDataController extends Controller
{
    public function UserOrderCreateAndUpdate(Request $req) {
        if ($req->order_id) {
            $allowedfileExtension=['pdf', 'doc', 'docx', 'jpg', 'png', 'xlsx', 'xls', 'xml', 'mp4', 'mp3'];
            if($req->scanned_copy) {
                $userOrderData = user_order_data::find($req->order_id);
                $userOrderData->status=$req->status;
                $userOrderData->stock_number=$req->stock_number;
                $userOrderData->quantity=$req->quantity;
                $userOrderData->karat=$req->karat;
                $userOrderData->colour=$req->colour;
                $userOrderData->size=$req->size;
                $userOrderData->description=$req->description;
                $userOrderData->notes=$req->notes;
                $userOrderData->scanned_copy=$req->hasFile('scanned_copy') ? "yes" : "no";
                $userOrderData->customer=$req->customer;
                $userOrderData->customer_company=$req->customer_company;
                $userOrderData->manufacturer=$req->manufacturer;
                $userOrderData->files_change=rand(1231,7879);
                $userOrderData->product_image=$req->product_image;
                $userOrderData->save();
                $fileToDelete = new user_order_file;
                $fileToDelete::where('user_order_data_id', $req->order_id)->delete();
                foreach($req->scanned_copy as $mediaFiles) {
                    $extension = $mediaFiles->getClientOriginalExtension();
                    $check = in_array($extension,$allowedfileExtension);
                    if($check && $req->order_id) {
                        $path = $mediaFiles->store('public/files');
                        $name = $mediaFiles->getClientOriginalName();
                        $fileName = time().'_'.$mediaFiles->getClientOriginalName();
                        $fileModel = new user_order_file;
                        $filePath = $mediaFiles->storeAs('files', $name, 'public');
                        $fileModel->user_order_data_id = $req->order_id;
                        $fileModel->filenames = $name;
                        $fileModel->filepath = '/storage/' . $filePath;
                        $fileModel->save();
                    } else {
                        return response()->json(['invalid_file_format'], 422);
                    }
                }
            } else {
                $userOrderData = user_order_data::find($req->order_id);
                $userOrderData->status=$req->status;
                $userOrderData->stock_number=$req->stock_number;
                $userOrderData->quantity=$req->quantity;
                $userOrderData->karat=$req->karat;
                $userOrderData->colour=$req->colour;
                $userOrderData->size=$req->size;
                $userOrderData->description=$req->description;
                $userOrderData->notes=$req->notes;
                $userOrderData->customer=$req->customer;
                $userOrderData->customer_company=$req->customer_company;
                $userOrderData->manufacturer=$req->manufacturer;
                $userOrderData->product_image=$req->product_image;
                $userOrderData->save();
            }
            return response()->json(['result'=>"User Order Updated Successfully", 'changes'=>$userOrderData->getChanges(), 'status'=>200]);
        } else {
            $userOrderData = new user_order_data;
            $userOrderData->name=$req->name;
            $userOrderData->status=$req->status;
            $userOrderData->stock_number=$req->stock_number;
            $userOrderData->quantity=$req->quantity;
            $userOrderData->karat=$req->karat;
            $userOrderData->colour=$req->colour;
            $userOrderData->size=$req->size;
            $userOrderData->description=$req->description;
            $userOrderData->notes=$req->notes;
            $userOrderData->scanned_copy=$req->hasFile('scanned_copy') ? "yes" : "no";
            $userOrderData->customer=$req->customer;
            $userOrderData->customer_company=$req->customer_company;
            $userOrderData->manufacturer=$req->manufacturer;
            $userOrderData->product_image=$req->product_image;
            $userOrderData->save();
            $allowedfileExtension=['pdf', 'doc', 'docx', 'jpg', 'png', 'jpeg', 'xlsx', 'xls', 'xml', 'mp4', 'mp3'];
            if($req->hasFile('scanned_copy')) {
                foreach($req->scanned_copy as $mediaFiles) {
                    $extension = $mediaFiles->getClientOriginalExtension();
                    $check = in_array($extension,$allowedfileExtension);
                    if($check && $userOrderData->id) {
                        $path = $mediaFiles->store('public/files');
                        $name = $mediaFiles->getClientOriginalName();
                        $fileModel = new user_order_file;
                        $fileName = time().'_'.$mediaFiles->getClientOriginalName();
                        $filePath = $mediaFiles->storeAs('files', $name, 'public');
                        $fileModel->user_order_data_id = $userOrderData->id;
                        $fileModel->filenames = $name;
                        $fileModel->filepath = '/storage/' . $filePath;
                        $fileModel->save();
                    } else {
                        return response()->json(['invalid_file_format'], 422);
                    }
                }
            }
            return response()->json(['data'=>$userOrderData, 'result'=>"User Order Created Successfully", 'status'=>200]);
        }
    }

    public function GetUserOrderData(Request $req,$per_page='10',$order_field='id',$order_type='asc',$searchField='id',$searchData="") {
        if($searchData != ""){
            $Alldata =  user_order_data::where($searchField,'like','%'.$searchData.'%')->orderBy("$order_field","$order_type")->paginate($per_page);
        } else {
            $Alldata =  user_order_data::orderBy("$order_field","$order_type")->paginate($per_page);
        }
        return response()->json(['data'=> $Alldata, 'status'=>200]);
    }

    public function GetUserOrderDataExceptComplete(Request $req,$per_page='15',$order_field='id',$order_type='asc',$searchField='status',$searchData="completed") {
        if($searchData != ""){
            $Alldata =  user_order_data::where($searchField, "!=", $searchData)->orderBy("$order_field","$order_type")->paginate($per_page);
            //  $Alldata =  user_order_data::orderBy("$order_field","$order_type")->paginate($per_page);
        } else {
            $Alldata =  user_order_data::orderBy("$order_field","$order_type")->paginate($per_page);
        }
        return response()->json(['data'=> $Alldata, 'status'=>200]);
    }

    public function UserOrderUpdate(Request $req) {
        $userOrderData = new user_order_data;
        $customerData = new customer;
        $res="";
        $result="";
        $customerEmail;
        foreach($req->order_id as $arr) {
            $res = $userOrderData::where('id', $arr)->update(['status'=> $req->status]);
            if ($req->status == "completed" && $req->email_notify == true) {
                $res = $userOrderData::where ('id', '=', $arr)->first();
                $customerName = $res->customer;
                $customerEmail = $customerData::where('company', $customerName)->first();
                $email = $customerEmail->email;
                Mail::to($email)->send(new OrderMailCustomer($res));
            }
            if ($res) {
                $result = "All Orders Updated Successfully";
            } else {
                $result = "All Orders Already Updated";
            }
        }
        return response()->json(['result'=>$result, 'status'=>200]);
    }

    public function DeleteParticularUserOrderData(Request $req) {
        $userOrderData = new user_order_data;
        $res="";
        $result="";
        $res = $userOrderData::where('id', $req->order_id)->delete();
        if ($res) {
            $result = "Special Order Deleted Successfully";
        }
        return response()->json(['result'=>$result, 'status'=>200]);
    }
}

?>