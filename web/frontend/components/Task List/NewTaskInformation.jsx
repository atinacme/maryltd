import React, { useState, useEffect } from "react";
import { FormLayout } from "@shopify/polaris";
import { connect } from "react-redux";
import { NewTaskAction } from "../Redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { CustomerDetailPaginationService } from "../Services/Pagination Services/CustomerDetailPaginationService";
import { NewTaskAllFilesService } from "../Services";

/*------------This function has all the first tab form fields of add new task----------*/
function NewTaskInformation(props) {
    const errorMsg = "This is a required field.";
    const [company, setCompany] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [viewFiles, setViewFiles] = useState([]);
    useEffect(() => {
        const getCompany = async () => {
            const result = await CustomerDetailPaginationService("", "", "", "", "", "");
            setCompany(result.data.data);
        };
        const attachments = async () => {
            try {
                const data = { new_task_id: props.new_task_id };
                const result = await NewTaskAllFilesService(data);
                if (result) {
                    setViewFiles(result.data);
                }
            } catch { }
        };
        getCompany();
        attachments();
    }, []);
    return (
        <div>
            <h2 className="main-heading">New Task</h2>
            <div className="spcl_order">
                <FormLayout>
                    <div className="mandatory-star-wrap mandatory-star-new-task">
                        <label>Status</label>
                        <div className="status-actions">
                            <div className="shorting-left">
                                <div className="select_drop">
                                    <div className="">
                                        <select value={props.new_task_status} name="format" id="format"
                                            onChange={(e) => props.NewTaskAction(
                                                e.target.value,
                                                props.new_task_company,
                                                props.new_task_order_placed_by,
                                                props.new_task_order_type,
                                                props.new_task_shipping_method,
                                                props.new_task_ship_date,
                                                props.new_task_order_details,
                                                props.new_task_internal_notes,
                                                props.new_task_attachments,
                                                props.new_task_attachments_array,
                                                props.new_task_created_at
                                            )}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Complete">Complete</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mandatory-star-wrap mandatory-star-new-task mandatory-star">
                        <label>Company</label>
                        <div className="status-actions">
                            <div className="shorting-left">
                                <div className="select_drop">
                                    <div className="">
                                        <select value={props.new_task_company} name="format" id="format"
                                            index="0"
                                            className="new_task_required_cls"
                                            onChange={(e) => props.NewTaskAction(
                                                props.new_task_status,
                                                e.target.value,
                                                props.new_task_order_placed_by,
                                                props.new_task_order_type,
                                                props.new_task_shipping_method,
                                                props.new_task_ship_date,
                                                props.new_task_order_details,
                                                props.new_task_internal_notes,
                                                props.new_task_attachments,
                                                props.new_task_attachments_array,
                                                props.new_task_created_at
                                            )}
                                        >
                                            <option value="">Select Company</option>
                                            {company.map((com,index) => {
                                                return (<option key={"company_"+index} value={com.company}>{com.company}</option>);
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {props.new_task_company_err && <div className="new_task_error">{errorMsg}</div>}
                        </div>
                    </div>
                    <div className="mandatory-star-wrap mandatory-star-new-task mandatory-star">
                        <label>Order Placed By</label>
                        <div>
                            <input
                                index="1"
                                className="new_task_required_cls"
                                value={props.new_task_order_placed_by}
                                onChange={(e) => props.NewTaskAction(
                                    props.new_task_status,
                                    props.new_task_company,
                                    e.target.value,
                                    props.new_task_order_type,
                                    props.new_task_shipping_method,
                                    props.new_task_ship_date,
                                    props.new_task_order_details,
                                    props.new_task_internal_notes,
                                    props.new_task_attachments,
                                    props.new_task_attachments_array,
                                    props.new_task_created_at
                                )}
                            />
                            {props.new_task_order_placed_by_err && <div className="new_task_error">{errorMsg}</div>}
                        </div>
                    </div>
                    <div className="mandatory-star-wrap mandatory-star-new-task">
                        <label>Order Type</label>
                        <div className="status-actions">
                            <div className="shorting-left">
                                <div className="select_drop">
                                    <div className="">
                                        <select value={props.new_task_order_type} name="format" id="format"
                                            onChange={(e) => props.NewTaskAction(
                                                props.new_task_status,
                                                props.new_task_company,
                                                props.new_task_order_placed_by,
                                                e.target.value,
                                                props.new_task_shipping_method,
                                                props.new_task_ship_date,
                                                props.new_task_order_details,
                                                props.new_task_internal_notes,
                                                props.new_task_attachments,
                                                props.new_task_attachments_array,
                                                props.new_task_created_at
                                            )}
                                        >
                                            <option value="North">North</option>
                                            <option value="Ship">Ship</option>
                                            <option value="Deliver">Deliver</option>
                                            <option value="Pick Up">Pick Up</option>
                                            <option value="Hold">Hold</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mandatory-star-wrap mandatory-star-new-task">
                        <label>Shipping Method</label>
                        <input
                            className="required_cls"
                            value={props.new_task_shipping_method}
                            onChange={(e) => props.NewTaskAction(
                                props.new_task_status,
                                props.new_task_company,
                                props.new_task_order_placed_by,
                                props.new_task_order_type,
                                e.target.value,
                                props.new_task_ship_date,
                                props.new_task_order_details,
                                props.new_task_internal_notes,
                                props.new_task_attachments,
                                props.new_task_attachments_array,
                                props.new_task_created_at
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap ship_date mandatory-star-new-task">
                        <label>Ship Date</label>
                        <DatePicker
                            value={props.new_task_ship_date === "" ? startDate : new Date(props.new_task_ship_date).toLocaleDateString('en-US')}
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                                props.NewTaskAction(
                                    props.new_task_status,
                                    props.new_task_company,
                                    props.new_task_order_placed_by,
                                    props.new_task_order_type,
                                    props.new_task_shipping_method,
                                    date,
                                    props.new_task_order_details,
                                    props.new_task_internal_notes,
                                    props.new_task_attachments,
                                    props.new_task_attachments_array,
                                    props.new_task_created_at
                                );
                            }}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            minDate={moment().toDate()}
                        />
                    </div>
                    <div className="mandatory-star-wrap mandatory-star-new-task mandatory-star">
                        <label>Order Details</label>
                        <div>
                            <textarea rows="5"
                                index="2"
                                className="new_task_required_cls"
                                value={props.new_task_order_details}
                                onChange={(e) => props.NewTaskAction(
                                    props.new_task_status,
                                    props.new_task_company,
                                    props.new_task_order_placed_by,
                                    props.new_task_order_type,
                                    props.new_task_shipping_method,
                                    props.new_task_ship_date,
                                    e.target.value,
                                    props.new_task_internal_notes,
                                    props.new_task_attachments,
                                    props.new_task_attachments_array,
                                    props.new_task_created_at
                                )}
                            />
                            {props.new_task_order_details_err && <div className="new_task_error">{errorMsg}</div>}
                        </div>
                    </div>
                    <div className="mandatory-star-wrap mandatory-star-new-task">
                        <label>Internal Notes</label>
                        <textarea rows="5"
                            value={props.new_task_internal_notes}
                            onChange={(e) => props.NewTaskAction(
                                props.new_task_status,
                                props.new_task_company,
                                props.new_task_order_placed_by,
                                props.new_task_order_type,
                                props.new_task_shipping_method,
                                props.new_task_ship_date,
                                props.new_task_order_details,
                                e.target.value,
                                props.new_task_attachments,
                                props.new_task_attachments_array,
                                props.new_task_created_at
                            )}
                        />
                    </div>
                    <div className="mandatory-star-wrap mandatory-star-new-task">
                        <label>Attachments</label>
                        <input type="file" multiple
                            onChange={(e) => props.NewTaskAction(
                                props.new_task_status,
                                props.new_task_company,
                                props.new_task_order_placed_by,
                                props.new_task_order_type,
                                props.new_task_shipping_method,
                                props.new_task_ship_date,
                                props.new_task_order_details,
                                props.new_task_internal_notes,
                                props.new_task_attachments,
                                Array.from(e.target.files),
                                props.new_task_created_at
                            )}
                        />
                        {props.new_task_attachments_array !=undefined && props.new_task_attachments_array.length === 0 ?
                            viewFiles.map((file,index) => {
                                return (
                                    <div key={'task_attach_'+index}>
                                        {process.env.MIX_ENV === "local" ?
                                            <iframe src={JSON.parse(file.filenames).split('.').pop() == "doc" || JSON.parse(file.filenames).split('.').pop() == "docx" || JSON.parse(file.filenames).split('.').pop() == "xlsx" || JSON.parse(file.filenames).split('.').pop() == "xls" || JSON.parse(file.filenames).split('.').pop() == "xml" ? "https://docs.google.com/gview?url=" + window.location.origin + file.filepath + "&embedded=true" : window.location.origin + file.filepath}></iframe>
                                            :
                                            <iframe src={JSON.parse(file.filenames).split('.').pop() == "doc" || JSON.parse(file.filenames).split('.').pop() == "docx" || JSON.parse(file.filenames).split('.').pop() == "xlsx" || JSON.parse(file.filenames).split('.').pop() == "xls" || JSON.parse(file.filenames).split('.').pop() == "xml" ? "https://docs.google.com/gview?url=" + window.location.origin + '/public/storage/files/' + JSON.parse(file.filenames) + "&embedded=true" : window.location.origin + '/public/storage/files/' + JSON.parse(file.filenames)}></iframe>
                                        }
                                    </div>
                                );
                            })
                            : null}
                    </div>
                </FormLayout>
            </div>
        </div>
    );
}

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
        new_task_id: state.new_task_id
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        NewTaskAction: (new_task_status, new_task_company, new_task_order_placed_by, new_task_order_type, new_task_shipping_method, new_task_ship_date, new_task_order_details, new_task_internal_notes, new_task_attachments, new_task_attachments_array, new_task_created_at) => dispatch(NewTaskAction(new_task_status, new_task_company, new_task_order_placed_by, new_task_order_type, new_task_shipping_method, new_task_ship_date, new_task_order_details, new_task_internal_notes, new_task_attachments, new_task_attachments_array, new_task_created_at))
    };
};

/*-------NewTaskInformation function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(NewTaskInformation);
