<script>
  import { useForm, page} from '@inertiajs/inertia-svelte'
  import LoadingButton from '@/Shared/LoadingButton.svelte'
  import Logo from '@/Shared/Logo.svelte'
  import TextInput from '@/Shared/TextInput.svelte'

  const route = window.route

  let form = useForm({
    email: 'johndoe@example.com',
    password: 'secret',
    remember: null,
  })

  function submit() {
    $form.post(route('login.store'))
  }
</script>

<svelte:head>
  <title>Login - Ping CRM (Svelte &amp; Vite)</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen p-6 bg-indigo-800">
  <div class="w-full max-w-md">
    <Logo class="block w-full max-w-xs mx-auto fill-indigo-300" height="50" />
    <form
      class="mt-8 overflow-hidden bg-white rounded-lg shadow-xl"
      on:submit|preventDefault={submit}>
      <div class="px-10 py-12">

        <h1 class="text-3xl font-light text-center text-indigo-600">
          Welcome!
        </h1>

        <div class="w-4/5 mx-auto mt-6 border-b-2" />

        <TextInput
          bind:value={$form.email}
          bind:error={$form.errors.email}
          class="mt-10"
          label="Email:"
          type="email"
          autofocus
          autocapitalize="off" />

        <TextInput bind:value={$form.password} class="mt-6" label="Password:" type="password" />

        <label class="flex items-center mt-6 select-none" for="remember">
          <input id="remember" bind:checked={$form.remember} class="mr-1" type="checkbox" />
          <span class="text-sm">Remember Me</span>
        </label>
      </div>
      <div
        class="flex items-center justify-between px-10 py-4 bg-gray-100 border-t border-gray-200">
        <a class="hover:underline" tabindex="-1" href="#reset-password">Forget password?</a>
        <LoadingButton bind:loading={$form.processing} class="btn-indigo" type="submit">Login</LoadingButton>
      </div>
    </form>
  </div>
</div>
