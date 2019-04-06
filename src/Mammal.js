import React from "react";

const Mammals = props => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
        {props.scientific_name}
        <span className="badge badge-primary badge-pill">{props.category}</span>
    </li>
);

export default Mammals;
