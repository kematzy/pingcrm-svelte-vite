<script>
  export let loading = false

  $: props = {
    ...$$restProps,
    class: `flex items-center ${$$restProps.class || ''}`,
  }
</script>

<button {...props} disabled={loading}>
  {#if loading}
    <div class="mr-2 btn-spinner" />
  {/if}

  <slot />
</button>
