import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { jsPDF } from "jspdf";
import { Link, useNavigate } from "react-router-dom";
import { Icon, Button } from "@shopify/polaris";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import { NewTaskAction, NewTaskErrorMsgAction, NewTaskPageOnAction } from "../Redux";
import { connect } from "react-redux";
import moment from 'moment';
import { NewTaskActivityCreateService, NewTaskAllFilesService, NewTaskDeleteService, NewTaskParticularGetService } from "../Services";
import { GetParticularCustomerCompanyService } from "../Services/Customer Services/GetParticularCustomerCompanyService";

/*-----------This function contains the page layout in which the first and second tabs are integrated in one page 
along with back, reset, save and continue edit, save new task button functionality------------------------------*/

const NewTaskPageLayout = (props) => {
    const [firstPageClass, setFirstPageClass] = useState("active_hover-class");
    const [secondPageClass, setSecondPageClass] = useState();
    const [savedNewTask, setSavedNewTask] = useState(false);
    const [editedSavedNewTask, setEditedSavedNewTask] = useState(false);
    const [savedNewTaskId, setSavedNewTaskId] = useState();
    const handleFirstPage = () => {
        setFirstPageClass("active_hover-class");
        setSecondPageClass();
    };
    const handleSecondPage = () => {
        setFirstPageClass();
        setSecondPageClass("active_hover-class");
    };
    const navigate = useNavigate();
    let array_error = [];
    let array_checker = [false, false, false];
    let array_activity = [];
    const handleSaveNewTask = async () => {
        document.querySelectorAll(".new_task_required_cls").forEach(itm => {
            if (itm.value == "") {
                array_error.push(itm.getAttribute("index"));
            }
        });
        array_error.forEach(item => {
            array_checker[item] = true;
        });
        let checked_array = array_checker.every((item) => {
            return item == false;
        });
        props.NewTaskErrorMsgAction(array_checker[0], array_checker[1], array_checker[2]);
        var formData = new FormData();
        if (props.newTaskPageOn === "edit") {
            if (props.new_task_attachments_array.length > 0) {
                props.new_task_attachments_array.forEach(file => {
                    formData.append('attachments[]', file);
                });
            }
        } else {
            props.new_task_attachments_array.forEach(file => {
                formData.append('attachments[]', file);
            });
        }
        formData.append('status', props.new_task_status);
        formData.append('company', props.new_task_company);
        formData.append('order_placed_by', props.new_task_order_placed_by);
        formData.append('order_type', props.new_task_order_type);
        formData.append('shipping_method', props.new_task_shipping_method);
        formData.append('ship_date', props.new_task_ship_date);
        formData.append('order_details', props.new_task_order_details);
        formData.append('internal_notes', props.new_task_internal_notes);
        if (checked_array === true) {
            if (props.newTaskPageOn === "edit") {
                if (editedSavedNewTask === false) {
                    formData.append('new_task_id', props.new_task_id);
                    let options = {
                        method: "POST",
                        body: formData
                    };
                    const url = window.location.origin + "/api/newTaskCreateAndUpdate";
                    let fetchRes = fetch(url, options);
                    fetchRes.then((res) => res.json()).then((result) => {
                        if (result) {
                            navigate("/new_task/home");
                            setSavedNewTask(false);
                            props.NewTaskPageOnAction("home");
                            setEditedSavedNewTask(false);
                            props.NewTaskAction("Pending", "", "", "North", "", "", "", "", "", [], "");
                            if (!Array.isArray(result.changes)) {
                                for (let i = 0; i < Object.keys(result.changes).length - 1; i++) {
                                    array_activity.push(
                                        Object.keys(result.changes)[i] === "status" ?
                                            { user: props.staff_member_logged_in, action: `Order Status changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                            Object.keys(result.changes)[i] === "company" ?
                                                { user: props.staff_member_logged_in, action: `Company changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                Object.keys(result.changes)[i] === "order_placed_by" ?
                                                    { user: props.staff_member_logged_in, action: `Order Placed By changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                    Object.keys(result.changes)[i] === "order_type" ?
                                                        { user: props.staff_member_logged_in, action: `Order Type changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                        Object.keys(result.changes)[i] === "shipping_method" ?
                                                            { user: props.staff_member_logged_in, action: `Shipping Method changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                            Object.keys(result.changes)[i] === "ship_date" ?
                                                                { user: props.staff_member_logged_in, action: `Ship Date changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                Object.keys(result.changes)[i] === "order_details" ?
                                                                    { user: props.staff_member_logged_in, action: `Order Details changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                    Object.keys(result.changes)[i] === "internal_notes" ?
                                                                        { user: props.staff_member_logged_in, action: `Internal Notes changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                        { user: props.staff_member_logged_in, action: `Attachments changed`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') }
                                    );
                                }
                            }
                            try {
                                const data = { new_task_id: props.new_task_id, array_activity: array_activity };
                                NewTaskActivityCreateService(data);
                            } catch { }
                        }
                    });
                } else {
                    navigate("/new_task/home");
                    setSavedNewTask(false);
                    props.NewTaskPageOnAction("home");
                    setEditedSavedNewTask(false);
                    props.NewTaskAction("Pending", "", "", "North", "", "", "", "", "", [], "");
                }
            } else {
                if (editedSavedNewTask === false) {
                    let options = {
                        method: "POST",
                        body: formData
                    };
                    const url = window.location.origin + "/api/newTaskCreateAndUpdate";
                    let fetchRes = fetch(url, options);
                    fetchRes.then((res) => res.json()).then((result) => {
                        if (result) {
                            navigate("/new_task/home");
                            setSavedNewTask(false);
                            props.NewTaskPageOnAction("home");
                            setEditedSavedNewTask(false);
                            props.NewTaskAction("Pending", "", "", "North", "", "", "", "", "", [], "");
                            array_activity.push({ user: props.staff_member_logged_in, action: "New Task Created", time: moment(result.data.created_at).format('MMM D, YYYY, h:mm:ss A') });
                            try {
                                const data = { new_task_id: result.data.id, array_activity: array_activity };
                                NewTaskActivityCreateService(data);
                            } catch { }
                        }
                    });
                } else {
                    navigate("/new_task/home");
                    setSavedNewTask(false);
                    props.NewTaskPageOnAction("home");
                    props.NewTaskAction("Pending", "", "", "North", "", "", "", "", "", [], "");
                    setEditedSavedNewTask(false);
                }
            }
        }
    };
    const handleSaveContinueEdit = async () => {
        document.querySelectorAll(".new_task_required_cls").forEach(itm => {
            if (itm.value == "") {
                array_error.push(itm.getAttribute("index"));
            }
        });
        array_error.forEach(item => {
            array_checker[item] = true;
        });
        let checked_array = array_checker.every((item) => {
            return item == false;
        });
        props.NewTaskErrorMsgAction(array_checker[0], array_checker[1], array_checker[2]);
        var formData = new FormData();
        if (props.newTaskPageOn === "edit") {
            if (props.new_task_attachments_array.length > 0) {
                props.new_task_attachments_array.forEach(file => {
                    formData.append('attachments[]', file);
                    formData.append('files_change', Math.floor(1000 + Math.random() * 9000));
                });
            }
        } else {
            props.new_task_attachments_array.forEach(file => {
                formData.append('attachments[]', file);
            });
        }
        formData.append('status', props.new_task_status);
        formData.append('company', props.new_task_company);
        formData.append('order_placed_by', props.new_task_order_placed_by);
        formData.append('order_type', props.new_task_order_type);
        formData.append('shipping_method', props.new_task_shipping_method);
        formData.append('ship_date', props.new_task_ship_date);
        formData.append('order_details', props.new_task_order_details);
        formData.append('internal_notes', props.new_task_internal_notes);
        if (checked_array !== "") {
            if (props.newTaskPageOn === "edit") {
                formData.append('new_task_id', props.new_task_id);
                let options = {
                    method: "POST",
                    body: formData
                };
                const url = window.location.origin + "/api/newTaskCreateAndUpdate";
                let fetchRes = fetch(url, options);
                fetchRes.then((res) => res.json()).then((result) => {
                    if (result) {
                        navigate("/new_task/pagerouters");
                        setEditedSavedNewTask(true);
                        if (!Array.isArray(result.changes)) {
                            for (let i = 0; i < Object.keys(result.changes).length - 1; i++) {
                                array_activity.push(
                                    Object.keys(result.changes)[i] === "status" ?
                                        { user: props.staff_member_logged_in, action: `Order Status changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                        Object.keys(result.changes)[i] === "company" ?
                                            { user: props.staff_member_logged_in, action: `Company changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                            Object.keys(result.changes)[i] === "order_placed_by" ?
                                                { user: props.staff_member_logged_in, action: `Order Placed By changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                Object.keys(result.changes)[i] === "order_type" ?
                                                    { user: props.staff_member_logged_in, action: `Order Type changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                    Object.keys(result.changes)[i] === "shipping_method" ?
                                                        { user: props.staff_member_logged_in, action: `Shipping Method changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                        Object.keys(result.changes)[i] === "ship_date" ?
                                                            { user: props.staff_member_logged_in, action: `Ship Date changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                            Object.keys(result.changes)[i] === "order_details" ?
                                                                { user: props.staff_member_logged_in, action: `Order Details changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                Object.keys(result.changes)[i] === "internal_notes" ?
                                                                    { user: props.staff_member_logged_in, action: `Internal Notes changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                    { user: props.staff_member_logged_in, action: `Attachments changed`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') }
                                );
                            }
                        }
                        try {
                            const data = { new_task_id: props.new_task_id, array_activity: array_activity };
                            NewTaskActivityCreateService(data);
                        } catch { }
                    }
                });
            } else {
                if (savedNewTask === false) {
                    let options = {
                        method: "POST",
                        body: formData
                    };
                    const url = window.location.origin + "/api/newTaskCreateAndUpdate";
                    let fetchRes = fetch(url, options);
                    fetchRes.then((res) => res.json()).then((result) => {
                        if (result) {
                            navigate("/new_task/pagerouters");
                            setSavedNewTask(true);
                            setSavedNewTaskId(result.data.id);
                            setEditedSavedNewTask(true);
                            array_activity.push({ user: props.staff_member_logged_in, action: "New Task Created", time: moment(result.data.created_at).format('MMM D, YYYY, h:mm:ss A') });
                            try {
                                const data = { new_task_id: result.data.id, array_activity: array_activity };
                                NewTaskActivityCreateService(data);
                            } catch { }
                        }
                    });
                } else {
                    formData.append('new_task_id', savedNewTaskId);
                    let options = {
                        method: "POST",
                        body: formData
                    };
                    const url = window.location.origin + "/api/newTaskCreateAndUpdate";
                    let fetchRes = fetch(url, options);
                    fetchRes.then((res) => res.json()).then((result) => {
                        if (result) {
                            navigate("/new_task/pagerouters");
                            setEditedSavedNewTask(true);
                            if (!Array.isArray(result.changes)) {
                                for (let i = 0; i < Object.keys(result.changes).length; i++) {
                                    array_activity.push(
                                        Object.keys(result.changes)[i] === "status" ?
                                            { user: props.staff_member_logged_in, action: `Order Status changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                            Object.keys(result.changes)[i] === "company" ?
                                                { user: props.staff_member_logged_in, action: `Company changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                Object.keys(result.changes)[i] === "order_placed_by" ?
                                                    { user: props.staff_member_logged_in, action: `Order Placed By changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                    Object.keys(result.changes)[i] === "order_type" ?
                                                        { user: props.staff_member_logged_in, action: `Order Type changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                        Object.keys(result.changes)[i] === "shipping_method" ?
                                                            { user: props.staff_member_logged_in, action: `Shipping Method changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                            Object.keys(result.changes)[i] === "ship_date" ?
                                                                { user: props.staff_member_logged_in, action: `Ship Date changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                Object.keys(result.changes)[i] === "order_details" ?
                                                                    { user: props.staff_member_logged_in, action: `Order Details changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                    Object.keys(result.changes)[i] === "internal_notes" ?
                                                                        { user: props.staff_member_logged_in, action: `Internal Notes changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                        { user: props.staff_member_logged_in, action: `Attachments changed`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') }
                                    );
                                }
                            }
                            try {
                                const data = { new_task_id: props.new_task_id, array_activity: array_activity };
                                NewTaskActivityCreateService(data);
                            } catch { }
                        }
                    });
                }
            }
        }
    };
    const handleGeneratePdf = async () => {
        try {
            const data = { company: props.new_task_company };
            const result = await GetParticularCustomerCompanyService(data);
            const data1 = { new_task_id: newTask.id };
            const result1 = await NewTaskAllFilesService(data1);
            const doc = new jsPDF();
            doc.html(
                renderToString(
                    <div className="page">
                        <div style={{ margin: "40px" }}>
                            <div>
                                <h1>{props.new_task_company}</h1>
                                <h2>New Task #{props.new_task_id}</h2>
                            </div>
                            <h1 style={{ fontSize: "20px" }}>COMPANY DETAILS:</h1>
                            <div style={{ maxWidth: "430px", paddingLeft: "25px" }}>
                                <div style={{ display: "flex", alignItems: "center", fleWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                    <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Phone Number:</p> <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>416-368-8240</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", fleWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                    <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Fax Number:</p><p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>416-368-8057</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", fleWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                    <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Customer Email:</p><p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>{result.data[0].email}</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", fleWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                    <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Account Number:</p><p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>#4</p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", fleWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                    <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Shipping Address:</p><p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>55 Queen Street East #1210</p>
                                </div>
                            </div>
                            <div style={{ padding: "40px 0" }}>
                                <h1 style={{ fontSize: "20px" }}>ORDER DETAILS:</h1>
                                <div style={{ maxWidth: "430px", paddingLeft: "25px" }}>
                                    <h4 style={{ marginTop: "0" }}>{props.new_task_order_details}</h4>
                                    <div style={{ display: "flex", alignItems: "center", fleWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                        <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Order Date:</p>
                                        <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%", borderBottom: "1px solid #000" }}>{moment(props.new_task_created_at).format('MMM D, YYYY, h:mm:ss A')}</p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", fleWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                        <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Ship Date:</p>
                                        <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%", borderBottom: "1px solid #000" }}>{moment(props.new_task_ship_date).format('MMM D, YYYY')}</p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", fleWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                        <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Ship Method:</p>
                                        <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%", borderBottom: "1px solid #000" }}>{props.new_task_shipping_method}</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500" }}>Scheduled by:</p>
                                <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", paddingLeft: "10px" }}>{props.new_task_order_placed_by}</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500" }}>Processed by:</p>
                                <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", paddingLeft: "10px" }}>nick seth</p>
                                {result1.data.map((file) => {
                                    return (
                                        <div>
                                            {process.env.MIX_ENV === "local" ?
                                                <>{JSON.parse(file.filenames).split('.').pop() == "png" || JSON.parse(file.filenames).split('.').pop() == "jpg" || JSON.parse(file.filenames).split('.').pop() == "jpeg" ? <img src={window.location.origin + file.filepath} /> : null}</>
                                                :
                                                <>{JSON.parse(file.filenames).split('.').pop() == "png" || JSON.parse(file.filenames).split('.').pop() == "jpg" || JSON.parse(file.filenames).split('.').pop() == "jpeg" ? <img src={window.location.origin + '/public/storage/files/' + JSON.parse(file.filenames)} /> : null}</>
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ),
                {
                    callback: function (doc) {
                        doc.save('sample.pdf');
                    },
                    html2canvas: { scale: 0.23 }
                });
        } catch { }
    };
    const handleDeleteNewTask = async () => {
        try {
            const data = {
                new_task_id: props.new_task_id,
            };
            const result = await NewTaskDeleteService(data);
            if (result) {
                navigate("/new_task/home");
                props.NewTaskPageOnAction("home");
                // props.EditManuDataAction("");
            }
        } catch (e) { }
    };
    return (
        <div className="tab-wrapper">
            <div className="add_special_order bg-white">
                <div className="link-wrapper">
                    <Link to="/new_task/home" onClick={() => {
                        props.NewTaskAction("Pending", "", "", "North", "", "", "", "", "", [], "");
                        // props.EditManuDataAction("");
                        props.NewTaskPageOnAction("home");
                        // props.AttachmentsManuAction("", "");
                    }}>
                        <h2>
                            <Icon source={MobileBackArrowMajor} color="base" />
                            Back
                        </h2>
                    </Link>
                    {props.newTaskPageOn === "edit" && (<h2 onClick={handleDeleteNewTask}>Delete New Task</h2>)}
                    <h2 onClick={() => props.NewTaskAction("Pending", "", "", "North", "", "", "", "", "", [], "")}>Reset</h2>
                    {props.newTaskPageOn === "edit" && (<h2 onClick={handleGeneratePdf}>Generate PDF</h2>)}
                    <h2 onClick={handleSaveContinueEdit}>Save and Continue Edit</h2>
                    <Button onClick={handleSaveNewTask}>Save New Task</Button>
                </div>
                <div className="order-wrapping">
                    <div className="order-tabs_all">
                        <div className="order-tab_wrap">
                            <ul>
                                <h1>Information</h1>
                                <Link to="/new_task/pagerouters">
                                    <li
                                        className={firstPageClass}
                                        onClick={handleFirstPage}
                                    >
                                        New Task Information
                                    </li>
                                </Link>
                                <Link to="/new_task/pagerouters/activity">
                                    <li
                                        className={secondPageClass}
                                        onClick={handleSecondPage}
                                    >
                                        Activity
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="order-within_wrap">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        new_task_status: state.new_task_status,
        new_task_company: state.new_task_company,
        new_task_order_placed_by: state.new_task_order_placed_by,
        new_task_order_type: state.new_task_order_type,
        new_task_shipping_method: state.new_task_shipping_method,
        new_task_ship_date: state.new_task_ship_date,
        new_task_order_details: state.new_task_order_details,
        new_task_internal_notes: state.new_task_internal_notes,
        new_task_attachments: state.new_task_attachments,
        new_task_attachments_array: state.new_task_attachments_array,
        new_task_created_at: state.new_task_created_at,
        new_task_company_err: state.new_task_company_err,
        new_task_order_placed_by_err: state.new_task_order_placed_by_err,
        new_task_order_details_err: state.new_task_order_details_err,
        new_task_id: state.new_task_id,
        newTaskPageOn: state.newTaskPageOn,
        staff_member_logged_in: state.staff_member_logged_in
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        NewTaskAction: (new_task_status, new_task_company, new_task_order_placed_by, new_task_order_type, new_task_shipping_method, new_task_ship_date, new_task_order_details, new_task_internal_notes, new_task_attachments, new_task_attachments_array, new_task_created_at) => dispatch(NewTaskAction(new_task_status, new_task_company, new_task_order_placed_by, new_task_order_type, new_task_shipping_method, new_task_ship_date, new_task_order_details, new_task_internal_notes, new_task_attachments, new_task_attachments_array, new_task_created_at)),
        NewTaskErrorMsgAction: (new_task_company_err, new_task_order_placed_by_err, new_task_order_details_err) => dispatch(NewTaskErrorMsgAction(new_task_company_err, new_task_order_placed_by_err, new_task_order_details_err)),
        NewTaskPageOnAction: (newTaskPageOn) => dispatch(NewTaskPageOnAction(newTaskPageOn))
    };
};

/*-------NewTaskPageLayout function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(NewTaskPageLayout);
