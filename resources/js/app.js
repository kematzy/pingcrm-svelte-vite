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
  id: 'app',
  resolve: (name) => withVite(import.meta.glob('./Pages/**/*.svelte'), name),
  //
  setup({ el, App, props }) {
    new App({ target: el, props })
    if (import.meta.env.PROD) {
      el.removeAttribute('data-page')  // remove unsightly HTML data output in production
    }
  },
})
