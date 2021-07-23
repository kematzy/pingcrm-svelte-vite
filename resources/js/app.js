import Layout from '@/Shared/Layout.svelte'
import { createInertiaApp } from '@inertiajs/inertia-svelte'
import { InertiaProgress } from '@inertiajs/progress'

InertiaProgress.init()

createInertiaApp({
  // resolve: name => import(`./Pages/${name}.svelte`),
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.svelte')
    return pages[`./Pages/${name}.svelte`]().then(module => module.default)
  },
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
})
