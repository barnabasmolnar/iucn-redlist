import React from "react";

const SpeciesRow = ({scientific_name, con_measures}) => (
    <tr>
        <td>{scientific_name}</td>
        <td>{con_measures ? con_measures : "None found"}</td>
    </tr>
);

export default SpeciesRow;
