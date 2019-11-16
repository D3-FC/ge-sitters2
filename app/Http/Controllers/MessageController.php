<?php

namespace App\Http\Controllers;

use App\Message;
use App\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    /**
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(Request $request)
    {
        \Validator::make($request->all(), [
            'content' => 'required|max:10000|string|nullable'
        ])->validate();

        $m = new Message();
        $this->fillMessage($m, $request);
        $m->save();

        return $m;
    }


    public function destroy(Request $request)
    {
        Message::destroy($request->input('id'));
    }


    public function getPaginated(Request $request)
    {
        return Message::with(['from', 'to'])->paginate(50);
    }


    private function fillMessage(Message $m, Request $request)
    {
        $currentUser = \Auth::user();
        $toUser      = User::findOrFail($request->input('to_id'));

        $m->content = $request->input('content');
        $m->from()->associate($currentUser);
        $m->to()->associate($toUser);
    }


}
