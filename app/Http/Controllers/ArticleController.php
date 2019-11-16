<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{

    public function getPaginated(Request $request)
    {
        return Article::paginate(50);
    }


    public function create(Request $request)
    {
        $a          = new Article();
        $a->content = $request->input('content');
        $a->save();

        return $a;
    }


    public function destroy(Request $request)
    {
        Article::destroy($request->input('id'));
    }
}
