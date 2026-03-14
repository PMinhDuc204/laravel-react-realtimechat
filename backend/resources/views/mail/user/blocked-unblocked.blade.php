<x-mail::message>

    Hello {{ $user->name }},

    @if ($user->blocked_at)
    Your account has been blocked. Please contact support for more information.
    @else
    Your account has been unblocked. You can now log in using your existing credentials.

    <x-mail::button url="{{ url('/login') }}">
        Click Here to Login
    </x-mail::button>
    @endif


    Thank you, <br>
    {{ config('app.name') }}

</x-mail::message>