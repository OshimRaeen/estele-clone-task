<?php

use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::get('/products', function () {
    // Fetch all products that are currently in stock
    return Product::where('is_in_stock', true)->get();
});