<!DOCTYPE html>
<html class="h-full bg-gray-100">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <title>{{ config('app.name', 'Laravel') }}</title>

    @viteserver
      <script type="module" src="http://localhost:3000/@vite/client" ></script>
      <script type="module" src="http://localhost:3000/resources/js/app.js" ></script>
      <script type="module" src="http://localhost:3000/resources/css/app.css"></script>
    @else
      <link href="{{ vite('app.css') }}" rel="stylesheet">
      <script type="module" src="{{ vite('app.js') }}"></script>
    @endviteserver
    @routes
</head>
<body class="font-sans antialiased leading-none text-gray-700">

@inertia

</body>
</html>
