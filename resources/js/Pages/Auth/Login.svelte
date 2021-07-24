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
  <title>Login - Ping CRM</title>
</svelte:head>

<div class="p-6 bg-indigo-800 min-h-screen flex justify-center items-center">
  <div class="w-full max-w-md">
    <Logo class="block mx-auto w-full max-w-xs fill-white" height="50" />
    <form
      class="mt-8 bg-white rounded-lg shadow-xl overflow-hidden"
      on:submit|preventDefault={submit}>
      <div class="px-10 py-12">
        <h1 class="text-3xl font-bold text-center text-indigo-600">Vite <em>'kind of works'</em> in Dev & Production modes! Welcome Back!</h1>

        <p class="my-4 text-center text-red-600">Please see the notes in the <tt>resources/js/app.js</tt> file for more information.</p>
        <h4><tt>$page</tt> output</h4>
        <pre class="p-4 m-4 text-gray-500 bg-gray-200 border rounded">{JSON.stringify($page, null, 2)}</pre>

        <div class="w-24 mx-auto mt-6 border-b-2" />

        <TextInput
          bind:value={$form.email}
          bind:error={$form.errors.email}
          class="mt-10"
          label="Email:"
          type="email"
          autofocus
          autocapitalize="off" />
        <label class="mt-6 select-none flex items-center" for="remember">
        <TextInput bind:value={$form.password} class="mt-6" label="Password:" type="password" />
          <input id="remember" bind:checked={$form.remember} class="mr-1" type="checkbox" />
          <span class="text-sm">Remember Me</span>
        </label>
      </div>
      <div
        class="px-10 py-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
        <a class="hover:underline" tabindex="-1" href="#reset-password">Forget password?</a>
        <LoadingButton bind:loading={$form.processing} class="btn-indigo" type="submit">Login</LoadingButton>
      </div>
    </form>
  </div>
</div>
