<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewTaskDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('new_task_data', function (Blueprint $table) {
            $table->id();
            $table->string('status')->nullable();
            $table->string('company')->nullable();
            $table->string('order_placed_by')->nullable();
            $table->string('order_type')->nullable();
            $table->string('shipping_method')->nullable();
            $table->string('ship_date')->nullable();
            $table->string('order_details')->nullable();
            $table->string('internal_notes')->nullable();
            $table->string('attachments')->nullable();
            $table->string('files_change')->nullable();
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
        Schema::dropIfExists('new_task_data');
    }
}
