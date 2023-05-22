import React, { useEffect, useState } from "react";
import { SpclOrderAction } from "../../components/Redux/Actions/SpclOrderAction";
import { connect } from "react-redux";
import { UserOrderGetAllFilesService } from "../../components/Services/Order Services/UserOrderGetAllFilesService";

/*--------------This function is for scanned copy tab in add special order page-------------*/
function ScannedCopy(props) {

    const [viewFiles, setViewFiles] = useState([]);
    useEffect(() => {
        const handleScannedCopy = async () => {
            try {
                const data = {
                    user_order_data_id: props.order_id
                };
                const result = await UserOrderGetAllFilesService(data);
                if (result) {
                    setViewFiles(result.data);
                }
            } catch { }
        };
        handleScannedCopy();
    }, []);
    return (
        <div>
            <h2 className="main-heading">Scanned Copy</h2>
            <div className="text-field-class scanned-copy">
                <div className="txtwrap">
                    <p>New Scanned Copy</p>
                    <input type="file" multiple
                        onChange={(e) => props.SpclOrderAction(props.status, props.stock, props.quantity, props.karat, props.colour, props.size, props.desc, props.cust_notes, Array.from(e.target.files))}
                    />
                </div>
                {props.scanned_copy.length === 0 ?
                    viewFiles.map((file) => {
                        return (
                            <div className="scanned-iframe">
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
        </div>
    );
}

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        src: state.src,
        clicked: state.click,
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
        orderPageOn: state.orderPageOn
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        ProductsAction: (src, click) => dispatch(ProductsAction(src, click)),
        SpclOrderAction: (status, stock, quantity, karat, colour, size, desc, cust_notes, scanned_copy) => dispatch(SpclOrderAction(status, stock, quantity, karat, colour, size, desc, cust_notes, scanned_copy))
    };
};

/*-------ScannedCopy function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(ScannedCopy);
