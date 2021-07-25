<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { Inertia } from '@inertiajs/inertia'
  import { inertia, useForm } from '@inertiajs/inertia-svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'
  import TrashedMessage from '@/Shared/TrashedMessage.svelte'

  const route = window.route

  export let contact = {}
  export let organizations = []

  $: $title = contact ? `${contact.first_name} ${contact.last_name}` : null

  let form = useForm({
    first_name: contact.first_name,
    last_name: contact.last_name,
    organization_id: contact.organization_id,
    email: contact.email,
    phone: contact.phone,
    address: contact.address,
    city: contact.city,
    region: contact.region,
    country: contact.country,
    postal_code: contact.postal_code,
  })

  function submit() {
    $form.put(route('contacts.update', contact.id))
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this contact?')) {
      Inertia.delete(route('contacts.destroy', contact.id))
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this contact?')) {
      Inertia.put(route('contacts.restore', contact.id))
    }
  }
</script>

<h1 class="mb-8 font-bold text-3xl">
  <a use:inertia href={route('contacts')} class="text-indigo-400 hover:text-indigo-600">
    Contacts
  </a>
  <span class="text-indigo-400 font-medium">/</span>
  {contact.first_name}
  {contact.last_name}
</h1>
{#if contact.deleted_at}
  <TrashedMessage v-if="contact.deleted_at" class="mb-6" on:restore={restore}>
    This contact has been deleted.
  </TrashedMessage>
{/if}
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
      <SelectInput
        bind:value={$form.organization_id}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.organization_id}
        label="Organization:"
        let:selected>
        <option value={null} />
        {#each organizations as organization (organization.id)}
          <option value={organization.id} selected={selected == organization.id}>
            {organization.name}
          </option>
        {/each}
      </SelectInput>
      <TextInput
        bind:value={$form.email}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.email}
        label="Email:" />
      <TextInput
        bind:value={$form.phone}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.phone}
        label="Phone:" />
      <TextInput
        bind:value={$form.address}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.address}
        label="Address:" />
      <TextInput
        bind:value={$form.city}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.city}
        label="City:" />
      <TextInput
        bind:value={$form.region}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.region}
        label="Province/State:" />
      <SelectInput
        bind:value={$form.country}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.country}
        label="Country:"
        let:selected>
        <option value={null} />
        <option value="CA" selected={selected === 'CA'}>Canada</option>
        <option value="US" selected={selected === 'US'}>United States</option>
      </SelectInput>
      <TextInput
        bind:value={$form.postal_code}
        class="pr-6 pb-8 w-full lg:w-1/2"
        error={$form.errors.postal_code}
        label="Postal code:" />
    </div>
    <div class="px-8 py-4 bg-gray-100 border-t border-gray-200 flex items-center">
      {#if !contact.deleted_at}
        <button class="text-red-600 hover:underline" tabindex="-1" type="button" on:click={destroy}>
          Delete Contact
        </button>
      {/if}
      <LoadingButton loading={$form.processing} class="ml-auto btn-indigo" type="submit">
        Update Contact
      </LoadingButton>
    </div>
  </form>
</div>
