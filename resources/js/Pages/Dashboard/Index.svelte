<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  // const route = window.route
  $title = 'Dashboard'
</script>

<h1 class="mb-8 text-3xl font-bold">Ping CRM <span class="text-gray-500">(Svelte &amp; Vite)</span> - Dashboard</h1>
<p class="mb-8 leading-normal">
  Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how <a
    class="text-indigo-500 underline hover:text-orange-600"
    href="https://inertiajs.com">
    Inertia.js
  </a> works.
</p>

<p class="mb-8 leading-normal">This is a fork of <a href="https://github.com/inertiajs/pingcrm-svelte" target="_blank" title="a fork of Inertia JS's PingCRM Svelte app" class="text-indigo-500 underline hover:text-orange-600">Ping CRM</a> app created by Inertia.js with <a href="https://vitejs.dev/" title="more information about ViteJS" target="_blank" class="text-indigo-500 underline hover:text-orange-600">Vite</a> support instead of Webpack / Mix.</p>
