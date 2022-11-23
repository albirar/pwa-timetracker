<script lang="ts">
  import moment, { type Moment } from "moment";
  import { onDestroy, onMount } from "svelte";
  import { CheckState, getApiInstance } from '@albirar.cat/timetracker-ts';
  
  let idSubscriber: number;
  let state: CheckState;
  let stateStr: string;

  onMount(() => {
    updateState();
    idSubscriber = getApiInstance().subscribeToChanges(updateState);
  });
  onDestroy(() => {
    getApiInstance().unSubscribeToChanges(idSubscriber);
  });
  function updateState(event?: CheckEvent) {
    if (event == undefined) {
      state = getApiInstance().currentState;
    } else {
      state = event.currentState;
    }
    if (state == CheckState.CheckedInState) {
      var temps : string;

      temps = moment(getApiInstance().lastChange).locale("ca").fromNow();
      stateStr = `Ets a dins des de fa ${temps}`;
    } else {
      stateStr = "Ets a fora";
    }
  }
</script>

<div
  class="card"
  class:bg-warning={state === CheckState.CheckedInState}
  class:text-bg-success={state === CheckState.CheckedOutState}
>
  <div class="card-body">
    <h5 class="card-title">{stateStr}</h5>
    <p class="card-text" />
  </div>
</div>
