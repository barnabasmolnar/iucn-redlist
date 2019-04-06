import React from "react";
import Mammal from "./Mammal";

const Mammals = ({ mammals }) => (
    <ul className="list-group">
        {mammals.map(m => (
            <Mammal key={m.taxonid} {...m} />
        ))}
    </ul>
);

export default Mammals;
