<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    ApiCheckOperationsSingleton,
    type CurrentState,
    type ApiCheckOperations,
    CurrentStateSingleton,
    CheckState,
  } from "./data-models";

  const dispatch = createEventDispatcher();

  export let state: CheckState = CurrentStateSingleton.getInstance().currentCheckState;
  $: stateStr = state == CheckState.CheckedIn ? "Sortir" : "Entrar";

  let operation: ApiCheckOperations = ApiCheckOperationsSingleton.getInstance();

  const autoCheckOperation = () => {
    state = operation.autoCheckOperation();
    dispatch('state', {
        stateValue: state
    });
  };
</script>

<button
  on:click={autoCheckOperation}
  class:state-dins={state === CheckState.CheckedIn}
  class:state-fora={state === CheckState.CheckedOut}
>
  {stateStr}
</button>

<style>
  .state-dins {
    background-color: orange;
  }

  .state-fora {
    background-color: green;
  }
</style>
