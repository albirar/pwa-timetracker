<script lang="ts">
  import Autocheck from './lib/Autocheck.svelte';
  import StateHeader from './lib/StateHeader.svelte';

</script>

<svelte:head>
  <title>Timetracker application</title>
</svelte:head>

<main>
  <div class="container-fluid text-center">

    <div class="d-grid gap-2">
      <div class="p-2">
        <StateHeader />
      </div>
      
      <div class="p-2">
        <Autocheck/>
      </div>
    </div>
    
  </div>

</main>

<style>
</style>