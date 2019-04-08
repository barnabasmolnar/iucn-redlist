import React from "react";

const ErrorDisplay = ({ errorMsg }) => (
    <div className="alert alert-danger" role="alert">
        {errorMsg}
    </div>
);

export default ErrorDisplay;
