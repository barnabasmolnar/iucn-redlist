import React from "react";

const Mammal = ({ scientific_name, category }) => (
    <li className="list-group-item d-flex justify-content-between align-items-center">
        {scientific_name}
        <span className="badge badge-primary badge-pill">{category}</span>
    </li>
);

export default Mammal;
