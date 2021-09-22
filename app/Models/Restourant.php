<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restourant extends Model
{
    use HasFactory;

    protected $fillable = [
        "text", "desc", "seen",
    ];
}
