<?php

namespace App\Http\Controllers;

use App\User;
use Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Validator;

class UserController extends Controller
{

    /**
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(Request $request)
    {
        Validator::make($request->all(), [
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ])->validate();

        $user = $this->createUser($request);

        event(new Registered($user));

        Auth::guard()->login($user);

        return $user;
    }


    public function update(Request $request)
    {
        $id   = $request->input('id');
        $user = User::findOrFail($id);

        $this->fillRequiredToUser($user, $request);
        $user->first_name = $request->input('first_name');
        $user->last_name  = $request->input('last_name');
        $user->city       = $request->input('city');
        $user->phone      = $request->input('phone');
        $user->notify_sms      = $request->input('notify_sms');
        $user->notify_email      = $request->input('notify_email');
        $user->notify_cabinet      = $request->input('notify_cabinet');
        $user->save();

        return $user;
    }


    private function createUser(Request $request): User
    {
        $user = new User();
        $this->fillRequiredToUser($user, $request);
        $user->save();

        return $user;
    }


    private function fillRequiredToUser(User $user, Request $request)
    {
        $user->email    = $request->input('email');
        $user->password = \Hash::make($request->input('password'));
    }
}
