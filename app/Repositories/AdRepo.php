<?php

namespace App\Repositories;

use App\Ad;

class AdRepo
{

    /**
     * @throws \Exception
     */
    public function destroy(int $id)
    {
        $ad = Ad::findOrFail($id);
        $ad->children()->delete();
        $ad->delete();
    }


}
