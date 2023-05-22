import React from "react";
import { Routes, Route } from "react-router-dom";
import ManufacturerPageLayout from "./ManufacturerPageLayout";
import ManufacturerDetails from "./ManufacturerDetails";
import Attachments from "./Attachments";

/*------------This function has routes defined for add manufacturer page-----------------*/
export default function ManufacturerPageRouters() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<ManufacturerPageLayout />}>
                    <Route index={true} element={<ManufacturerDetails />} />
                    <Route path="attachments" element={<Attachments />} />
                </Route>
            </Routes>
        </div>
    );
}
