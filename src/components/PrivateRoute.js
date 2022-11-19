import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ condition, redirectLink }) {
    if (!condition) {
        return <Navigate to={redirectLink} />;
    }
    return <Outlet />;
}
export default PrivateRoute;
