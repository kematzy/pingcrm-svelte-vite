// import Layout from '@/Shared/Layout.svelte'  // not sure if this needs to be loaded
import { createInertiaApp } from '@inertiajs/inertia-svelte'
import { InertiaProgress } from '@inertiajs/progress'

InertiaProgress.init()

function withVite(pages, name) {
  for (const path in pages) {
    if (path.endsWith(`${name.replace('.', '/')}.svelte`)) {
      return typeof pages[path] === 'function' ? pages[path]() : pages[path]
    }
  }
  throw new Error('Page not found: ' + name)
}

createInertiaApp({
  // resolve: name => import(`./Pages/${name}.svelte`),
  // resolve: (name) => {                                                       // [2]
  //   const pages = import.meta.glob('./Pages/**/*.svelte')
  //   return pages[`./Pages/${name}.svelte`]().then((module) => module.default)
  // },
  resolve: (name) => withVite(import.meta.glob('./Pages/**/*.svelte'), name),   // [3]
  setup({ el, App, props }) {
    new App({ target: el, props })
  }
})
