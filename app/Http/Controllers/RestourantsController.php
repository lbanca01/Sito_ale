<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restourant;

class RestourantsController extends Controller
{
    public function index() {

        return Restourant::all();
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
        
        return Restourant::create([
            'text' => request('text'),
            'desc' => request('desc'),
            'seen' => request('seen'),
        ]);
    }

    public function update(Restourant $restourant) {
        request()->validate([
            'text' => 'required',
            'desc' => 'nullable',
            'seen' => 'required',
        ]);

        $success = $restourant->update([
            'text' => request('text'),
            'desc' => request('desc'),
            'seen' => request('seen'),
        ]);

        return [ 'success' => $success ];
    }

    public function destroy(Restourant $restourant) {
      $success = $restourant->delete();

      return [ 'success' => $success ];
    }
}
