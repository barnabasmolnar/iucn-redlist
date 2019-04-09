import React from "react";
import { LOADING, SUCCESS } from "./utils";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import Warning from "./Warning";

// Takes a component, the data, a warning msg and a reqState as parameters
// Based on the reqState it returns either
// - a loading spinner
// - the component itself or a warning msg if there is no data to display
// - or an error component
export const renderBasedOnReqState = (component, data, warningMsg, reqState) => {
    switch (reqState) {
        case LOADING:
            return <Loading />;
        case SUCCESS:
            return data.length > 0 ? component : <Warning warningMsg={warningMsg} />
        default:
            return <ErrorDisplay errorMsg={reqState} />;
    }
};
