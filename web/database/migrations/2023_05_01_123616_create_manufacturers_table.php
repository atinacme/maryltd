<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateManufacturersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('manufacturers', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('tag')->nullable(true);
            $table->string('contact')->nullable(true);
            $table->string('phone')->nullable(true);
            $table->string('phone_ext')->nullable(true);
            $table->string('phone_other_1')->nullable(true);
            $table->string('phone_other_2')->nullable(true);
            $table->string('phone_other_3')->nullable(true);
            $table->string('fax')->nullable(true);
            $table->string('toll_free')->nullable(true);
            $table->string('toll_free_ext')->nullable(true);
            $table->string('cell')->nullable(true);
            $table->string('home_phone')->nullable(true);
            $table->string('department')->nullable(true);
            $table->string('address')->nullable(true);
            $table->string('address_line_2')->nullable(true);
            $table->string('address_line_3')->nullable(true);
            $table->string('city')->nullable(true);
            $table->string('province')->nullable(true);
            $table->string('country')->nullable(true);
            $table->string('postal_code')->nullable(true);
            $table->string('email')->nullable(true);
            $table->string('email_other_1')->nullable(true);
            $table->string('email_other_2')->nullable(true);
            $table->string('email_other_3')->nullable(true);
            $table->string('email_other_4')->nullable(true);
            $table->string('email_other_5')->nullable(true);
            $table->string('website')->nullable(true);
            $table->string('shipping_acc')->nullable(true);
            $table->string('notes')->nullable(true);
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
        Schema::dropIfExists('manufacturers');
    }
}
