<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('from_id')->unsigned()->nullable();
            $table->bigInteger('to_id')->unsigned()->nullable();

            $table->string('content')->default('');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('from_id')
                  ->on('users')
                  ->references('id')
                  ->onDelete('SET NULL')
                  ->onUpdate('SET NULL');
            $table->foreign('to_id')
                  ->on('users')
                  ->references('id')
                  ->onDelete('SET NULL')
                  ->onUpdate('SET NULL');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
