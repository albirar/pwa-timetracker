<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { currentState, timetrackerApi } from "./states";
  import { TemporalFrame, type CheckState } from "../timetracker-api";

  let hoursDaysStr: string = "";
  let hoursWeekStr: string = "";
  let hoursMonthStr: string = "";
  let state: CheckState;
  let interval: any;

  const unsubscribe = currentState.subscribe((nState) => {
    state = nState;
    setTotals();
  });
  onMount(() => {
    interval = setInterval(setTotals, 30000);
  });
  onDestroy(() => {
    clearInterval(interval);
    unsubscribe();
  });
  async function setTotals() {
    var nTotal: number;

    nTotal = await timetrackerApi.totalTime(TemporalFrame.ThisDay);
    if (nTotal == 0) {
      hoursDaysStr = "00:00";
    } else {
      hoursDaysStr = formatTotal(nTotal);
    }

    nTotal = await timetrackerApi.totalTime(TemporalFrame.ThisWeek);
    if (nTotal == 0) {
      hoursWeekStr = "00:00";
    } else {
      hoursWeekStr = formatTotal(nTotal);
    }

    nTotal = await timetrackerApi.totalTime(TemporalFrame.ThisMonth);
    if (nTotal == 0) {
      hoursMonthStr = "00:00";
    } else {
      hoursMonthStr = formatTotal(nTotal);
    }
  }

  function formatTotal(total: number): string {
    var hours: number;
    var minutes: number;

    minutes = Math.floor(total / 60000);
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return hours + ":" + minutes;
  }
</script>

<paneSummary>
  <div class="container">
    <h5>Resum d'hores</h5>
    <div class="row mx-0 px-1">
      <div class="col-6 text-center mx-0 px-1">
        <small class="text-muted">Periode</small>
      </div>
      <div class="col-6 text-center mx-0 px-1">
        <small class="text-muted">Total</small>
      </div>
    </div>
    <div class="row mx-0 px-1">
      <div class="col-6 text-left mx-0 px-1">
        <p>Avui:</p>
      </div>
      <div class="col-6 text-right mx-0 px-1">
        <p>{hoursDaysStr}</p>
      </div>
    </div>
    <div class="row mx-0 px-1">
      <div class="col-6 text-left mx-0 px-1">
        <p>Setmana:</p>
      </div>
      <div class="col-6 text-right mx-0 px-1">
        <p>{hoursWeekStr}</p>
      </div>
    </div>
    <div class="row mx-0 px-1">
      <div class="col-6 text-left mx-0 px-1">
        <p>Mes:</p>
      </div>
      <div class="col-6 text-right mx-0 px-1">
        <p>{hoursMonthStr}</p>
      </div>
    </div>
  </div>
</paneSummary>
