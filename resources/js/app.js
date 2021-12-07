// import 'vite/dynamic-import-polyfill'  // this is not really needed

// import Layout from '@/Shared/Layout.svelte'  // not sure if this needs to be loaded
// import { Inertia } from '@inertiajs/inertia' // not sure if this needs to be loaded
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
  // resolve: (name) => import(`./Pages/${name}.svelte`),                       // [1]

  // resolve: (name) => {                                                       // [2]
  //   const pages = import.meta.glob('./Pages/**/*.svelte')
  //   return pages[`./Pages/${name}.svelte`]().then((module) => module.default)
  // },

  resolve: (name) => withVite(import.meta.glob('./Pages/**/*.svelte'), name),   // [3]
  setup({ el, App, props }) {
    //   console.log('props.initialPage: ', props.initialPage) // contains .initialPage object with all $page values
    //   console.log('props.initialComponent: ', props.initialComponent) // contains .initialPage object with all $page values
    new App({ target: el, props })
    // el.removeAttribute('data-page')  // remove unsightly HTML data output
  },
  // page: JSON.parse(document.getElementById('app').dataset.page)  // doesn't add anything
})

// DEBUGGING REFERENCE NOTES:
//
// [1]: This version works in Dev mode, BUT does not work in build mode where it fails create pages & components
//
//
// [2]: This version does not work in either Dev or Build modes. In Dev mode the components are loaded, but no content
//      output is shown in the browser window other than <!--<Render>--> & <!--<App>--> HTML comments in the source.
//      In Build mode, all the pages & components are generated, but the pages & components are not loading correctly
//      or at all. No output is appended to div #app, not even some comments.
//
//
// [3]: This version works perfectly in Build mode, without any browser console output, and shows the `$page` variable.
//      In Dev mode, the Login page works with live updates, but without `$page` variable output.
//      Due to the `$page` variable being unavailable, all subsequent pages does not work and fails with a
//      `undefined $page.props...` error.
