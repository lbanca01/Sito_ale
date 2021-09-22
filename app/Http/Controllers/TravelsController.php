<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Travel;

class TravelsController extends Controller
{
    public function index() {

        return Travel::all();
    }
    
    public function row(int $id) {
        return Film::find($id);
    }

    public function store() {
        request()->validate([
            'text' => 'required',
            'desc' => 'nullable',
        ]);
        
        return Travel::create([
            'text' => request('text'),
            'desc' => request('desc'),
        ]);
    }

    public function update(Travel $travel) {
        request()->validate([
            'text' => 'required',
            'desc' => 'nullable',
        ]);

        $success = $travel->update([
            'text' => request('text'),
            'desc' => request('desc'),
        ]);

        return [ 'success' => $success ];
    }

    public function destroy(Travel $travel) {
      $success = $travel->delete();

      return [ 'success' => $success ];
    }
}
