<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { inertia, page } from '@inertiajs/inertia-svelte'
  import Icon from '@/Shared/Icon.svelte'
  import SearchFilter from '@/Shared/SearchFilter.svelte'

  const route = window.route

  export let users = []

  $title = 'Users'

  let filters = {
    role: $page.props.filters.role,
    trashed: $page.props.filters.trashed,
  }
</script>

<h1 class="mb-8 text-3xl font-bold">Users</h1>
<div class="flex items-center justify-between mb-6">
  <SearchFilter class="w-full max-w-md mr-4" bind:filters>
    <label for="role" class="block text-gray-700">Role:</label>
    <select id="role" class="w-full mt-1 form-select" bind:value={filters.role}>
      <option value={null} />
      <option value="user">User</option>
      <option value="owner">Owner</option>
    </select>
    <label for="trashed" class="block mt-4 text-gray-700">Trashed:</label>
    <select id="trashed" class="w-full mt-1 form-select" bind:value={filters.trashed}>
      <option value={null} />
      <option value="with">With Trashed</option>
      <option value="only">Only Trashed</option>
    </select>
  </SearchFilter>
  <a use:inertia href={route('users.create')} class="btn-indigo">
    <span>Create</span>
    <span class="hidden md:inline">User</span>
  </a>
</div>
<div class="overflow-x-auto bg-white rounded shadow">
  <table class="w-full whitespace-no-wrap">
    <tr class="font-bold text-left">
      <th class="px-6 pt-6 pb-4">Name</th>
      <th class="px-6 pt-6 pb-4">Email</th>
      <th class="px-6 pt-6 pb-4" colspan="2">Role</th>
    </tr>
    {#each users as user (user.id)}
      <tr class="hover:bg-gray-100 focus-within:bg-gray-100">
        <td class="border-t">
          <a
            use:inertia
            href={route('users.edit', user.id)}
            class="flex items-center px-6 py-4 focus:text-indigo-500">
            {#if user.photo}
              <img class="block w-5 h-5 mr-2 -my-2 rounded-full" src={user.photo} alt="user" />
            {/if}
            {user.name}
            {#if user.deleted_at}
              <Icon name="trash" class="flex-shrink-0 w-3 h-3 ml-2 fill-gray-400" />
            {/if}
          </a>
        </td>
        <td class="border-t">
          <a
            use:inertia
            href={route('users.edit', user.id)}
            class="flex items-center px-6 py-4"
            tabindex="-1">
            {user.email}
          </a>
        </td>
        <td class="border-t">
          <a
            use:inertia
            href={route('users.edit', user.id)}
            class="flex items-center px-6 py-4"
            tabindex="-1">
            {user.owner ? 'Owner' : 'User'}
          </a>
        </td>
        <td class="w-px border-t">
          <a
            use:inertia
            href={route('users.edit', user.id)}
            class="flex items-center px-4"
            tabindex="-1">
            <Icon name="cheveron-right" class="block w-6 h-6 fill-gray-400" />
          </a>
        </td>
      </tr>
    {/each}

    {#if users.length === 0}
      <tr>
        <td class="px-6 py-4 border-t" colspan="4">No users found.</td>
      </tr>
    {/if}
  </table>
</div>
