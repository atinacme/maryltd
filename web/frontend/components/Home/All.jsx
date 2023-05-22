import React, { useState, useCallback, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { Card, TextField, Checkbox, Icon, } from "@shopify/polaris";
import { ArrowUpMinor, ArrowDownMinor } from '@shopify/polaris-icons';
import { jsPDF } from "jspdf";
import { connect } from "react-redux";
import { Action, AllPageAction, AllCheckedAction, EditOrderDataAction, ManufacturersAction, SpclOrderAction, OrderPageOnAction, EmailToSupplierAction, ProductsAction } from "../Redux";
import { AllPaginationService, EmailOrderService, UserOrderGetAllFilesService } from "../Services";
import { useNavigate } from "@shopify/app-bridge-react";
import { Modal, Button } from "react-bootstrap";

/*---------------This function is for the All tab of special orders page-------------*/
function All(props) {
    const [customers, setCustomers] = useState([]);
    const [checked, setChecked] = useState(false);
    const [search, setSearch] = useState({
        id: "",
        stock: "",
        quantity: "",
        karat: "",
        colour: "",
        size: "",
        customer: "",
        manufacturer: ""
    });
    const [manuData, setManuData] = useState({
        id: "",
        manufacturer: ""
    });
    const [emailSent, setEmailSent] = useState(false);
    const [allOrdersCheck, setAllOrdersCheck] = useState(false);
    const handleForAllOrdersCheck = useCallback((newChecked) => setAllOrdersCheck(newChecked), []);
    const [submitPopup, setSubmitPopup] = useState(false);
    const navigate = useNavigate();
    var todayDate = new Date().toISOString().slice(0, 10);
    useEffect(() => {
        const getAllOrders = () => {
            try {
                setCustomers(props.allData.data.map(v => Object.assign(v, { isChecked: false })));
            } catch (e) { }
        };
        getAllOrders();
    }, [props.allData]);
    const handleChangeCheckbox = useCallback((newChecked) => setChecked(newChecked), []);
    const handleCheckbox = (e) => {
        let newArr = [...customers];
        newArr[e]["isChecked"] = !newArr[e]["isChecked"];
        setCustomers(newArr);
        if (props.allData) {
            props.AllCheckedAction(props.allData.data.filter(v => v.isChecked === true));
        }
    };
    const handleSelectAll = () => {
        let newArr = [...customers];
        for (let i = 0; i < newArr.length; i++) {
            newArr[i]["isChecked"] = true;
        }
        setCustomers(newArr);
        if (props.allData) {
            props.AllCheckedAction(props.allData.data.filter(v => v.isChecked === true));
        }
    };
    const handleUnselectAll = () => {
        let newArr = [...customers];
        for (let i = 0; i < newArr.length; i++) {
            newArr[i]["isChecked"] = false;
        }
        setCustomers(newArr);
        if (props.allData) {
            props.AllCheckedAction(props.allData.data.filter(v => v.isChecked === true));
        }
    };
    const handleChangeId = async (type, e) => {
        setSearch({
            id: e,
            stock: "",
            quantity: "",
            karat: "",
            colour: "",
            size: "",
            customer: "",
            manufacturer: ""
        });
        const result = await AllPaginationService(props.item, props.sort, props.sortOrder, type, e, props.currentPage);
        props.AllPageAction(result.data, props.sort, props.sortOrder, type, e, props.currentPage, props.item);
    };
    const handleChangeStock = async (type, e) => {
        setSearch({
            id: "",
            stock: e,
            quantity: "",
            karat: "",
            colour: "",
            size: "",
            customer: "",
            manufacturer: ""
        });
        const result = await AllPaginationService(props.item, props.sort, props.sortOrder, type, e, props.currentPage);
        props.AllPageAction(result.data, props.sort, props.sortOrder, type, e, props.currentPage, props.item);
    };
    const handleChangeQuantity = async (type, e) => {
        setSearch({
            id: "",
            stock: "",
            quantity: e,
            karat: "",
            colour: "",
            size: "",
            customer: "",
            manufacturer: ""
        });
        const result = await AllPaginationService(props.item, props.sort, props.sortOrder, type, e, props.currentPage);
        props.AllPageAction(result.data, props.sort, props.sortOrder, type, e, props.currentPage, props.item);
    };
    const handleChangeKarat = async (type, e) => {
        setSearch({
            id: "",
            stock: "",
            quantity: "",
            karat: e,
            colour: "",
            size: "",
            customer: "",
            manufacturer: ""
        });
        const result = await AllPaginationService(props.item, props.sort, props.sortOrder, type, e, props.currentPage);
        props.AllPageAction(result.data, props.sort, props.sortOrder, type, e, props.currentPage, props.item);
    };
    const handleChangeColour = async (type, e) => {
        setSearch({
            id: "",
            stock: "",
            quantity: "",
            karat: "",
            colour: e,
            size: "",
            customer: "",
            manufacturer: ""
        });
        const result = await AllPaginationService(props.item, props.sort, props.sortOrder, type, e, props.currentPage);
        props.AllPageAction(result.data, props.sort, props.sortOrder, type, e, props.currentPage, props.item);
    };
    const handleChangeSize = async (type, e) => {
        setSearch({
            id: "",
            stock: "",
            quantity: "",
            karat: "",
            colour: "",
            size: e,
            customer: "",
            manufacturer: ""
        });
        const result = await AllPaginationService(props.item, props.sort, props.sortOrder, type, e, props.currentPage);
        props.AllPageAction(result.data, props.sort, props.sortOrder, type, e, props.currentPage, props.item);
    };
    const handleChangeCustomer = async (type, e) => {
        setSearch({
            id: "",
            stock: "",
            quantity: "",
            karat: "",
            colour: "",
            size: "",
            customer: e,
            manufacturer: ""
        });
        const result = await AllPaginationService(props.item, props.sort, props.sortOrder, type, e, props.currentPage);
        props.AllPageAction(result.data, props.sort, props.sortOrder, type, e, props.currentPage, props.item);
    };
    const handleChangeManufacturer = async (type, e) => {
        setSearch({
            id: "",
            stock: "",
            quantity: "",
            karat: "",
            colour: "",
            size: "",
            customer: "",
            manufacturer: e
        });
        const result = await AllPaginationService(props.item, props.sort, props.sortOrder, type, e, props.currentPage);
        props.AllPageAction(result.data, props.sort, props.sortOrder, type, e, props.currentPage, props.item);
    };
    const rowMarkup = customers && customers.map((customer, index) => (
        <tr className="table-orders" key={customer.id}>
            <td scope="row">
                <input type="checkbox" checked={customer.isChecked} onChange={() => handleCheckbox(index)} />
            </td>
            <div className="dash-table" onClick={() => {
                props.Action(customer.customer, props.clicked, props.clickCust);
                props.EditOrderDataAction(customer.id);
                props.SpclOrderAction(customer.status, customer.stock_number, customer.quantity, customer.karat, customer.colour, customer.size, customer.description, customer.notes, props.scanned_copy);
                props.ManuAction(customer.manufacturer, props.clickManu);
                props.OrderPageOnAction("edit");
                props.ProductsAction(customer.product_image, props.clicked);
                navigate("/special_order/pagerouters");
            }}>
                <td>{customer.id}</td>
                <td>{customer.stock_number}</td>
                <td>{customer.quantity}</td>
                <td>{customer.karat}</td>
                <td>{customer.colour}</td>
                <td>{customer.size}</td>
                <td>{customer.customer}</td>
                <td>{customer.manufacturer}</td>
                <td>
                    <span
                        className={
                            customer.status === "completed" ? "order_status_all complete" :
                                customer.status === "not_sent" ? "order_status_all not_sent" :
                                    customer.status === "cancelled" ? "order_status_all cancelled" :
                                        customer.status === "partially_arrived" ? "order_status_all partially_arrived" :
                                            customer.status === "on_hold" ? "order_status_all on_hold" :
                                                "order_status_all sent_to_supplier"
                        }
                    >
                        {customer.status === "completed" ? "COMPLETED" :
                            customer.status === "not_sent" ? "NOT SENT" :
                                customer.status === "cancelled" ? "CANCELLED" :
                                    customer.status === "partially_arrived" ? "PARTIALLY ARRIVED" :
                                        customer.status === "on_hold" ? "ON HOLD" :
                                            "SENT TO SUPPLIER"}
                    </span>
                </td>
            </div>
            <td><a href="#" onClick={() => handleEmailBox(customer.id, customer.manufacturer)}>Send Email</a></td>
            <td className="generate_pdf">
                <a href="#" onClick={async () => {
                    var result;
                    try {
                        const data = {
                            user_order_data_id: customer.id
                        };
                        result = await UserOrderGetAllFilesService(data);
                    } catch { }
                    const doc = new jsPDF();
                    doc.html(
                        renderToString(<div className="page">
                            <div className="demo">
                                <div className="font-container" style={{ fontFamily: 'Times New Roman', fontWeight: "normal", fontStyle: "normal" }}>
                                    <div className="box">
                                        <div className="box-head dflex align-center space-between p5"><h1 className="title bold">{customer.customer} {customer.customer_company}</h1><div className="some-no bold">PO #3</div></div>
                                        <div className="box-content dflex space-between">
                                            <div className="left-clmn">
                                                <h3>Stock #:</h3><span>{customer.stock_number}</span>
                                                <h3>Quantity:</h3><span>{customer.quantity}</span>
                                                <h3>Karat:</h3><span>{customer.karat}</span>
                                                <h3>Colour:</h3><span>{customer.colour}</span>
                                                <h3>Size:</h3><span>{customer.size}</span>
                                            </div>
                                            <div className="right-clmn text-center">
                                                <h2>Customer Agreement</h2>
                                                <p className="justify">This  Special Order  cannot  be  cancelled  or  altered  in  any  form. Once  this  Special Order Form is confirmed  and  signed,  you  must  purchase the item(s) listed  and  understand  that  the transaction is NON-REFUNDABLE. Mary Jewellery and Lapidary Co. Ltd. will do its best to receive the item(s) in sufficient  time.  Production  delays  are  the  responsibly  of  the  purchaser  and  Mary Jewellery  and Lapidary Co. Ltd. will  not  be  held  responsible  for  any  production delays or cancellations from the manufacturer.</p>
                                                <div className="sign-wrap dflex align-bottom"><div className="sign-label">Customer Signature: </div><div className="sign-placeholder"></div></div>
                                            </div>
                                        </div>
                                        <div className="box-footer dflex space-between">
                                            <div> <h5>Description:</h5>
                                                <p>{customer.description}</p>
                                            </div>
                                            <div className="box-footer_img">
                                                <img src={customer.image_attachment} alt="" width="150" height="150" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="endline text-center">{todayDate} {customer.customer}, {customer.customer_company}</div>
                                </div>
                            </div>
                            <hr />
                            <div className="demo">
                                <div className="font-container" style={{ fontFamily: 'Times New Roman', fontWeight: "normal", fontStyle: "normal" }}>
                                    <div className="box">
                                        <div className="box-head dflex align-center space-between p5"><h1 className="title bold">Mary Jewellery Special Order</h1><div className="some-no bold">PO #3</div></div>
                                        <div className="box-content dflex space-between">
                                            <div className="left-clmn">
                                                <h3>Stock #:</h3><span>{customer.stock_number}</span>
                                                <h3>Quantity:</h3><span>{customer.quantity}</span>
                                                <h3>Karat:</h3><span>{customer.karat}</span>
                                                <h3>Colour:</h3><span>{customer.colour}</span>
                                                <h3>Size:</h3><span>{customer.size}</span>
                                            </div>
                                            <div className="right-clmn text-center">
                                                <h2>Customer Agreement</h2>
                                                <p className="justify">This  Special Order  cannot  be  cancelled  or  altered  in  any  form. Once  this  Special Order Form is confirmed  and  signed,  you  must  purchase the item(s) listed  and  understand  that  the transaction is NON-REFUNDABLE. Mary Jewellery and Lapidary Co. Ltd. will do its best to receive the item(s) in sufficient  time.  Production  delays  are  the  responsibly  of  the  purchaser  and  Mary Jewellery  and Lapidary Co. Ltd. will  not  be  held  responsible  for  any  production delays or cancellations from the manufacturer.</p>
                                                <div className="sign-wrap dflex align-bottom"><div className="sign-label">Customer Signature: </div><div className="sign-placeholder"></div></div>
                                            </div>
                                        </div>
                                        <div className="box-footer dflex space-between">
                                            <div> <h5>Description:</h5>
                                                <p>{customer.description}</p>
                                            </div>
                                            <div className="box-footer_img">
                                                {result.data.length > 0 &&
                                                    (result.data.map(file => {
                                                        return JSON.parse(file.filenames).split('.').pop();
                                                    })).indexOf("png" || "jpg" || "jpeg") > -1 ?
                                                    <>
                                                        {result.data.map((file) => {
                                                            return (
                                                                <>
                                                                    {process.env.MIX_ENV === "local" ?
                                                                        <img src={window.location.origin + file.filepath} />
                                                                        :
                                                                        <img src={window.location.origin + '/public/storage/files/' + file.filenames} />
                                                                    }
                                                                </>
                                                            );
                                                        })
                                                        }
                                                    </>
                                                    :
                                                    <img src={customer.product_image} alt="" width="150" height="150" />
                                                }
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
                }}>Generate PDF</a>
            </td>
        </tr >
    ));
    const handleSort = (e) => {
        let show = props.sortOrder;
        let index = show.indexOf('asc');
        if (index != -1) {
            show = 'desc';
        } else {
            show = 'asc';
        }
        props.AllPageAction(props.allData, e.target.attributes[0].value, show, props.searchOn, props.search, props.currentPage, props.item);
    };
    const arrowMove =
        <>
            {props.sortOrder === "asc" ?
                <Icon
                    source={ArrowUpMinor}
                    color="base"
                />
                :
                <Icon
                    source={ArrowDownMinor}
                    color="base"
                />
            }
        </>;
    const handleEmailBox = (id, manu) => {
        setSubmitPopup(true);
        setManuData({
            id: id,
            manu: manu
        });
    };
    const handleSendEmail = async () => {
        setEmailSent(true);
        try {
            if (allOrdersCheck) {
                const data = { manufacturer_name: manuData.manu };
                const result = await EmailOrderService(data);
                if (result) {
                    setSubmitPopup(false);
                    setAllOrdersCheck(false);
                    setEmailSent(false);
                    props.EmailToSupplierAction(true);
                }
            } else {
                const data = { id: manuData.id };
                const result = await EmailOrderService(data);
                if (result) {
                    setSubmitPopup(false);
                    setEmailSent(false);
                    props.EmailToSupplierAction(true);
                }
            }
        } catch (e) { }
    };
    const handleClose = () => setSubmitPopup(false);
    return (
        <div className="homesecwrap">
            <Card>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="input-group">
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChangeCheckbox}
                                    />
                                    <button
                                        className="btn btn-outline-secondary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    ></button>
                                    <ul className="mass-actions dropdown-menu dropdown-menu-end">
                                        <p>Mass Actions</p>
                                        <li onClick={handleSelectAll}>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Select All
                                            </a>
                                        </li>
                                        <li onClick={handleUnselectAll}>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Unselect All
                                            </a>
                                        </li>
                                        <li onClick={handleSelectAll}>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Select Visible
                                            </a>
                                        </li>
                                        <li onClick={handleUnselectAll}>
                                            <a
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Unselect Visible
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="id" data_sort="asc">Id</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="stock_number" data_sort="asc">Stock #</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="quantity" data_sort="asc">Quantity</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="karat" data_sort="asc">Karat</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="colour" data_sort="asc">Colour</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="size" data_sort="asc">Size</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="customer" data_sort="asc">Customer</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="manufacturer" data_sort="asc">Manufacturer</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="status" data_sort="asc">Order Status</p>{arrowMove}</div></th>
                            <th scope="col">Send To Supplier</th>
                            <th scope="col">Generate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row">
                                <div className="cust-select select">
                                    <select name="format" id="format">
                                        <option value="any">Any</option>
                                        <option value="yes">yes</option>
                                        <option value="no">no</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <TextField
                                    value={search.id}
                                    onChange={(e) => handleChangeId("id", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={search.stock}
                                    onChange={(e) => handleChangeStock("stock_number", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={search.quantity}
                                    onChange={(e) => handleChangeQuantity("quantity", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={search.karat}
                                    onChange={(e) => handleChangeKarat("karat", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={search.colour}
                                    onChange={(e) => handleChangeColour("colour", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={search.size}
                                    onChange={(e) => handleChangeSize("size", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={search.customer}
                                    onChange={(e) => handleChangeCustomer("customer", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={search.manufacturer}
                                    onChange={(e) => handleChangeManufacturer("manufacturer", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {rowMarkup}
                    </tbody>
                </table>
            </Card>
            <Modal className="modal-attention" show={submitPopup} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Email Box</Modal.Title>
                </Modal.Header>
                <br /><br />
                <Modal.Body>
                    <div style={{ display: "flex" }}>
                        <Checkbox
                            checked={allOrdersCheck}
                            onChange={handleForAllOrdersCheck}
                        />
                        &nbsp;<p>Do you want to send Email for all the orders related to the supplier {manuData.manu} ?</p>
                    </div>
                    <br /><br />
                    {emailSent ? <p>Email is on the way....</p> : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSendEmail}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        customer: state.customer,
        src: state.src,
        clicked: state.click,
        clickCust: state.clickCustomer,
        allData: state.allPageData,
        sort: state.sort,
        sortOrder: state.sortOrder,
        check: state.allPageChecked,
        searchOn: state.searchField,
        search: state.searchData,
        currentPage: state.currentPage,
        item: state.itemsPerPage,
        manu: state.manufacturer,
        clickManu: state.manuClick,
        email_to_supplier: state.email_to_supplier,
        scanned_copy: state.scanned_copy
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        Action: (payload, clicked, customers) => dispatch(Action(payload, clicked, customers)),
        AllPageAction: (data, sort, order, searchOn, search, page, item) => dispatch(AllPageAction(data, sort, order, searchOn, search, page, item)),
        AllCheckedAction: (checked) => dispatch(AllCheckedAction(checked)),
        ManuAction: (name, click) => dispatch(ManufacturersAction(name, click)),
        SpclOrderAction: (status, stock, quantity, karat, colour, size, desc, cust_notes, scanned_copy) => dispatch(SpclOrderAction(status, stock, quantity, karat, colour, size, desc, cust_notes, scanned_copy)),
        EditOrderDataAction: (order_id) => dispatch(EditOrderDataAction(order_id)),
        OrderPageOnAction: (orderPageOn) => (dispatch(OrderPageOnAction(orderPageOn))),
        EmailToSupplierAction: (email_to_supplier) => (dispatch(EmailToSupplierAction(email_to_supplier))),
        ProductsAction: (src, click) => dispatch(ProductsAction(src, click))
    };
};

/*-------All function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(All);