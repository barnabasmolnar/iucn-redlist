import React, { useState, useEffect } from "react";
import Species from "./Species";
import Mammals from "./Mammals";
import {
    limitResults,
    LOADING,
    SUCCESS,
    getRandomRegion,
    getSpecies,
    getConMeasures,
    CON_MEASURES_FETCH_ERROR
} from "./utils";
import { renderBasedOnReqState, renderWarningOrData } from "./renderUtils";

const App = () => {
    // crSpecies is initialized as an empty array
    // we will later fetch the species from the API
    // filter them for critically endangered species
    // and return the new state with all the species
    // via the useEffect hook
    // in a class based component we would instead
    // call this.setState
    const [crSpecies, setcrSpecies] = useState([]);

    // we similarly set the region
    const [region, setRegion] = useState("");

    // and the mammals
    const [mammals, setMammals] = useState([]);

    // reqState can either be LOADING, SUCCESS or an error object
    const [crSpeciesReqState, setCrSpeciesReqState] = useState(LOADING);
    const [mammalsReqState, setmammalsReqState] = useState(LOADING);

    // Error handling logic
    const handleError = error => {
        if (error === CON_MEASURES_FETCH_ERROR) {
            setCrSpeciesReqState(CON_MEASURES_FETCH_ERROR);
        } else {
            setCrSpeciesReqState(error);
            setmammalsReqState(error);
        }
    };

    useEffect(() => {
        const fn = async () => {
            try {
                // First, we need a random region
                const { name, identifier } = await getRandomRegion();

                // We set its name onto the app state so that we can render it
                setRegion(name);

                // We get all the species from our random region
                const species = await getSpecies(identifier);

                // Filter it down to the mammals
                const filteredMammals = limitResults(
                    species.filter(s => s.class_name === "MAMMALIA")
                );

                // We set the mammals state to the filtered down mammals
                // And set the reqState to indicate that the request
                // was successful
                setMammals(filteredMammals);
                setmammalsReqState(SUCCESS);

                // We filter the species array down to the critically
                // endangered species and set the respective states
                // as we did before with the mammals
                // but not before we also fetch the conservation measures
                // for said species
                const criticallyEndangered = limitResults(
                    species.filter(s => s.category === "CR")
                );
                const withMeasures = await getConMeasures(criticallyEndangered);
                setcrSpecies(withMeasures);
                setCrSpeciesReqState(SUCCESS);
            } catch (error) {
                handleError(error);
            }
        };

        fn();
    }, []);

    return (
        <div className="container my-5">
            <h2 className="mb-5">
                Critically endangered species from {region}:
            </h2>
            {renderBasedOnReqState(
                renderWarningOrData(
                    <Species species={crSpecies} />,
                    crSpecies,
                    "No critically endangered species could be found from the region."
                ),
                crSpeciesReqState
            )}
            <h2 className="my-5">Mammals from {region}:</h2>
            {renderBasedOnReqState(
                renderWarningOrData(
                    <Mammals mammals={mammals} />,
                    mammals,
                    "No mammals could be found from the region."
                ),
                mammalsReqState
            )}
        </div>
    );
};

export default App;
