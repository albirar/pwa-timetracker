import { writable } from "svelte/store";
import { getApiInstance, type ApiCheckRegister } from "../timetracker-api";

export const timetrackerApi: ApiCheckRegister = getApiInstance();
export let currentState = writable(timetrackerApi.currentState);

