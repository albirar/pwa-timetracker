<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    CheckEventImpl,
    CheckState,
    getApiInstance,
    type CheckEvent,
  } from "./timetracker_api";

  let idSubscriber: number;
  let state: CheckState;
  let operationStr: string;

  onMount(() => {
    updateState();
    idSubscriber = getApiInstance().subscribeToChanges(updateState);
  });
  onDestroy(() => {
    getApiInstance().unSubscribeToChanges(idSubscriber);
  });

  function updateState(event?: CheckEvent) {
    if (event == undefined) {
      event = new CheckEventImpl(null, getApiInstance().currentState);
    }
    state = event.currentState;
    if (state == CheckState.CheckedInState) {
      operationStr = "sortir";
    } else {
      operationStr = "entrar";
    }
  }
  function autoCheckOperation() {
    getApiInstance().autoCheckOperation();
  }
</script>

<button
  on:click={autoCheckOperation}
  class:text-bg-success={state === CheckState.CheckedInState}
  class:bg-warning={state === CheckState.CheckedOutState}
>
  {operationStr}
</button>

<style>
</style>
