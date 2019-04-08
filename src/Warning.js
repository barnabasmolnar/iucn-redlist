import React from "react";

const Warning = ({ warningMsg }) => (
    <div className="alert alert-warning" role="alert">
        {warningMsg}
    </div>
);

export default Warning;
