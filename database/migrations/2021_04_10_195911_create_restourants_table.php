<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestourantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restourants', function (Blueprint $table) {
            $table->id();
            $table->string("text");  
            $table->string("desc")->nullable();
            $table->string("seen");
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
        Schema::dropIfExists('restourants');
    }
}
