import React from "react";

const SpeciesRow = props => (
    <tr>
        <td>{props.scientific_name}</td>
        <td>{props.con_measures ? props.con_measures : "None"}</td>
    </tr>
);

export default SpeciesRow;
