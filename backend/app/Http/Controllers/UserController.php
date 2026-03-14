<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\User\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        // $rawPassword = Str::random(10);
        $rawPassword = "password";
        $data = $request->validated();
        $data['password'] = bcrypt($rawPassword);
        $data['email_verified_at'] = now();
        $user = User::create($data);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function changeRole(User $user)
    {
        $user->update(['is_admin' => !(bool) $user->is_admin]);

        $message = "User role was changed into " . ($user->is_admin ? 'Admin' : 'Regular User');

        return response()->json(['message' => $message]);
    }

    public function blockUnblock(User $user)
    {
        if ($user->blocked_at) {
            $user->blocked_at = null;
            $message = "User " . $user->name . " was Unblocked";
        } else {
            $user->blocked_at = now();
            $message = "User " . $user->name . " was Blocked";
        }
        $user->save();

        return response()->json(['message' => $message]);
    }
}
