<?php

namespace App\Http\Controllers;

use App\Ad;
use App\Child;
use App\Repositories\AdRepo;
use Illuminate\Http\Request;

class AdController extends Controller
{

    /**
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(Request $request)
    {
        \Validator::make($request->all(), [
            'starts_at'           => 'date|after:today|required',
            'ends_at'             => 'date|after:starts_at|required',
            'coords_x'            => 'numeric|required',
            'coords_y'            => 'numeric|required',
            'children'            => 'array|required',
        ])->validate();

        $ad            = new Ad();
        $ad->starts_at = $request->input('starts_at');
        $ad->ends_at   = $request->input('ends_at');
        $ad->coords_x  = $request->input('coords_x');
        $ad->coords_y  = $request->input('coords_y');
        $ad->save();

        $ad->createChildrenFromArray($request->get('children'));
        $ad->load('children');

        return $ad;
    }


    /**
     * @param AdRepo $adRepo
     * @param Request $request
     * @throws \Exception
     */
    public function destroy(AdRepo $adRepo, Request $request)
    {
        $adRepo->destroy($request->input('id'));
    }


    public function getPaginated(AdRepo $adRepo, Request $request)
    {
        return Ad::with(['children'])->paginate(50);
    }
}
