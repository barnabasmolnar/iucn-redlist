import React, { useState, useEffect } from "react";
import { LOADING, getConMeasure, SUCCESS } from "./utils";
import { renderBasedOnReqState, renderWarningOrData } from "./renderUtils";

const SpeciesRow = ({ scientific_name, taxonid }) => {
    const [measure, setMeasure] = useState("");
    const [reqState, setReqstate] = useState(LOADING);

    useEffect(() => {
        const fn = async () => {
            try {
                const conMeasure = await getConMeasure(taxonid);
                setMeasure(conMeasure);
                setReqstate(SUCCESS);
            } catch (error) {
                setReqstate(error);
            }
        };

        fn();
    }, []);

    return (
        <tr>
            <td>{scientific_name}</td>
            <td>
                {renderBasedOnReqState(
                    renderWarningOrData(measure, measure, "None found."),
                    reqState
                )}
            </td>
        </tr>
    );
};

export default SpeciesRow;
