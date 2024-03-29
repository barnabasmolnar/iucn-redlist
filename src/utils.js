import { DISPLAY_LIMIT, API_URL, TOKEN } from "./config";
import axios from "axios";

export const randomElemFromArray = arr =>
    arr[Math.floor(Math.random() * arr.length)];

export const limitResults = (arr, limit = DISPLAY_LIMIT) =>
    !limit ? arr : arr.slice(0, limit);

// Req states
export const LOADING = "LOADING";
export const SUCCESS = "SUCCESS";

// Errors
export const REGIONS_FETCH_ERROR = "Error. Regions could not be fetched.";
export const SPECIES_FETCH_ERROR = "Error. Species could not be fetched.";
export const CON_MEASURES_FETCH_ERROR =
    "Error. Conservation measures could not be fetched.";

// Returns the data object of an axios response
// Or returns an error
// If the token is invalid, the API returns a 200 OK response
// with the following: {"message":"Token not valid!"}
const getAPIResponse = (endpoint, error) =>
    axios
        .get(`${API_URL}${endpoint}?token=${TOKEN}`)
        .then(
            ({ data }) => (data.message ? Promise.reject(data.message) : data),
            () => Promise.reject(error)
        );

// Returns all regions
const getRegions = () =>
    getAPIResponse("/region/list", REGIONS_FETCH_ERROR).then(
        ({ results }) => results
    );

// Returns a random region
export const getRandomRegion = () => getRegions().then(randomElemFromArray);

// Returns species from a specific region
export const getSpecies = regionId =>
    getAPIResponse(
        `/species/region/${regionId}/page/0`,
        SPECIES_FETCH_ERROR
    ).then(({ result }) => result);

// Given a species, it returns the conservation measures
// for that specific species
export const getConMeasure = taxonid =>
    getAPIResponse(
        `/measures/species/id/${taxonid}`,
        CON_MEASURES_FETCH_ERROR
    ).then(({ result }) => result.map(r => r.title).join(", "));
