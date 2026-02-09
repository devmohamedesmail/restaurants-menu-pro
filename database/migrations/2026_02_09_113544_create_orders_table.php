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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
               $table->foreignId('store_id')->constrained('stores')->nullable();
            $table->foreignId('user_id')->constrained('users')->nullable();
            $table->foreignId('table_id')->nullable()->constrained('tables')->onDelete('set null');
            $table->string('table')->nullable();
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending')->nullable();
            $table->string('total')->nullable();
            $table->json('order')->nullable();
            $table->longText('name')->nullable();
            $table->longText('address')->nullable();
            $table->longText('phone')->nullable();
            $table->longText('location')->nullable();
            $table->longText('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
