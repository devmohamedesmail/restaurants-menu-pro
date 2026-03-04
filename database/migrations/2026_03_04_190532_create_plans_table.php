<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name_en');
            $table->string('name_ar');

            $table->text('description_en')->nullable();
            $table->text('description_ar')->nullable();

            $table->string('slug')->unique();

            $table->decimal('price', 8, 2);

            $table->enum('interval', ['monthly', 'quarterly', 'yearly']);
            $table->integer('duration_days');

            $table->integer('max_menus')->default(1);
            $table->integer('max_categories')->default(5);
            $table->integer('max_items')->default(50);

            $table->boolean('custom_domain')->default(false);
            $table->boolean('qr_code')->default(true);

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
