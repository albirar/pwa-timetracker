<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import Autocheck from './lib/Autocheck.svelte';
  import { CurrentStateSingleton, type CheckState } from './lib/data-models';
  import StateHeader from './lib/StateHeader.svelte';

  export let state : CheckState = CurrentStateSingleton.getInstance().currentCheckState;
</script>

<svelte:head>
  <title>Timetracker application</title>
</svelte:head>

<main>
  <StateHeader bind:state={state}></StateHeader>

  <div class="card">
    <Autocheck bind:state={state}/>
  </div>

</main>

<style>
</style>