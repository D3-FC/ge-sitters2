<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAdditionalInfoToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->string('first_name')->default('')->after('id');
            $table->string('last_name')->default('')->after('first_name');
            $table->string('phone')->default('')->after('last_name');
            $table->string('city')->default('')->after('phone');
            $table->boolean('notify_sms')->default(false)->after('city');
            $table->boolean('notify_email')->default(false)->after('notify_sms');
            $table->boolean('notify_cabinet')->default(false)->after('notify_email');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name');
            $table->dropColumn([
                'first_name',
                'last_name',
                'phone',
                'city',
                'notify_sms',
                'notify_email',
                'notify_cabinet',
            ]);
        });
    }
}
