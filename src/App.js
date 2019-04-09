import React, { useState, useEffect } from "react";
import Species from "./Species";
import Mammals from "./Mammals";
import {
    limitResults,
    LOADING,
    SUCCESS,
    getRandomRegion,
    getSpecies
} from "./utils";
import { renderBasedOnReqState } from "./renderUtils";

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
    const [reqState, setReqState] = useState(LOADING);

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
                setMammals(filteredMammals);

                // We filter the species array down to the critically
                // endangered species and set the respective state
                // as we did before with the mammals
                const criticallyEndangered = limitResults(
                    species.filter(s => s.category === "CR")
                );
                setcrSpecies(criticallyEndangered);

                // And finally we set the reqState to indicate that
                // the request has been successfully made
                setReqState(SUCCESS);
            } catch (error) {
                setReqState(error);
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
                <Species species={crSpecies} />,
                crSpecies,
                "No critically endangered species could be found from the region.",
                reqState
            )}
            <h2 className="my-5">Mammals from {region}:</h2>
            {renderBasedOnReqState(
                <Mammals mammals={mammals} />,
                mammals,
                "No mammals could be found from the region.",
                reqState
            )}
        </div>
    );
};

export default App;
