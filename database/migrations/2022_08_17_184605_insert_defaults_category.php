<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $categories = ["Urgent", "Medium", "Unimportant"];
        foreach ($categories as $category) {
            \Illuminate\Support\Facades\DB::table("category")->insert(["name" => $category]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Illuminate\Support\Facades\DB::table("category")->delete();
    }
};
