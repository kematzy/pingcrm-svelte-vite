<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { inertia, useForm } from '@inertiajs/inertia-svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  const route = window.route

  $title = 'Create Organization'

  let form = useForm({
    name: null,
    email: null,
    phone: null,
    address: null,
    city: null,
    region: null,
    country: null,
    postal_code: null,
  })

  function submit() {
    $form.post(route('organizations.store'))
  }
</script>

<h1 class="mb-8 text-3xl font-bold">
  <a use:inertia href={route('organizations')} class="text-indigo-400 hover:text-indigo-600">
    Organizations
  </a>
  <span class="font-medium text-indigo-400">/</span> Create
</h1>

<div class="max-w-3xl overflow-hidden bg-white rounded shadow">
  <form on:submit|preventDefault={submit}>
    <div class="flex flex-wrap p-8 -mb-8 -mr-6">
      <TextInput
        bind:value={$form.name}
        error={$form.errors.name}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="Name:" />

      <TextInput
        bind:value={$form.email}
        error={$form.errors.email}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="Email:" />

      <TextInput
        bind:value={$form.phone}
        error={$form.errors.phone}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="Phone:" />

      <TextInput
        bind:value={$form.address}
        error={$form.errors.address}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="Address:" />

      <TextInput
        bind:value={$form.city}
        error={$form.errors.city}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="City:" />

      <TextInput
        bind:value={$form.region}
        error={$form.errors.region}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="Province/State:" />

      <SelectInput
        bind:value={$form.country}
        error={$form.errors.country}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="Country:">
        <option value={null} />
        <option value="CA">Canada</option>
        <option value="US">United States</option>
      </SelectInput>

      <TextInput
        bind:value={$form.postal_code}
        error={$form.errors.postal_code}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="Postal code:" />
    </div>
    <div class="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
      <LoadingButton loading={$form.processing} class="btn-indigo" type="submit">
        Create Organization
      </LoadingButton>
    </div>
  </form>
</div>
