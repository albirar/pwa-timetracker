<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { currentState, timetrackerApi } from './states';
  import { CheckState } from '../timetracker-api';
  
  let textButo : string;
  let state : CheckState;
  const unsubscribe = currentState.subscribe(nState => {
    state = nState;
    textButo = nState == CheckState.CheckedInState ? 'Sortir' : 'Entrar';
  });

  async function autocheck () {
    await timetrackerApi.autoCheckOperation();
    currentState.set(timetrackerApi.currentState);
  }
  onDestroy(unsubscribe);
</script>

<button on:click={autocheck} class="btn"
  class:btn-outline-success={state === CheckState.CheckedInState} 
  class:btn-warning={state === CheckState.CheckedOutState}>
  {textButo}
</button>