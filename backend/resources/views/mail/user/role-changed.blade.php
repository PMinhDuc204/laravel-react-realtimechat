<x-mail::message>\
    Hello {{ $user->name }},

    @if ($user->is_admin)
    Your user role has been changed to Admin. You now have access to admin features and permissions.
    @else
    Your user role has been changed to Regular User. Your access to admin features and permissions has been revoked.
    @endif

    Thank you, <br>
    {{ config('app.name') }}


</x-mail::message>