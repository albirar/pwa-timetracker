<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
</script>

<svelte:head>
  <title>Timetracker PWA application</title>
</svelte:head>

<main>
  <h1>Timetracker PWA application</h1>

  <div class="card">
    <Counter />
  </div>

</main>

<style>
</style>