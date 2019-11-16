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
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ])->validate();

        $user = $this->createUser($request);

        event(new Registered($user));

        Auth::guard()->login($user);

        return $user;
    }


    private function createUser(Request $request): User
    {
        $user           = new User();
        $user->name     = $request->input('name');
        $user->email    = $request->input('email');
        $user->password = \Hash::make($request->input('password'));
        $user->save();

        return $user;
    }
}
