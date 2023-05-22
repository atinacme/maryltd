import React, { useState, useEffect, useCallback } from "react";
import { renderToString } from "react-dom/server";
import { useLocation } from "react-router-dom";
import { useNavigate } from "@shopify/app-bridge-react";
import { Card, Button, Icon, Checkbox } from "@shopify/polaris";
import { ChevronLeftMinor, ChevronRightMinor, ArrowUpMinor, ArrowDownMinor } from '@shopify/polaris-icons';
import { connect } from "react-redux";
import { EditNewTaskAction, NewTaskAction, NewTaskPageOnAction } from "../Redux";
import { NewTaskAllFilesService, NewTaskExceptCompleteGetService, NewTaskGetService, GetParticularCustomerCompanyService } from "../Services";
import { jsPDF } from "jspdf";
import { Modal } from "react-bootstrap";
import moment from 'moment';

/*------------This function contains functionality of export, reset filters, items per page and pagination----------*/
export const NewTaskHome = (props) => {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState();
    const [newTasks, setNewTasks] = useState([]);
    const [sort, setSort] = useState("order_type");
    const [sortOrder, setSortOrder] = useState("desc");
    const [searchField] = useState("");
    const [searchData] = useState("");
    const [allOrdersCheck, setAllOrdersCheck] = useState(true);
    const [viewModelId, setViewModelId] = useState();
    const [viewPopUp, setViewPopUp] = useState(false);
    const [viewFiles, setViewFiles] = useState([]);
    const handleForAllOrdersCheck = useCallback((newChecked) => { setAllOrdersCheck(newChecked), []; });
    const navigate = useNavigate();
    const location = useLocation();
    const handlePageChange = async () => {
        try {
            if (!allOrdersCheck) {
                const result = await NewTaskGetService(itemsPerPage, sort, sortOrder, searchField, searchData, currentPage);
                setData(result.data);
                setNewTasks(result.data.data);
            } else {
                const result = await NewTaskExceptCompleteGetService(itemsPerPage, sort, sortOrder, searchField, searchData, currentPage);
                setData(result.data);
                setNewTasks(result.data.data);
            }
        } catch { }
    };
    useEffect(() => {
        handlePageChange();
    }, [itemsPerPage, currentPage, location.key, allOrdersCheck]);
    const handleClose = () => { setViewPopUp(false); };
    const rowMarkup = newTasks && newTasks.map((newTask) => (
        <tr key={newTask.id}>
            <div className="dash-table" onClick={() => {
                props.EditNewTaskAction(newTask.id);
                props.NewTaskAction(
                    newTask.status,
                    newTask.company,
                    newTask.order_placed_by,
                    newTask.order_type,
                    newTask.shipping_method,
                    newTask.ship_date,
                    newTask.order_details,
                    newTask.internal_notes,
                    newTask.attachments,
                    props.new_task_attachments_array,
                    newTask.created_at
                );
                props.NewTaskPageOnAction("edit");
                navigate("/new_task/pagerouters");
            }}>
                <td>{newTask.id}</td>
                <td>{moment(newTask.created_at).format('MMM D, YYYY, h:mm:ss A')}</td>
                <td>{moment(newTask.ship_date).format('MMM D, YYYY')}</td>
                <td>{newTask.company}</td>
                <td>{newTask.order_type}</td>
                <td>{newTask.status}</td>
                <td>{newTask.attachments}</td>
                <td>{newTask.internal_notes}</td>
            </div>
            <td><a href="#" onClick={async () => {
                setViewModelId(newTask.id);
                try {
                    const data = { new_task_id: newTask.id };
                    const result = await NewTaskAllFilesService(data);
                    if (result) {
                        setViewFiles(result.data);
                        setViewPopUp(true);
                    }
                } catch { }
            }}>View</a>
                <Modal className="modal-attention" show={viewPopUp} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Task Id #{viewModelId} has {viewFiles.length} attachments</Modal.Title>
                    </Modal.Header>
                    <br /><br />
                    <Modal.Body>
                        {viewFiles.map((file) => {
                            return (
                                <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
                                    <h3>{file.filenames}</h3>
                                    <Button style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#eb5202", color: "#fff" }}
                                        onClick={() => {
                                            if (process.env.MIX_ENV === "local") {
                                                JSON.parse(file.filenames).split('.').pop() == "doc" || JSON.parse(file.filenames).split('.').pop() == "docx" ? window.open("https://docs.google.com/gview?url=" + window.location.origin + file.filepath + "&embedded=true") : window.open(window.location.origin + file.filepath);
                                            } else {
                                                JSON.parse(file.filenames).split('.').pop() == "doc" || JSON.parse(file.filenames).split('.').pop() == "docx" ? window.open("https://docs.google.com/gview?url=" + window.location.origin + '/public/storage/files/' + JSON.parse(file.filenames) + "&embedded=true") : window.open(window.location.origin + '/public/storage/files/' + JSON.parse(file.filenames));
                                            }
                                        }
                                        }>View</Button>
                                </div>
                            );
                        })}
                    </Modal.Body>
                </Modal>
            </td>
            <td><a href="#" onClick={async () => {
                try {
                    const data = { company: newTask.company };
                    const result = await GetParticularCustomerCompanyService(data);
                    const data1 = { new_task_id: newTask.id };
                    const result1 = await NewTaskAllFilesService(data1);
                    const doc = new jsPDF();
                    doc.html(
                        renderToString(
                            <div className="page">
                                <div style={{ margin: "40px" }}>
                                    <div>
                                        <h1>{newTask.company}</h1>
                                        <h2>New Task #{newTask.id}</h2>
                                    </div>
                                    <h1 style={{ fontSize: "20px" }}>COMPANY DETAILS:</h1>
                                    <div style={{ maxWidth: "430px", paddingLeft: "25px" }}>
                                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                            <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Phone Number:</p> <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>416-368-8240</p>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                            <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Fax Number:</p><p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>416-368-8057</p>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                            <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Customer Email:</p><p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>{result.data[0].email}</p>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                            <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Account Number:</p><p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>#4</p>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                            <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Shipping Address:</p><p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>55 Queen Street East #1210</p>
                                        </div>
                                    </div>
                                    <div style={{ padding: "40px 0" }}>
                                        <h1 style={{ fontSize: "20px" }}>ORDER DETAILS:</h1>
                                        <div style={{ maxWidth: "430px", paddingLeft: "25px" }}>
                                            <h4 style={{ marginTop: "0" }}>{newTask.order_details}</h4>
                                            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                                <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Order Date:</p>
                                                <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%", borderBottom: "1px solid #000" }}>{moment(newTask.created_at).format('MMM D, YYYY, h:mm:ss A')}</p>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                                <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Ship Date:</p>
                                                <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%", borderBottom: "1px solid #000" }}>{moment(newTask.ship_date).format('MMM D, YYYY')}</p>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", paddingBottom: "10px" }}>
                                                <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%" }}>Ship Method:</p>
                                                <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", width: "48%", borderBottom: "1px solid #000" }}>{newTask.shipping_method}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500" }}>Scheduled by:</p>
                                        <p style={{ margin: "0", letterSpacing: "1px", fontWeight: "500", paddingLeft: "10px" }}>{newTask.order_placed_by}</p>
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
            }}>Generate PDF</a></td>
        </tr>
    ));
    const handleSort = async (e) => {
        let show = sortOrder;
        let index = show.indexOf('asc');
        if (index != -1) {
            show = 'desc';
        } else {
            show = 'asc';
        }
        if (!allOrdersCheck) {
            const result = await NewTaskExceptCompleteGetService(itemsPerPage, e.target.attributes[0].value, show, searchField, searchData, currentPage);
            setData(result.data);
            setNewTasks(result.data.data);
        } else {
            const result = await NewTaskGetService(itemsPerPage, e.target.attributes[0].value, show, searchField, searchData, currentPage);
            setData(result.data);
            setNewTasks(result.data.data);
        }
        setSort(e.target.attributes[0].value);
        setSortOrder(show);
    };
    const arrowMove =
        <>
            {sortOrder === "asc" ?
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
    return (
        <div className="tab-wrapper">
            <Card>
                <div className="add_special_order spc-order_wrap">
                    <Button onClick={() => { props.NewTaskPageOnAction("add"); navigate("/new_task/pagerouters"); }}>Add New Task</Button>
                </div>
                <div className="soryby-wrap">
                    <Checkbox
                        checked={allOrdersCheck}
                        onChange={handleForAllOrdersCheck}
                    />Hide Completed Orders
                </div>
                <div className="shorting-wrap home-wrap manu-wrap-whole">
                    <p className="admin__control-support-text">
                        {data && data.total} records found
                    </p>
                    <div className="new_task_home sorting-right">
                        <div className="soryby-wrap">
                            <div className="cust-select select">
                                <select onChange={(e) => setItemsPerPage(e.target.value)} value={itemsPerPage} name="format" id="format">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                        </div>
                        <p>per page</p>
                        {data &&
                            <>
                                <div className={data.current_page === 1 ? "arrow-wrap disabled" : "arrow-wrap"} onClick={() => {
                                    setCurrentPage(currentPage - 1);
                                }}>
                                    <Icon
                                        source={ChevronLeftMinor}
                                        color="base"
                                    />
                                </div>
                                <div className="current-page-wrap">{data.current_page}</div> of {data.last_page}
                                <div className={data.current_page === data.last_page ? "disabled" : "arrow-wrap"} onClick={() => {
                                    setCurrentPage(currentPage + 1);
                                }}>
                                    <Icon
                                        source={ChevronRightMinor}
                                        color="base"
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Card>
            <div>
                <Card>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="id" data_sort="desc">Id</p>{arrowMove}</div></th>
                                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="created_at" data_sort="desc">Order Date</p>{arrowMove}</div></th>
                                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="ship_date" data_sort="desc">Ship Date</p>{arrowMove}</div></th>
                                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="company" data_sort="desc">Company Name</p>{arrowMove}</div></th>
                                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="order_type" data_sort="desc">Order Type</p>{arrowMove}</div></th>
                                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="status" data_sort="desc">Status</p>{arrowMove}</div></th>
                                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="attachments" data_sort="desc">Attachment</p>{arrowMove}</div></th>
                                <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="internal_notes" data_sort="desc">Note</p>{arrowMove}</div></th>
                                <th scope="col"><div className="sort-wrap"><p>Attachment</p></div></th>
                                <th scope="col"><div className="sort-wrap"><p>Generate</p></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowMarkup}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
};

/*-----------Redux states------------------*/
const mapStateToProps = (state) => ({
    new_task_attachments_array: state.new_task_attachments_array,
    new_task_created_at: state.new_task_created_at
});

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        NewTaskAction: (new_task_status, new_task_company, new_task_order_placed_by, new_task_order_type, new_task_shipping_method, new_task_ship_date, new_task_order_details, new_task_internal_notes, new_task_attachments, new_task_attachments_array, new_task_created_at) => dispatch(NewTaskAction(new_task_status, new_task_company, new_task_order_placed_by, new_task_order_type, new_task_shipping_method, new_task_ship_date, new_task_order_details, new_task_internal_notes, new_task_attachments, new_task_attachments_array, new_task_created_at)),
        EditNewTaskAction: (new_task_id) => (dispatch(EditNewTaskAction(new_task_id))),
        NewTaskPageOnAction: (newTaskPageOn) => (dispatch(NewTaskPageOnAction(newTaskPageOn)))
    };
};

/*-------NewTaskHome function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(NewTaskHome);