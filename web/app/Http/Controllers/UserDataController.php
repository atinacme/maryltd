<?php

namespace App\Http\Controllers;

use App\Models\user_data;
use Illuminate\Http\Request;

class UserDataController extends Controller
{
    public function AddUserData(Request $req) {
        $userData = new user_data;
        $getUserData = user_data::where ('name', '=', $req->name)->first();
        $userData->name=$req->name;
        $userData->email=$req->email;
        $userData->shop_owner=$req->shop_owner;
        $userData->email_verified_at=$req->email_verified_at;
        $userData->password=$req->password;
        $userData->shopify_grandfathered=$req->shopify_grandfathered;
        $userData->shopify_namespace=$req->shopify_namespace;
        $userData->shopify_freemium=$req->shopify_freemium;
        $userData->plan_id=$req->plan_id;
        $userData->deleted_at=$req->deleted_at;
        $result="";
        if($getUserData == null){
            $res=$userData->save();
            if ($res) {
                $result="User Created Successfully";
            }
        } else {
            $res=user_data::where('name', $req->name)->update(['name' => $req->name, 'email' => $req->email, 'shop_owner' => $req->shop_owner, 'email_verified_at' => $req->email_verified_at, 'password' => $req->password, 'shopify_grandfathered' => $req->shopify_grandfathered, 'shopify_namespace' => $req->shopify_namespace, 'shopify_freemium' => $req->shopify_freemium, 'plan_id' => $req->plan_id, 'deleted_at' => $req->deleted_at]);
            if ($res) { 
                $result="User Updated Successfully";
            } else {
                $result="User Retrieved Successfully";
            }
        }
        return response()->json(['result'=>$result, 'status'=>200]);
    }

    public function GetProductsAll(Request $req){
        $api_key = env('SHOPIFY_API_KEY');
        $getUserData =  user_data::where ('name', '=', $req->store)->first();
        $pass = $getUserData->password;
        $shop = $getUserData->name;
        $url = 'https://'.$api_key.':'.$pass.'@'.$shop.'/admin/api/2021-10/products.json';
        $client = new \GuzzleHttp\Client();
        $request = $client->get($url);
        $response = $request->getBody()->getContents();
        $data = json_decode($response);
        return response()->json(['message'=>$data]);
    }

    public function GetUserData() {
        $userData = user_data::get();
        return response()->json(['data'=>$userData, 'status'=>200]);
    }

    public function getShopData(Request $req){
           return response()->json(['data'=>$req->All(),'status'=>200]); 
        $api_key = env('SHOPIFY_API_KEY');
        $getUserData =  user_data::where ('name', '=', $req->name)->first();
        $pass = $getUserData->access_token;
        $shop = $getUserData->name;
        $url = 'https://'.$api_key.':'.$pass.'@'.$shop.'/admin/api/2022-04/shop.json';
        $client = new \GuzzleHttp\Client();
        $request = $client->get($url);
        $response = $request->getBody()->getContents();
        $json = json_decode($response, true);
        return response()->json(['data'=>$json,'status'=>200]); 
    }
}

?>