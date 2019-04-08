import React, { useState, useEffect } from "react";
import axios from "axios";
import { TOKEN, API_URL } from "./config";
import Species from "./Species";
import Mammals from "./Mammals";
import { randomElemFromArray, limitResults, LOADING, SUCCESS } from "./utils";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import Warning from "./Warning";

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

    useEffect(() => {
        (async () => {
            try {
                var allRegions = await axios.get(
                    `${API_URL}/region/list?token=${TOKEN}`
                );
            } catch {
                const errorMsg = "Error. Regions could not be fetched.";
                setCrSpeciesReqState(new Error(errorMsg));
                setmammalsReqState(new Error(errorMsg));
                return;
            }

            const randomRegion = randomElemFromArray(allRegions.data.results);
            console.log(randomRegion);

            setRegion(randomRegion.name);

            try {
                var speciesFromRegion = await axios.get(
                    `${API_URL}/species/region/${
                        randomRegion.identifier
                    }/page/0?token=${TOKEN}`
                );
                console.log(speciesFromRegion);
            } catch {
                const errorMsg = "Error. Species could not be fetched.";
                setCrSpeciesReqState(new Error(errorMsg));
                setmammalsReqState(new Error(errorMsg));
                return;
            }

            const species = speciesFromRegion.data.result;

            const filteredMammals = limitResults(
                species.filter(s => s.class_name === "MAMMALIA")
            );
            console.log(filteredMammals);
            setMammals(filteredMammals);
            setmammalsReqState(SUCCESS);

            const criticallyEndangered = limitResults(
                species.filter(s => s.category === "CR")
            );
            console.log(criticallyEndangered);

            const promises = criticallyEndangered.map(async c => {
                const measures = await axios.get(
                    `${API_URL}/measures/species/id/${c.taxonid}?token=${TOKEN}`
                );
                return {
                    ...c,
                    con_measures: measures.data.result
                        .map(r => r.title)
                        .join(", ")
                };
            });

            Promise.all(promises)
                .then(crSpecies => {
                    setcrSpecies(crSpecies);
                    setCrSpeciesReqState(SUCCESS);
                })
                .catch(() => {
                    const errorMsg =
                        "Error. Conservation measures could not be fetched.";
                    setCrSpeciesReqState(new Error(errorMsg));
                });
        })();
    }, []);

    const renderBasedOnReqState = (component, reqState) => {
        switch (reqState) {
            case LOADING:
                return <Loading />;
            case SUCCESS:
                return component;
            default:
                return <ErrorDisplay errorMsg={reqState.message} />;
        }
    };

    const renderWarningOrData = (component, dataArray, warningMsg) =>
        dataArray.length > 0 ? component : <Warning warningMsg={warningMsg} />;

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
