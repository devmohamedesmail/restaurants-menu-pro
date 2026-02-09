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
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
             $table->foreignId('user_id')->constrained('users');
            $table->foreignId('country_id')->constrained('countries')->cascadeOnDelete();
            $table->string('name')->unique()->nullable();
            $table->string('slug')->unique()->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->longText('image')->nullable();
            $table->longText('description')->nullable();
            $table->longText('banner')->nullable();
            $table->boolean('is_active')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
