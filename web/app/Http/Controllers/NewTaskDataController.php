<?php

namespace App\Http\Controllers;

use App\Models\new_task_data;
use App\Models\new_task_file;
use Illuminate\Http\Request;

class NewTaskDataController extends Controller
{
    public function NewTaskCreateAndUpdate(Request $req) {
        if ($req->new_task_id) {
            $allowedfileExtension=['pdf', 'doc', 'docx', 'jpg', 'png', 'xlsx', 'xls', 'xml'];
            if($req->attachments) {
                $newTaskData = new_task_data::find($req->new_task_id);
                $newTaskData->status=$req->status;
                $newTaskData->company=$req->company;
                $newTaskData->order_placed_by=$req->order_placed_by;
                $newTaskData->order_type=$req->order_type;
                $newTaskData->shipping_method=$req->shipping_method;
                $newTaskData->ship_date=$req->ship_date;
                $newTaskData->order_details=$req->order_details;
                $newTaskData->internal_notes=$req->internal_notes;
                $newTaskData->attachments=$req->hasFile('attachments') ? "yes" : "no";
                $newTaskData->files_change=rand(1231,7879);
                $newTaskData->save();
                $fileToDelete = new new_task_file;
                $fileToDelete::where('new_task_id', $req->new_task_id)->delete();
                foreach($req->attachments as $mediaFiles) {
                    $extension = $mediaFiles->getClientOriginalExtension();
                    $check = in_array($extension,$allowedfileExtension);
                    if($check && $req->new_task_id) {
                        $path = $mediaFiles->store('public/files');
                        $name = $mediaFiles->getClientOriginalName();
                        $fileName = time().'_'.$mediaFiles->getClientOriginalName();
                        $fileModel = new new_task_file;
                        $filePath = $mediaFiles->storeAs('files', $name, 'public');
                        $fileModel->new_task_id = $req->new_task_id;
                        $fileModel->filenames = $name;
                        $fileModel->filepath = '/storage/' . $filePath;
                        $fileModel->save();
                    } else {
                        return response()->json(['invalid_file_format'], 422);
                    }
                }
            } else {
                $newTaskData = new_task_data::find($req->new_task_id);
                $newTaskData->status=$req->status;
                $newTaskData->company=$req->company;
                $newTaskData->order_placed_by=$req->order_placed_by;
                $newTaskData->order_type=$req->order_type;
                $newTaskData->shipping_method=$req->shipping_method;
                $newTaskData->ship_date=$req->ship_date;
                $newTaskData->order_details=$req->order_details;
                $newTaskData->internal_notes=$req->internal_notes;
                $newTaskData->save();
            }
            return response()->json(['result'=>"New Task Updated Successfully", 'changes'=>$newTaskData->getChanges(), 'status'=>200]);
        } else {
            $newTaskData = new new_task_data;
            $result="";
            $newTaskData->status=$req->status;
            $newTaskData->company=$req->company;
            $newTaskData->order_placed_by=$req->order_placed_by;
            $newTaskData->order_type=$req->order_type;
            $newTaskData->shipping_method=$req->shipping_method;
            $newTaskData->ship_date=$req->ship_date;
            $newTaskData->order_details=$req->order_details;
            $newTaskData->internal_notes=$req->internal_notes;
            if($req->hasFile('attachments')) {
                $newTaskData->attachments="yes";
            } else {
                $newTaskData->attachments="no";
            }
            $result = $newTaskData->save();
            $allowedfileExtension=['pdf', 'doc', 'docx', 'jpg', 'png', 'xlsx', 'xls', 'xml'];
            if($req->hasFile('attachments')) {
                foreach($req->attachments as $mediaFiles) {
                    $extension = $mediaFiles->getClientOriginalExtension();
                    $check = in_array($extension,$allowedfileExtension);
                    if($check && $newTaskData->id) {
                        $path = $mediaFiles->store('public/files');
                        $name = $mediaFiles->getClientOriginalName();
                        $fileModel = new new_task_file;
                        $fileName = time().'_'.$mediaFiles->getClientOriginalName();
                        $filePath = $mediaFiles->storeAs('files', $name, 'public');
                        $fileModel->new_task_id = $newTaskData->id;
                        $fileModel->filenames = $name;
                        $fileModel->filepath = '/storage/' . $filePath;
                        $fileModel->save();
                    } else {
                        return response()->json(['invalid_file_format'], 422);
                    }
                }
            }
            return response()->json(['data'=>$newTaskData, 'result'=>"New Task Created Successfully", 'status'=>200]);
        }
    }

    public function GetParticularNewTaskData(Request $req) {
        $newTaskData = new new_task_data;
        $data = $newTaskData::where('id', $req->new_task_id)->get();
        return response()->json(['data'=>$data,'status'=>200]);
    }

    public function GetNewTaskData(Request $req,$per_page='10',$order_field='id',$order_type='asc',$searchField='id',$searchData="") {
        if($searchData != ""){
            $Alldata =  new_task_data::where($searchField,'like','%'.$searchData.'%')->orderBy("$order_field","$order_type")->paginate($per_page);
        } else {
            $Alldata =  new_task_data::orderBy("$order_field","$order_type")->paginate($per_page);
        }
        return response()->json(['data'=> $Alldata, 'status'=>200]);
    }

    public function GetNewTaskDataExceptComplete(Request $req,$per_page='15',$order_field='id',$order_type='asc',$searchField='status',$searchData="Complete") {
        if($searchData != ""){
            $Alldata =  new_task_data::where($searchField, "!=", $searchData)->orderBy("$order_field","$order_type")->paginate($per_page);
        } else {
            $Alldata =  new_task_data::orderBy("$order_field","$order_type")->paginate($per_page);
        }
        return response()->json(['data'=> $Alldata, 'status'=>200]);
    }

    public function DeleteParticularNewTask(Request $req) {
        $newTaskData = new new_task_data;
        $res="";
        $result="";
        $res = $newTaskData::where('id', $req->new_task_id)->delete();
        if ($res) {
            $result = "New Task Deleted Successfully";
        }
        return response()->json(['result'=>$result, 'status'=>200]);
    }
}
