<script context="module">
  import Layout, { title } from '@/Shared/Layout.svelte'
  export const layout = Layout
</script>

<script>
  import { Inertia } from '@inertiajs/inertia'
  import { inertia, useForm } from '@inertiajs/inertia-svelte'
  import Icon from '@/Shared/Icon.svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import SelectInput from '@/Shared/SelectInput.svelte'
  import TextInput from '@/Shared/TextInput.svelte'
  import TrashedMessage from '@/Shared/TrashedMessage.svelte'

  const route = window.route

  export let organization = {}

  $: $title = organization ? organization.name : null

  let form = useForm({
    name: organization.name,
    email: organization.email,
    phone: organization.phone,
    address: organization.address,
    city: organization.city,
    region: organization.region,
    country: organization.country,
    postal_code: organization.postal_code,
  })

  function submit() {
    $form.put(route('organizations.update', organization.id))
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this organization?')) {
      Inertia.delete(route('organizations.destroy', organization.id))
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this organization?')) {
      Inertia.put(route('organizations.restore', organization.id))
    }
  }
</script>

<h1 class="mb-8 text-3xl font-bold">
  <a use:inertia href={route('organizations')} class="text-indigo-400 hover:text-indigo-600">
    Organizations
  </a>
  <span class="font-medium text-indigo-400">/</span>
  {organization.name}
</h1>

{#if organization.deleted_at}
  <TrashedMessage class="mb-6" on:restore={restore}>
    This organization has been deleted.
  </TrashedMessage>
{/if}

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
        label="Country:"
        let:selected>
        <option value={null} />
        <option value="CA" selected={selected === 'CA'}>Canada</option>
        <option value="US" selected={selected === 'US'}>United States</option>
      </SelectInput>

      <TextInput
        bind:value={$form.postal_code}
        error={$form.errors.postal_code}
        class="w-full pb-8 pr-6 lg:w-1/2"
        label="Postal code:" />
    </div>
    <div class="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
      {#if !organization.deleted_at}
        <button class="text-red-600 hover:underline" tabindex="-1" type="button" on:click={destroy}>
          Delete Organization
        </button>
      {/if}

      <LoadingButton loading={$form.processing} class="ml-auto btn-indigo" type="submit">
        Update Organization
      </LoadingButton>
    </div>
  </form>
</div>

<h2 class="mt-12 text-2xl font-bold">Contacts</h2>
<div class="mt-6 overflow-x-auto bg-white rounded shadow">
  <table class="w-full whitespace-no-wrap">
    <tr class="font-bold text-left">
      <th class="px-6 pt-6 pb-4">Name</th>
      <th class="px-6 pt-6 pb-4">City</th>
      <th class="px-6 pt-6 pb-4" colspan="2">Phone</th>
    </tr>
    {#each organization.contacts as contact (contact.id)}
      <tr class="hover:bg-gray-100 focus-within:bg-gray-100">
        <td class="border-t">
          <a
            use:inertia
            href={route('contacts.edit', contact.id)}
            class="flex items-center px-6 py-4 focus:text-indigo-500">
            {contact.name}
            {#if contact.deleted_at}
              <Icon name="trash" class="flex-shrink-0 w-3 h-3 ml-2 fill-gray-400" />
            {/if}
          </a>
        </td>
        <td class="border-t">
          <a
            use:inertia
            href={route('contacts.edit', contact.id)}
            class="flex items-center px-6 py-4"
            tabindex="-1">
            {contact.city}
          </a>
        </td>
        <td class="border-t">
          <a
            use:inertia
            href={route('contacts.edit', contact.id)}
            class="flex items-center px-6 py-4"
            tabindex="-1">
            {contact.phone}
          </a>
        </td>
        <td class="w-px border-t">
          <a
            use:inertia
            href={route('contacts.edit', contact.id)}
            class="flex items-center px-4"
            tabindex="-1">
            <Icon name="cheveron-right" class="block w-6 h-6 fill-gray-400" />
          </a>
        </td>
      </tr>
    {/each}

    {#if organization.contacts.length === 0}
      <tr>
        <td class="px-6 py-4 border-t" colspan="4">No contacts found.</td>
      </tr>
    {/if}
  </table>
</div>
