<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserDataController;
use App\Http\Controllers\UserOrderDataController;
use App\Http\Controllers\UserOrderDataActivitiesController;
use App\Http\Controllers\UserOrderFileController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\StaffMemberController;
use App\Http\Controllers\NewTaskDataController;
use App\Http\Controllers\NewTaskActivitiesController;
use App\Http\Controllers\NewTaskFileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/', function () {
    return "Hello API";
});

Route::post('/', [UserDataController::class,'AddUserData']);
Route::get('/', [UserDataController::class,'GetUserData']);
Route::post('/getShopData', [UserDataController::class,'getShopData']);
Route::post('/getAllProduct', [UserDataController::class, 'GetProductsAll']);
Route::post('/customers', [CustomerController::class,'AddCustomersData']);
Route::get('/getDataCustomer/{per_page?}/{order_field?}/{order_type?}/{searchField?}/{searchData?}', [CustomerController::class,'GetDataCustomer']);
Route::get('/getDataCustomerApi/{order_field?}/{order_type?}/{searchField?}/{searchData?}', [CustomerController::class,'GetDataCustomerApi']);
Route::post('/getParticularCustomerCompanyData', [CustomerController::class,'GetParticularCustomerCompanyData']);
Route::post('/userOrderCreateAndUpdate', [UserOrderDataController::class,'UserOrderCreateAndUpdate']);
Route::get('/getUserOrderDataExceptComplete/{per_page?}/{order_field?}/{order_type?}/{searchField?}/{searchData?}', [UserOrderDataController::class, 'GetUserOrderDataExceptComplete']);
Route::get('/getUserOrderData/{per_page?}/{order_field?}/{order_type?}/{searchField?}/{searchData?}', [UserOrderDataController::class,'GetUserOrderData']);
Route::put('/orderUpdate', [UserOrderDataController::class, 'UserOrderUpdate']);
Route::delete('/orderDelete', [UserOrderDataController::class, 'DeleteParticularUserOrderData']);
Route::post('/getAllUserOrderFiles', [UserOrderFileController::class,'GetAllUserOrderFiles']);
Route::post('/userOrderActivityCreate', [UserOrderDataActivitiesController::class, 'UserOrderDataActivityCreate']);
Route::get('/getUserOrderActivity/{user_order_data_id?}/{per_page?}/{order_field?}/{order_type?}/{searchField?}/{searchData?}', [UserOrderDataActivitiesController::class, 'GetUserOrderActivityData']);
Route::get('/getAllManufacturers/{per_page?}/{order_field?}/{order_type?}/{searchField?}/{searchData?}', [ManufacturerController::class, 'GetDataManufacturer']);
Route::get('/getAllManufacturersApi/{order_field?}/{order_type?}/{searchField?}/{searchData?}', [ManufacturerController::class,'GetDataManufacturerApi']);
Route::post('/manufacturerCreate', [ManufacturerController::class, 'ManufacturerCreate']);
Route::delete('/manufacturerDelete', [ManufacturerController::class, 'DeleteParticularManufacturerData']);
Route::post('/emailToManufacturer', [ManufacturerController::class, 'EmailParticularManufacturer']);
Route::put('/manufacturerUpdate', [ManufacturerController::class, 'UpdateParticularManufacturerData']);
Route::post('/newTaskCreateAndUpdate', [NewTaskDataController::class, 'NewTaskCreateAndUpdate']);
Route::get('/getAllNewTasks/{per_page?}/{order_field?}/{order_type?}/{searchField?}/{searchData?}', [NewTaskDataController::class, 'GetNewTaskData']);
Route::delete('/newTaskDelete', [NewTaskDataController::class, 'DeleteParticularNewTask']);
Route::post('/getParticularNewTaskData', [NewTaskDataController::class, 'GetParticularNewTaskData']);
Route::get('/getAllNewTasksExceptComplete/{per_page?}/{order_field?}/{order_type?}/{searchField?}/{searchData?}', [NewTaskDataController::class, 'GetNewTaskDataExceptComplete']);
Route::post('/getAllNewTaskFiles', [NewTaskFileController::class, 'GetAllNewTaskFiles']);
Route::post('/newTaskActivityCreate', [NewTaskActivitiesController::class, 'NewTaskActivityCreate']);
Route::get('/getNewTaskActivity/{new_task_id?}/{per_page?}/{order_field?}/{order_type?}/{searchField?}/{searchData?}', [NewTaskActivitiesController::class, 'GetNewTaskActivityData']);
Route::post('/staffMembers', [StaffMemberController::class,'AddStaffMemberData']);
Route::post('/loginStaffMemberData', [StaffMemberController::class,'LoginStaffMemberData']);
Route::post('/updateStaffMemberPassword', [StaffMemberController::class,'UpdateStaffMemberPassword']);