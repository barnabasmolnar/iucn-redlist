import React, { useState, useEffect } from "react";
import axios from "axios";
import { TOKEN, API_URL } from "./config";
import Species from "./Species";
import Mammals from "./Mammals";
import { randomElemFromArray, limitResults } from "./utils";

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

    useEffect(() => {
        (async () => {
            const allRegions = await axios.get(
                `${API_URL}/region/list?token=${TOKEN}`
            );
            const randomRegion = randomElemFromArray(allRegions.data.results);
            console.log(randomRegion);

            setRegion(randomRegion.name);

            const speciesFromRegion = await axios.get(
                `${API_URL}/species/region/${
                    randomRegion.identifier
                }/page/0?token=${TOKEN}`
            );
            console.log(speciesFromRegion);

            const species = speciesFromRegion.data.result;

            const filteredMammals = limitResults(
                species.filter(s => s.class_name === "MAMMALIA")
            );
            console.log(filteredMammals);
            setMammals(filteredMammals);

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

            Promise.all(promises).then(setcrSpecies);
        })();
    }, []);

    // return <div>Hello there!</div>;
    return (
        <div className="container my-5">
            <h2 className="mb-5">
                Critically endangered species from {region}:
            </h2>
            <Species species={crSpecies} />
            <h2 className="my-5">Mammals from {region}:</h2>
            <Mammals mammals={mammals} />
        </div>
    );
};

export default App;
