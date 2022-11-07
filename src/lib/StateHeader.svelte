<script lang="ts">
  import { CheckState, CurrentStateSingleton } from "./data-models";

  export let state: CheckState;

  $: stateStr = state == CheckState.CheckedIn ? "dins" : "fora";

  function handleMessage(event) {
    state = event.value;
  }
</script>

<h1
  class:state-dins={state === CheckState.CheckedIn}
  class:state-fora={state === CheckState.CheckedOut}
>
  Ara ets {stateStr}
</h1>

<style>
  .state-dins {
    background-color: orange;
  }

  .state-fora {
    background-color: green;
  }
</style>
