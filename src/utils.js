import { DISPLAY_LIMIT } from "./config";
export const randomElemFromArray = arr =>
    arr[Math.floor(Math.random() * arr.length)];

export const limitResults = (arr, limit = DISPLAY_LIMIT) =>
    !limit ? arr : arr.slice(0, limit);

// Req states
export const LOADING = "LOADING";
export const SUCCESS = "SUCCESS";