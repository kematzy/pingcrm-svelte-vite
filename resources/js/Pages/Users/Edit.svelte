<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { Inertia } from '@inertiajs/inertia'
  import { inertia, useForm } from '@inertiajs/inertia-svelte'
  import FileInput from '@/Shared/FileInput.svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'
  import TrashedMessage from '@/Shared/TrashedMessage.svelte'

  const route = window.route

  export let user = {}

  $: $title = user ? `${user.first_name} ${user.last_name}` : null

  let form = useForm({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password,
    owner: user.owner,
    photo: null,
  })

  function submit() {
    $form
      .transform((data) => ({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          password: data.password || '',
          owner: data.owner ? 1 : 0,
          photo: data.photo || ''
        })
      )
      .put(route('users.update', user.id), {
        onSuccess: () => $form.reset('password', 'photo'),
      })
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this user?')) {
      Inertia.delete(route('users.destroy', user.id))
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this user?')) {
      Inertia.put(route('users.restore', user.id))
    }
  }
</script>

<div class="flex justify-start max-w-3xl mb-8">
  <h1 class="text-3xl font-bold">
    <a use:inertia href={route('users')} class="text-indigo-400 hover:text-indigo-600">
      Users
    </a>
    <span class="font-medium text-indigo-400">/</span>
    {user.first_name}
    {user.last_name}
  </h1>

  {#if user.photo}
    <img
      class="block w-8 h-8 ml-4 rounded-full"
      src={user.photo}
      alt={`${user.first_name} ${user.last_name} profile picture`} />
  {/if}
</div>

{#if user.deleted_at}
  <TrashedMessage class="mb-6" on:restore={restore}>This user has been deleted.</TrashedMessage>
{/if}

<div class="max-w-3xl overflow-hidden bg-white rounded shadow">
  <form on:submit|preventDefault={submit}>
    <div class="flex flex-wrap p-8 -mb-8 -mr-6">
      <TextInput
        bind:value={$form.first_name}
        error={$form.errors.first_name}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="First name:" />

      <TextInput
        bind:value={$form.last_name}
        error={$form.errors.last_name}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="Last name:" />

      <TextInput
        bind:value={$form.email}
        error={$form.errors.email}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="Email:" />

      <TextInput
        bind:value={$form.password}
        error={$form.errors.password}
        autocomplete="new-password"
        class="w-full pb-8 pr-6 lg:w-1/2"
        type="password"
        label="Password:" />

      <SelectInput
        bind:value={$form.owner}
        error={$form.errors.owner}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="Owner:"
        let:selected>
        <option value={true} selected={selected === true}>Yes</option>
        <option value={false} selected={selected === false}>No</option>
      </SelectInput>

      <FileInput
        bind:value={$form.photo}
        error={$form.errors.photo}
        class="w-full pb-8 pr-6 lg:w-1/2"
        accept="image/*"
        label="Photo:" />
    </div>
    <div class="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
      {#if !user.deleted_at}
        <button class="text-red-600 hover:underline" tabindex="-1" type="button" on:click={destroy}>
          Delete User
        </button>
      {/if}

      <LoadingButton loading={$form.processing} class="ml-auto btn-indigo" type="submit">
        Update User
      </LoadingButton>
    </div>
  </form>
</div>
