import React from "react";
import SpeciesRow from "./SpeciesRow";

const Species = ({ species }) => (
    <div className="table-responsive">
        <table className="table">
            <thead>
                <tr>
                    <th width="25%">Scientific name</th>
                    <th width="75%">Conservation measures</th>
                </tr>
            </thead>
            <tbody>
                {species.map(s => (
                    <SpeciesRow key={s.taxonid} {...s} />
                ))}
            </tbody>
        </table>
    </div>
);

export default Species;
