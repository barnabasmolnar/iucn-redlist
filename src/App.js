import React, { useState, useEffect } from "react";
import axios from "axios";
import { TOKEN, API_URL } from "./config";

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
        axios
            .get(`${API_URL}/region/list?token=${TOKEN}`)
            .then(({ data }) => {
                const randomRegion =
                    data.results[
                        Math.floor(Math.random() * data.results.length)
                    ];

                console.log(randomRegion);
                setRegion(randomRegion.name);
                return randomRegion.identifier;
            })
            .then(randomRegionID => {
                console.log(randomRegionID);
                axios
                    .get(
                        `${API_URL}/species/region/${randomRegionID}/page/0?token=${TOKEN}`
                    )

                    .then(({ data: { result } }) => {
                        // setSpecies(result);
                        // console.log(result);

                        const species = result;
                        console.log(species);

                        const filteredMammals = species.filter(
                            s => s.class_name === "MAMMALIA"
                        );
                        console.log(filteredMammals);
                        setMammals(filteredMammals);

                        const criticallyEndangered = species
                            .filter(s => s.category === "CR")
                            .slice(0, 10);
                        console.log(criticallyEndangered);

                        const promises = criticallyEndangered.map(c =>
                            axios
                                .get(
                                    `${API_URL}/measures/species/id/${
                                        c.taxonid
                                    }?token=${TOKEN}`
                                )
                                .then(({ data: { result } }) => ({
                                    ...c,
                                    con_measures: result
                                        .map(r => r.title)
                                        .join(", ")
                                }))
                        );
                        Promise.all(promises).then(setcrSpecies);
                    });
            });
    }, []);

    // return <div>Hello there!</div>;
    return (
        <div>
            {crSpecies.map(c => (
                <div {...c} key={c.taxonid}>
                    {c.scientific_name}
                </div>
            ))}
        </div>
    );
};

export default App;
