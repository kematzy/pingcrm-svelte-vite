<script context="module">
  import { writable } from 'svelte/store'
  export const title = writable(null)
</script>

<script>
  import { inertia, page } from '@inertiajs/inertia-svelte'
  import Dropdown from '@/Shared/Dropdown.svelte'
  import FlashMessages from '@/Shared/FlashMessages.svelte'
  import Icon from '@/Shared/Icon.svelte'
  import Logo from '@/Shared/Logo.svelte'
  import MainMenu from '@/Shared/MainMenu.svelte'

  const route = window.route
</script>

<svelte:head>
  <title>{$title ? `${$title} - Ping CRM (Svelte & Webpack/Mix)` : 'Ping CRM (Svelte & Webpack/Mix)'}</title>
</svelte:head>

<div class="flex flex-col">
  <div class="flex flex-col h-screen">
    <div class="flex-shrink-0 md:flex">
      <div class="flex items-center justify-between px-6 py-4 bg-indigo-900 md:flex-shrink-0 md:w-56 md:justify-center">
        <a use:inertia href="/" class="mt-1">
          <Logo class="fill-white" width="120" height="28" />
        </a>
        <Dropdown class="md:hidden" placement="bottom-end">
          <svg class="w-6 h-6 fill-white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <div slot="dropdown" class="px-8 py-4 mt-2 bg-indigo-800 rounded shadow-lg">
            <MainMenu />
          </div>
        </Dropdown>
      </div>
      <div class="flex items-center justify-between w-full p-4 text-sm bg-white border-b md:py-0 md:px-12 md:text-md">
        <div class="mt-1 mr-4">{$page.props.auth.user.account.name}</div>
        <Dropdown class="mt-1" placement="bottom-end">
          <div class="flex items-center cursor-pointer select-none group">
            <div class="mr-1 text-gray-700 whitespace-no-wrap group-hover:text-indigo-600 focus:text-indigo-600">
              <span>{$page.props.auth.user.first_name}</span>
              <span class="hidden md:inline">{$page.props.auth.user.last_name}</span>
            </div>
            <Icon
              name="cheveron-down"
              class="w-5 h-5 group-hover:fill-indigo-600 fill-gray-700 focus:fill-indigo-600" />
          </div>
          <div slot="dropdown" class="py-2 mt-2 text-sm bg-white rounded shadow-xl">
            <a
              use:inertia
              href={route('users.edit', $page.props.auth.user.id)}
              class="block px-6 py-2 hover:bg-indigo-500 hover:text-white">
              My Profile
            </a>
            <a
              use:inertia
              href={route('users')}
              class="block px-6 py-2 hover:bg-indigo-500 hover:text-white">
              Manage Users
            </a>
            <a
              use:inertia={{ method: 'delete' }}
              href={route('logout')}
              class="block px-6 py-2 hover:bg-indigo-500 hover:text-white">
              Logout
            </a>
          </div>
        </Dropdown>
      </div>
    </div>
    <div class="flex flex-grow overflow-hidden">
      <MainMenu class="flex-shrink-0 hidden w-56 p-12 overflow-y-auto bg-indigo-800 md:block" />
      <div class="flex-1 px-4 py-8 overflow-y-auto md:p-12" scroll-region>
        <FlashMessages />
        <slot />
      </div>
    </div>
  </div>
</div>
