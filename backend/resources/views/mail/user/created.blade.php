<x-mail::message>

    Hello {{ $user->name }},
    Your account has been created successfully. You can now log in using the following credentials:

    Email: {{ $user->email }} <br>
    Password: {{ $password }}

    Please change your password after logging in for the first time.

    <x-mail::button url="{{ url('/login') }}">
        Click Here to Login
    </x-mail::button>
    Thank you, <br>
    {{ config('app.name') }}

</x-mail::message>