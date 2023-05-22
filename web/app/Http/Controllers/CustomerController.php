<?php

namespace App\Http\Controllers;

use App\Models\Session;
use App\Models\customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function AddCustomersData(Request $req) {
        $api_key = env('SHOPIFY_API_KEY');
        $getUserData = Session::where ('shop', '=', $req->name)->first();
        $pass = $getUserData->access_token;
        $shop = $getUserData->shop;
        $cusCount = 'https://'.$api_key.':'.$pass.'@'.$shop.'/admin/api/2022-04/customers/count.json';
        $client = new \GuzzleHttp\Client();
        $requestCount = $client->get($cusCount);
        $responseCount = $requestCount->getBody()->getContents();
        $jsonCount = json_decode($responseCount, true);
        $data2 = [];
        $customer_ids;
        $json;
        customer::truncate();
            
        for($i=0; $i<=$jsonCount["count"]-1; $i++) {
            if($i == 0){
                $url = 'https://'.$api_key.':'.$pass.'@'.$shop.'/admin/api/2022-04/customers.json?limit=1&since_id=0';
                $request = $client->get($url);
                $response = $request->getBody()->getContents();
                $json = json_decode($response, true);
                $customer_id = $json["customers"][0]["id"];
                $get_cust =  customer::where("customer_id","=",$json["customers"][0]["id"])->first();
                if($get_cust === null){
                    if(count($json["customers"][0]["addresses"]) > 0){
                        array_push($data2,['customer_id'=>$json["customers"][0]["id"],'name'=>$json["customers"][0]["first_name"]." ".$json["customers"][0]["last_name"], 'email'=> $json["customers"][0]["email"], 'company'=> $json["customers"][0]["addresses"][0]["company"]]);
                    } else{
                        array_push($data2,['customer_id'=>$json["customers"][0]["id"],'name'=>$json["customers"][0]["first_name"]." ".$json["customers"][0]["last_name"], 'email'=> $json["customers"][0]["email"], 'company'=> ""]);
                    }
                }
            } else {
                $url = 'https://'.$api_key.':'.$pass.'@'.$shop.'/admin/api/2022-04/customers.json?limit=1&since_id='.$customer_id;
                $request = $client->get($url);
                $response = $request->getBody()->getContents();
                $json = json_decode($response, true);
                $customer_id = $json["customers"][0]["id"];
                $get_cust =  customer::where("customer_id","=",$json["customers"][0]["id"])->first();
                if($get_cust === null){
                    if(count($json["customers"][0]["addresses"]) > 0){
                        array_push($data2,['customer_id'=>$json["customers"][0]["id"],'name'=>$json["customers"][0]["first_name"]." ".$json["customers"][0]["last_name"], 'email'=> $json["customers"][0]["email"], 'company'=> $json["customers"][0]["addresses"][0]["company"]]);
                    } else{
                        array_push($data2,['customer_id'=>$json["customers"][0]["id"],'name'=>$json["customers"][0]["first_name"]." ".$json["customers"][0]["last_name"], 'email'=> $json["customers"][0]["email"], 'company'=> ""]);
                    }
                }
            }     
        }
        if(count($data2) > 0){
            customer::insert($data2); // Eloquent approach
            return response()->json(['data'=>$data2 ,'status'=>200]);
        } else{
            return response()->json(['data'=>"already exist" ,'status'=>200]);
        }
    }

    public function GetDataCustomer(Request $res,$per_page='10',$order_field='id',$order_type='asc',$searchField='id',$searchData=""){
        if($searchData != ""){
            $data = customer::where($searchField,'like','%'.$searchData.'%')->orderBy("$order_field","$order_type")->paginate($per_page);
        } else {
            $data = customer::orderBy("$order_field","$order_type")->paginate($per_page);    
        }
        return response()->json(['data'=>$data,'status'=>200]); 
    }

    public function GetDataCustomerApi(Request $res,$order_field='id',$order_type='asc',$searchField='id',$searchData=""){
        if($searchData != ""){
            $data = customer::where($searchField,'like','%'.$searchData.'%')->orderBy("$order_field","$order_type")->get();
        } else {
            $data = customer::orderBy("$order_field","$order_type")->get();    
        }
        return response()->json(['data'=>$data,'status'=>200]); 
    }

    public function GetParticularCustomerCompanyData(Request $req){
        $customerCompanyData = new customer;
        $data = $customerCompanyData::where('company', '=', $req->company)->get();
        return response()->json(['data'=>$data,'status'=>200]); 
    }
}
