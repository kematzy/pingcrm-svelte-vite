<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { inertia, useForm } from '@inertiajs/inertia-svelte'
  import FileInput from '@/Shared/FileInput.svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  const route = window.route

  $title = 'Create User'

  let form = useForm({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    owner: false,
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
      }))
      .post(route('users.store'))
  }
</script>

<h1 class="mb-8 font-bold text-3xl">
  <a use:inertia href={route('users')} class="text-indigo-400 hover:text-indigo-600">
    Users
  </a>
  <span class="text-indigo-400 font-medium">/</span> Create
</h1>

<div class="bg-white rounded shadow overflow-hidden max-w-3xl">
  <form on:submit|preventDefault={submit}>
    <div class="p-8 -mr-6 -mb-8 flex flex-wrap">
      <TextInput
        bind:value={$form.first_name}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.first_name}
        label="First name:" />
      <TextInput
        bind:value={$form.last_name}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.last_name}
        label="Last name:" />
      <TextInput
        bind:value={$form.email}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.email}
        label="Email:" />
      <TextInput
        bind:value={$form.password}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.password}
        type="password"
        autocomplete="new-password"
        label="Password:" />
      <SelectInput
        bind:value={$form.owner}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.owner}
        label="Owner:">
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </SelectInput>
      <FileInput
        bind:value={$form.photo}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.photo}
        type="file"
        accept="image/*"
        label="Photo:" />
    </div>
    <div class="px-8 py-4 bg-gray-100 border-t border-gray-200 flex justify-end items-center">
      <LoadingButton loading={$form.processing} class="btn-indigo" type="submit">Create User</LoadingButton>
    </div>
  </form>
</div>
