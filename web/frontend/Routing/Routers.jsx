import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home/Home";
import ManufacturerHome from "../components/Manufacturer Home/ManufacturerHome";
import ManufacturerPageRouters from "../components/Add Manufacturer/ManufacturerPageRoutes";
import { connect } from "react-redux";
import NewTaskHome from "../components/New Task Home/NewTaskHome";
import NewTaskPageRouters from "../components/Task List/NewTaskPageRoutes";
import UserAuth from "../components/User Auth/UserAuth";
import SpecialOrderPageRouters from "../pages/Add Special Order/AddSpecialOrderPageRoutes";
import PrivateRoutes from "./PrivateRoutes";
// import "../../../css/app.css";


function Routers() {
    return (
        <Routes>
            <Route path="/user_auth" element={<UserAuth />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route
                    path="/special_order/pagerouters/*"
                    element={<SpecialOrderPageRouters />}
                />
                <Route path="/manufacturer/home" element={<ManufacturerHome />} />
                <Route
                    path="/manufacturer/pagerouters/*"
                    element={<ManufacturerPageRouters />}
                />
                <Route path="/new_task/home" element={<NewTaskHome />} />
                <Route
                    path="/new_task/pagerouters/*"
                    element={<NewTaskPageRouters />}
                />
            </Route>
        </Routes>


    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default Routers
// connect(mapStateToProps, mapDispatchToProps)(Routers);