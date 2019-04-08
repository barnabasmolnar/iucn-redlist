import React from "react";
import { LOADING, SUCCESS } from "./utils";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import Warning from "./Warning";

// Takes a component and a reqState as parameters
// Based on the reqState it returns a loading spinner,
// the component itself or an error display
export const renderBasedOnReqState = (component, reqState) => {
    switch (reqState) {
        case LOADING:
            return <Loading />;
        case SUCCESS:
            return component;
        default:
            return <ErrorDisplay errorMsg={reqState} />;
    }
};

// Returns a warning component if there is no data to display
// Otherwise it returns a component
export const renderWarningOrData = (component, data, warningMsg) =>
    data.length > 0 ? component : <Warning warningMsg={warningMsg} />;
