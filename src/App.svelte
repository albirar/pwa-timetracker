<script lang="ts">
  import CheckButton from "./lib/CheckButton.svelte";
  import PaneSummary from "./lib/PaneSummary.svelte";
  import StatusTimeTracker from "./lib/StatusTimeTracker.svelte";

  import { currentState, timetrackerApi } from "./lib/states";
  import type { CheckState } from "./timetracker-api";

  let state = initApi();

  async function initApi(): Promise<CheckState> {
    return new Promise<CheckState>((resolve, reject) => {
      timetrackerApi
        .refreshState()
        .then((st: CheckState) => {
          currentState.set(st);
          resolve(st);
        })
        .catch((evt) => {
          reject(evt);
        });
    });
  }
</script>

<svelte:head>
  <title>Timetracker application</title>
</svelte:head>

<main>
  <div class="container-fluid text-center">
    {#await state}
      <p>Inicialització...</p>
    {:then}
      <div class="d-grid gap-2">
        <div class="p-2">
          <StatusTimeTracker />
        </div>

        <div class="p-2">
          <CheckButton />
        </div>
        <div class="pt-2 px-0">
          <PaneSummary />
        </div>
      </div>
    {/await}
  </div>
</main>

<style>
</style>
