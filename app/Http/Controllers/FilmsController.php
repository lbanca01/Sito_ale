<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Film;

class FilmsController extends Controller
{
     public function index() {

        return Film::all();
     }

     public function row(int $id) {
        return Film::find($id);
     }

    public function store() {
        request()->validate([
            'text' => 'required',
            'desc' => 'nullable',
            'seen' => 'required',
        ]);
        
        return Film::create([
            'text' => request('text'),
            'desc' => request('desc'),
            'seen' => request('seen'),
        ]);
    }

    public function update(Film $film) {
        request()->validate([
            'text' => 'required',
            'desc' => 'nullable',
            'seen' => 'required',
        ]);

        $success = $film->update([
            'text' => request('text'),
            'desc' => request('desc'),
            'seen' => request('seen'),
        ]);

        return [ 'success' => $success ];
    }

    public function destroy(Film $film) {
      $success = $film->delete();

      return [ 'success' => $success ];
    }
}
