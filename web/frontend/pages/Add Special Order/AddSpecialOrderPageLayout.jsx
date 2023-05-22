import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { jsPDF } from "jspdf";
// import { Link, useNavigate } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";
import { Icon, Button } from "@shopify/polaris";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import {
    Action, ProductsAction, ManufacturersAction, SpclOrderAction, NewSpclOrderAction, OrderPageOnAction,
    CustomerCompanyAction, ErrorMsgAction
} from "../../components";
import { connect } from "react-redux";
import moment from 'moment';
import { DeleteOrderService, UserOrderActivityCreateService } from "../../components";

/*---------------This function has add special order page layout in which all its tabs are integrated along
with back, reset, save special order button functionality--------------*/
const AddSpecialOrderPageLayout = (props) => {
    console.log("spcelkhh--->", window.location);
    const [firstPageClass, setFirstPageClass] = useState("active_hover-class");
    const [secondPageClass, setSecondPageClass] = useState();
    const [thirdPageClass, setThirdPageClass] = useState();
    const [fourthPageClass, setFourthPageClass] = useState();
    const [fivethPageClass, setFivethPageClass] = useState();
    const [sixthPageClass, setSixthPageClass] = useState();
    let array_error = [];
    let array_checker = [false, false, false, false, false, false, false, false];
    let array_activity = [];
    const navigate = useNavigate();
    var todayDate = new Date().toISOString().slice(0, 10);
    useEffect(() => {
        if (props.clicked === true) {
            handleFirstPage();
        }
        if (props.click === true) {
            handleFivethPage();
        }
        if (props.clickCust === true) {
            handleThirdPage();
        }
        if (props.clickManu === true) {
            handleFourthPage();
        }
        return (() => {
            props.Action(
                props.customer, false, false
            );
            props.ProductsAction(
                props.src, false
            );
            props.ManuAction(
                props.manu, false
            );
        });
    }, [props.clicked, props.click, props.clickCust, props.clickManu]);
    useEffect(() => {
        if (props.orderPageOn === "add") {
            props.Action("", false, false);
            props.ProductsAction("", false);
            props.ManuAction("", false);
            props.SpclOrderAction("", "", "", "", "", "", "", "", []);
        }
    }, []);
    const handleFirstPage = () => {
        navigate("/special_order/pagerouters");
        setFirstPageClass("active_hover-class");
        setSecondPageClass();
        setThirdPageClass();
        setFourthPageClass();
        setFivethPageClass();
        setSixthPageClass();
    };
    const handleSecondPage = () => {
        navigate("/special_order/pagerouters/scanned_copy");
        setFirstPageClass();
        setSecondPageClass("active_hover-class");
        setThirdPageClass();
        setFourthPageClass();
        setFivethPageClass();
        setSixthPageClass();
    };
    const handleThirdPage = () => {
        setFirstPageClass();
        setSecondPageClass();
        setThirdPageClass("active_hover-class");
        setFourthPageClass();
        setFivethPageClass();
        setSixthPageClass();
    };
    const handleFourthPage = () => {
        setFirstPageClass();
        setSecondPageClass();
        setThirdPageClass();
        setFourthPageClass("active_hover-class");
        setFivethPageClass();
        setSixthPageClass();
    };
    const handleFivethPage = () => {
        setFirstPageClass();
        setSecondPageClass();
        setThirdPageClass();
        setFourthPageClass();
        setFivethPageClass("active_hover-class");
        setSixthPageClass();
    };
    const handleSixthPage = () => {
        setFirstPageClass();
        setSecondPageClass();
        setThirdPageClass();
        setFourthPageClass();
        setFivethPageClass();
        setSixthPageClass("active_hover-class");
    };
    const handleSaveSpecialOrder = async () => {
        document.querySelectorAll(".required_cls").forEach(itm => {
            if (itm.value == "") {
                array_error.push(itm.getAttribute("AddSpecialOrderPageLayout"));
            }
        });
        array_error.forEach(item => {
            array_checker[item] = true;
        });
        let checked_array = array_checker.every((item) => {
            return item == false;
        });
        props.ErrorMsgAction(array_checker[0], array_checker[1], array_checker[2], array_checker[3], array_checker[4], array_checker[5], array_checker[6], array_checker[7]);
        var formData = new FormData();
        if (props.orderPageOn === "edit") {
            if (props.scanned_copy.length > 0) {
                props.scanned_copy.forEach(file => {
                    formData.append('scanned_copy[]', file);
                });
            }
        } else {
            props.scanned_copy.forEach(file => {
                formData.append('scanned_copy[]', file);
            });
        }
        formData.append('name', props.shop);
        formData.append('status', props.status);
        formData.append('stock_number', props.stock);
        formData.append('quantity', props.quantity);
        formData.append('karat', props.karat);
        formData.append('colour', props.colour);
        formData.append('size', props.size);
        formData.append('description', props.desc);
        formData.append('notes', props.cust_notes);
        formData.append('customer', props.customer);
        formData.append('customer_company', props.cust_company);
        formData.append('manufacturer', props.manu);
        formData.append('product_image', props.src);
        if (checked_array === true) {
            if (props.order_id === "") {
                let options = {
                    method: "POST",
                    body: formData
                };
                const url = window.location.origin + "/api/userOrderCreateAndUpdate";
                let fetchRes = fetch(url, options);
                fetchRes.then((res) => res.json()).then(async (result) => {
                    if (result) {
                        navigate("/");
                        props.NewSpclOrderAction(true);
                        props.Action("", props.clicked, props.clickCust);
                        props.ProductsAction("", props.click);
                        props.ManuAction("", props.clickManu);
                        props.SpclOrderAction("", "", "", "", "", "", "", "", "");
                        props.ErrorMsgAction(false, false, false, false, false, false, false, false);
                        const doc = new jsPDF();
                        doc.html(
                            renderToString(<div className="page">
                                <div className="demo">
                                    <div className="font-container" style={{ fontFamily: 'Times New Roman', fontWeight: "normal", fontStyle: "normal" }}>
                                        <div className="box">
                                            <div className="box-head dflex align-center space-between p5"><h1 className="title bold">{props.customer} {props.cust_company}</h1><div className="some-no bold">PO #3</div></div>
                                            <div className="box-content dflex space-between">
                                                <div className="left-clmn">
                                                    <h3>Stock #:</h3><span>{props.stock}</span>
                                                    <h3>Quantity:</h3><span>{props.quantity}</span>
                                                    <h3>Karat:</h3><span>{props.karat}</span>
                                                    <h3>Colour:</h3><span>{props.colour}</span>
                                                    <h3>Size:</h3><span>{props.size}</span>
                                                </div>
                                                <div className="right-clmn text-center">
                                                    <h2>Customer Agreement</h2>
                                                    <p className="justify">This  Special Order  cannot  be  cancelled  or  altered  in  any  form. Once  this  Special Order Form is confirmed  and  signed,  you  must  purchase the item(s) listed  and  understand  that  the transaction is NON-REFUNDABLE. Mary Jewellery and Lapidary Co. Ltd. will do its best to receive the item(s) in sufficient  time.  Production  delays  are  the  responsibly  of  the  purchaser  and  Mary Jewellery  and Lapidary Co. Ltd. will  not  be  held  responsible  for  any  production delays or cancellations from the manufacturer.</p>
                                                    <div className="sign-wrap dflex align-bottom"><div className="sign-label">Customer Signature: </div><div className="sign-placeholder"></div></div>
                                                </div>
                                            </div>
                                            <div class="box-footer dflex space-between">
                                                <div> <h5>Description:</h5>
                                                    <p>{props.desc}</p>
                                                </div>
                                                <div class="box-footer_img">
                                                    <img src={props.src} alt="" width="150" height="150" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="endline text-center">{todayDate} {props.customer}, {props.cust_company}</div>
                                    </div>
                                </div>
                                <hr />
                                <div className="demo">
                                    <div className="font-container" style={{ fontFamily: 'Times New Roman', fontWeight: "normal", fontStyle: "normal" }}>
                                        <div className="box">
                                            <div className="box-head dflex align-center space-between p5"><h1 className="title bold">Mary Jewellery Special Order</h1><div className="some-no bold">PO #3</div></div>
                                            <div className="box-content dflex space-between">
                                                <div className="left-clmn">
                                                    <h3>Stock #:</h3><span>{props.stock}</span>
                                                    <h3>Quantity:</h3><span>{props.quantity}</span>
                                                    <h3>Karat:</h3><span>{props.karat}</span>
                                                    <h3>Colour:</h3><span>{props.colour}</span>
                                                    <h3>Size:</h3><span>{props.size}</span>
                                                </div>
                                                <div className="right-clmn text-center">
                                                    <h2>Customer Agreement</h2>
                                                    <p className="justify">This  Special Order  cannot  be  cancelled  or  altered  in  any  form. Once  this  Special Order Form is confirmed  and  signed,  you  must  purchase the item(s) listed  and  understand  that  the transaction is NON-REFUNDABLE. Mary Jewellery and Lapidary Co. Ltd. will do its best to receive the item(s) in sufficient  time.  Production  delays  are  the  responsibly  of  the  purchaser  and  Mary Jewellery  and Lapidary Co. Ltd. will  not  be  held  responsible  for  any  production delays or cancellations from the manufacturer.</p>
                                                    <div className="sign-wrap dflex align-bottom"><div className="sign-label">Customer Signature: </div><div className="sign-placeholder"></div></div>
                                                </div>
                                            </div>
                                            <div class="box-footer dflex space-between">
                                                <div> <h5>Description:</h5>
                                                    <p>{props.desc}</p>
                                                </div>
                                                <div class="box-footer_img">
                                                    <img src={props.src} alt="" width="150" height="150" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="endline text-center">{todayDate}</div>
                                    </div>
                                </div>
                            </div>),
                            {
                                callback: function (doc) {
                                    doc.save('sample.pdf');
                                },
                                html2canvas: { scale: 0.23 }
                            });
                        array_activity.push({ user: props.staff_member_logged_in, action: "Special Order Created", time: moment(result.data.created_at).format('MMM D, YYYY, h:mm:ss A') });
                        try {
                            const data = { user_order_data_id: result.data.id, array_activity: array_activity };
                            await UserOrderActivityCreateService(data);
                        } catch { }
                    }
                });
            } else {
                formData.append('order_id', props.order_id);
                let options = {
                    method: "POST",
                    body: formData
                };
                const url = window.location.origin + "/api/userOrderCreateAndUpdate";
                let fetchRes = fetch(url, options);
                fetchRes.then((res) => res.json()).then(async (result) => {
                    if (result) {
                        navigate("/");
                        if (!Array.isArray(result.changes)) {
                            for (let i = 0; i < Object.keys(result.changes).length; i++) {
                                array_activity.push(
                                    Object.keys(result.changes)[i] === "name" ?
                                        { user: props.staff_member_logged_in, action: `Name changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                        Object.keys(result.changes)[i] === "status" ?
                                            { user: props.staff_member_logged_in, action: `Order Status changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                            Object.keys(result.changes)[i] === "stock_number" ?
                                                { user: props.staff_member_logged_in, action: `Stock Number changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                Object.keys(result.changes)[i] === "quantity" ?
                                                    { user: props.staff_member_logged_in, action: `Quantity changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                    Object.keys(result.changes)[i] === "karat" ?
                                                        { user: props.staff_member_logged_in, action: `Karat changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                        Object.keys(result.changes)[i] === "colour" ?
                                                            { user: props.staff_member_logged_in, action: `Colour changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                            Object.keys(result.changes)[i] === "size" ?
                                                                { user: props.staff_member_logged_in, action: `Size changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                Object.keys(result.changes)[i] === "description" ?
                                                                    { user: props.staff_member_logged_in, action: `Description changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                    Object.keys(result.changes)[i] === "notes" ?
                                                                        { user: props.staff_member_logged_in, action: `Notes changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                        Object.keys(result.changes)[i] === "image_attachment" ?
                                                                            { user: props.staff_member_logged_in, action: `Image Attachment changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                            Object.keys(result.changes)[i] === "customer" ?
                                                                                { user: props.staff_member_logged_in, action: `Customer changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                                Object.keys(result.changes)[i] === "customer_company" ?
                                                                                    { user: props.staff_member_logged_in, action: `Customer's Company changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') } :
                                                                                    { user: props.staff_member_logged_in, action: `Manufacturer changed to "${Object.values(result.changes)[i]}"`, time: moment(result.changes.created_at).format('MMM D, YYYY, h:mm:ss A') }
                                );
                            }
                        }
                        try {
                            const data = { user_order_data_id: props.order_id, array_activity: array_activity };
                            await UserOrderActivityCreateService(data);
                        } catch { }
                        props.NewSpclOrderAction(true);
                        props.Action("", props.clicked, props.clickCust);
                        props.ProductsAction("", props.click);
                        props.ManuAction("", props.clickManu);
                        props.SpclOrderAction("", "", "", "", "", "", "", "", "");
                        props.ErrorMsgAction(false, false, false, false, false, false, false, false);
                    }
                });
            }
        }
    };
    const handleDeleteOrder = async () => {
        try {
            const data = {
                order_id: props.order_id,
            };
            const result = await DeleteOrderService(data);
            if (result) {
                navigate("/");
                props.OrderPageOnAction("home");
                props.EditOrderDataAction("");
            }
        } catch (e) { }
    };
    return (
        <div className="tab-wrapper">
            <div className="add_special_order bg-white">
                <div className="link-wrapper">
                    <div onClick={() => {
                        props.Action("", false, false);
                        props.ProductsAction("", false);
                        props.ManuAction("", false);
                        props.SpclOrderAction("", "", "", "", "", "", "", "", []);
                        props.NewSpclOrderAction(false);
                        props.ErrorMsgAction(false, false, false, false, false, false, false, false);
                        props.OrderPageOnAction("home");
                        navigate("/");
                    }}>
                        <h2>
                            <Icon source={MobileBackArrowMajor} color="base" />
                            Back
                        </h2>
                    </div>
                    {props.orderPageOn === "edit" && (<h2 onClick={handleDeleteOrder}>Delete Special Order</h2>)}
                    {/* <h2 onClick={() => {
                        props.Action("", props.clicked, props.clickCust);
                        props.ProductsAction("", props.click);
                        props.ManuAction("", props.clickManu);
                        props.SpclOrderAction("", "", "", "", "", "", "", "", "");
                        props.NewSpclOrderAction(false);
                        props.ErrorMsgAction(false, false, false, false, false, false, false, false);
                    }}>Reset</h2> */}
                    <Button onClick={handleSaveSpecialOrder}>Save Special Order</Button>
                </div>
                <div className="order-wrapping">
                    <div className="order-tabs_all">
                        <div className="order-tab_wrap">
                            <ul>
                                <h1>Information</h1>
                                <div>
                                    <li
                                        className={firstPageClass}
                                        onClick={handleFirstPage}
                                    >
                                        Special Order Details
                                    </li>
                                </div>
                                <div>
                                    <li
                                        className={secondPageClass}
                                        onClick={handleSecondPage}
                                    >
                                        Scanned Copy
                                    </li>
                                </div>
                                {/* <div to="/AddSpecialOrderPage/select_customer">
                                    <li
                                        className={thirdPageClass}
                                        onClick={handleThirdPage}
                                    >
                                        Select Customer
                                    </li>
                                </div>
                                <div to="/AddSpecialOrderPage/select_manufacturer">
                                    <li
                                        className={fourthPageClass}
                                        onClick={handleFourthPage}
                                    >
                                        Select Manufacturer
                                    </li>
                                </div>
                                <div to="/AddSpecialOrderPage/product_images">
                                    <li
                                        className={fivethPageClass}
                                        onClick={handleFivethPage}
                                    >
                                        Product Images
                                    </li>
                                </div>
                                <div to="/AddSpecialOrderPage/activity">
                                    <li
                                        className={sixthPageClass}
                                        onClick={handleSixthPage}
                                    >
                                        Activity
                                    </li>
                                </div> */}
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
        shop: state.shop,
        customer: state.customer,
        clicked: state.click,
        src: state.src,
        click: state.clickProductImage,
        clickCust: state.clickCustomer,
        cust_company: state.cust_company,
        manu: state.manufacturer,
        clickManu: state.manuClick,
        status: state.status,
        stock: state.stock,
        quantity: state.quantity,
        karat: state.karat,
        colour: state.colour,
        size: state.size,
        desc: state.desc,
        cust_notes: state.cust_notes,
        scanned_copy: state.scanned_copy,
        order_id: state.order_id,
        orderPageOn: state.orderPageOn,
        staff_member_logged_in: state.staff_member_logged_in
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        Action: (payload, clicked, click) => dispatch(Action(payload, clicked, click)),
        ProductsAction: (src, click) => dispatch(ProductsAction(src, click)),
        ManuAction: (name, click) => dispatch(ManufacturersAction(name, click)),
        SpclOrderAction: (status, stock, quantity, karat, colour, size, desc, cust_notes, scanned_copy) => dispatch(SpclOrderAction(status, stock, quantity, karat, colour, size, desc, cust_notes, scanned_copy)),
        NewSpclOrderAction: (order_create) => dispatch(NewSpclOrderAction(order_create)),
        ErrorMsgAction: (stock_err, quantity_err, karat_err, colour_err, size_err, desc_err, customer_err, manufacturer_err) => dispatch(ErrorMsgAction(stock_err, quantity_err, karat_err, colour_err, size_err, desc_err, customer_err, manufacturer_err)),
        OrderPageOnAction: (orderPageOn) => (dispatch(OrderPageOnAction(orderPageOn))),
        CustomerCompanyAction: (cust_company) => dispatch(CustomerCompanyAction(cust_company))
    };
};

/*-------AddSpecialOrderPageLayout function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(AddSpecialOrderPageLayout);
