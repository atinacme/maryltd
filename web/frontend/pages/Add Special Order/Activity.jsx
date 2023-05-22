import React, { useState, useEffect } from "react";
import { Card, TextField, Icon } from "@shopify/polaris";
import { ChevronLeftMinor, ChevronRightMinor, ArrowUpMinor, ArrowDownMinor } from '@shopify/polaris-icons';
import { connect } from "react-redux";
import { UserOrderActivityGetService } from "../../components";

/*---------This function is made for the second tab form used in add manufacturer tabs------------*/
function Activity(props) {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [activity, setActivity] = useState([]);
    const [data, setData] = useState();
    const [user, setUser] = useState();
    const [action, setAction] = useState();
    const [time, setTime] = useState();
    const [sort, setSort] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");
    const [searchField, setSearchField] = useState("");
    const [searchData, setSearchData] = useState("");
    const handlePageChange = async () => {
        try {
            const result = await UserOrderActivityGetService(props.order_id, itemsPerPage, sort, sortOrder, searchField, searchData, currentPage);
            setData(result.data);
            setActivity(result.data.data);
        } catch { }
    };
    useEffect(() => {
        handlePageChange();
    }, [itemsPerPage, currentPage]);
    const handleSpclOrderUser = async (type, e) => {
        setUser(e);
        setAction();
        setTime();
        const result = await UserOrderActivityGetService(props.order_id, itemsPerPage, sort, sortOrder, type, e, currentPage);
        setData(result.data);
        setActivity(result.data.data);
        setSearchField(type);
        setSearchData(e);
    };
    const handleSpclOrderAction = async (type, e) => {
        setAction(e);
        setUser();
        setTime();
        const result = await UserOrderActivityGetService(props.order_id, itemsPerPage, sort, sortOrder, type, e, currentPage);
        setData(result.data);
        setActivity(result.data.data);
        setSearchField(type);
        setSearchData(e);
    };
    const handleSpclOrderTime = async (type, e) => {
        setTime(e);
        setAction();
        setUser();
        const result = await UserOrderActivityGetService(props.order_id, itemsPerPage, sort, sortOrder, type, e, currentPage);
        setData(result.data);
        setActivity(result.data.data);
        setSearchField(type);
        setSearchData(e);
    };
    const rowMarkup = activity && activity.map((activities) => (
        <tr key={activities.id}>
            <td>{activities.id}</td>
            <td>{activities.user}</td>
            <td>{activities.action}</td>
            <td>{activities.time}</td>
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
        const result = await UserOrderActivityGetService(props.order_id, itemsPerPage, e.target.attributes[0].value, show, searchField, searchData, currentPage);
        setData(result.data);
        setActivity(result.data.data);
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
        <div>
            <Card>
                <div className="shorting-wrap">
                    <p className="admin__control-support-text">
                        {data && data.total} records found
                    </p>
                    <div className="new_task_activity sorting-right">
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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="id" data_sort="desc">ID</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="user" data_sort="desc">User</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="action" data_sort="desc">Action</p>{arrowMove}</div></th>
                            <th scope="col"><div className="sort-wrap"><p onClick={handleSort} value="time" data_sort="desc">Time</p>{arrowMove}</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <TextField
                                    value={user}
                                    onChange={(e) => handleSpclOrderUser("user", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={action}
                                    onChange={(e) => handleSpclOrderAction("action", e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={time}
                                    onChange={(e) => handleSpclOrderTime("time", e)}
                                    autoComplete="off"
                                />
                            </td>
                        </tr>
                        {rowMarkup}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        order_id: state.order_id,
        attachments: state.attachments,
        attachments_notes: state.attachments_notes
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        // AttachmentsManuAction: (attachments, attachments_notes) => dispatch(AttachmentsManuAction(attachments, attachments_notes))
    };
};

/*-------Activity function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(Activity);
