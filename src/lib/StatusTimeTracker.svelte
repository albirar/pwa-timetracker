<script lang="ts">
  import { moment } from "./moments";
  import { onDestroy, onMount } from "svelte";
  import { CheckState } from "../timetracker-api";
  import { currentState, timetrackerApi } from "./states";

  let temps: string = "";
  let interval: any;
  let textState: string;
  let lastChange: moment.Moment | undefined;
  let state: CheckState;
  const unsubscribe = currentState.subscribe((nState) => {
    state = nState;
    textState = nState == CheckState.CheckedInState ? "Dins" : "Fora";
    if (timetrackerApi.lastCheckOperation != undefined) {
      lastChange = moment(timetrackerApi.lastCheckOperation);
    }
    setTemps();
  });
  onMount(() => {
    interval = setInterval(setTemps, 60000);
  });
  onDestroy(() => {
    clearInterval(interval);
    unsubscribe();
  });
  function setTemps() {
    if (lastChange == undefined) {
      temps = "";
    } else {
      temps = lastChange.fromNow();
    }
  }
</script>

<status-time-tracker>
  <div
    class="card"
    class:bg-warning={state === CheckState.CheckedInState}
    class:text-bg-success={state === CheckState.CheckedOutState} >
    <div class="card-body">
      <h5 class="card-title">{textState}</h5>
      {#if temps != "" && state == CheckState.CheckedInState}
        <p class="card-text">{temps}</p>
      {/if}
    </div>
  </div>
</status-time-tracker>
