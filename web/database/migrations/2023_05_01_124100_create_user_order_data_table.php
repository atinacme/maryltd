<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserOrderDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_order_data', function (Blueprint $table) {
           $table->id();
            $table->string('name')->nullable();
            $table->string('status')->nullable();
            $table->string('stock_number')->nullable();
            $table->string('quantity')->nullable();
            $table->string('karat')->nullable();
            $table->string('colour')->nullable();
            $table->string('size')->nullable();
            $table->string('description')->nullable();
            $table->string('notes')->nullable();
            $table->string('scanned_copy')->nullable();
            $table->string('files_change')->nullable();
            $table->string('customer')->nullable();
            $table->string('customer_company')->nullable();
            $table->string('manufacturer')->nullable();
            $table->string('product_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_order_data');
    }
}
