<script lang="ts">
  import CheckButton from "./lib/CheckButton.svelte";
  import PaneSummary from "./lib/PaneSummary.svelte";
  import StatusTimeTracker from "./lib/StatusTimeTracker.svelte";
  import PwaWorker from "./lib/PwaWorker.svelte";
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
      <div class="row">
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
          <div class="pt-2 px-0">
            <PwaWorker />
          </div>
        </div>
      </div>
    {/await}
    <div class="row">
      <footer class="py-3 my-4">
        <!-- Attributions -->
        <p class="text-center text-muted"><a href="https://www.flaticon.com/free-icons/timer" title="timer icons">Timer
            icons created by Freepik - Flaticon</a></p>
        <!-- Attributions -->
      </footer>
    </div>
  </div>
</main>

<style>
</style>
