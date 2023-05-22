import React, { useState } from "react";
import { AttachmentsManuAction } from "../Redux";
import { connect } from "react-redux";

/*---------This function is made for the second tab form used in add manufacturer tabs------------*/
function Attachments(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(
            pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
        );
    return (
        <div>
            <h2 className="main-heading">Attachments</h2>
            <div className="text-field-class scanned-copy all-attachments">
                <div className="new-attachments">
                    <p>New Attachment</p>
                    <input type="file" multiple="multiple" onChange={(e) => { props.AttachmentsManuAction(e.target.files, props.attachments_notes) }} />
                </div>
                {Array.from(props.attachments).map((file) =>
                    <div>
                        {/* {file.name.split('.').pop() === "jpg" || file.name.split('.').pop() === "jpeg" || file.name.split('.').pop() === "png" ?
                            <img src={URL.createObjectURL(file)} />
                            : file.name.split('.').pop() === "pdf" ?
                                <Document
                                    file={URL.createObjectURL(file)}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <Page pageNumber={pageNumber} />
                                </Document>
                                : */}
                        <iframe src={URL.createObjectURL(file)}></iframe>
                        {/* } */}
                    </div>
                )}
                <div className="attachments-notes">
                    <label>Note</label>
                    <input
                        value={props.attachments_notes}
                        onChange={(e) => props.AttachmentsManuAction(props.attachments, e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        attachments: state.attachments,
        attachments_notes: state.attachments_notes
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        AttachmentsManuAction: (attachments, attachments_notes) => dispatch(AttachmentsManuAction(attachments, attachments_notes))
    };
};

/*-------Attachments function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(Attachments);
