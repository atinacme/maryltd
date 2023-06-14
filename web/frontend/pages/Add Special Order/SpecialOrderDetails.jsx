import React, { useState, useEffect } from "react";
import { FormLayout, Icon } from "@shopify/polaris";
import { CancelSmallMinor } from '@shopify/polaris-icons';
import { connect } from "react-redux";
import { useNavigate } from "@shopify/app-bridge-react";
import { Action, ProductsAction, ManufacturersAction, SpclOrderAction } from "../../components";

/*------------This function has all the first tab form fields of add special order----------*/
function SpecialOrderDetails(props) {
    const errorMsg = "This is a required field.";
    const [shopOwner, setShopOwner] = useState();
    var todayDate = new Date().toISOString().slice(0, 10);
    const navigate = useNavigate();
    // useEffect(() => {
    //     let shop = document.querySelector("#shop_id").value;
    //     let options = {
    //         method: "POST",
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Content-Type": "application/json;charset=utf-8",
    //         },
    //         body: JSON.stringify({ name: JSON.parse(shop).name }),
    //     };
    //     const url = window.location.origin + "/api/getShopData";
    //     let fetchRes = fetch(url, options);
    //     fetchRes.then((res) => res.json()).then((d) => { setShopOwner(d.data.shop.shop_owner); });
    // }, []);

    const handleMouseEnter = (value,event)=>{
        if(value == "enter"){
        event.target.style.borderBottom = "1.5px solid #000";
        } else{
            event.target.style.borderBottom = "none";
        }
            }

    return (
        <div>
            <h2 className="main-heading">Special Order</h2>
            <div className="spcl_order">
                <FormLayout>
                    <div className="mandatory-star-wrap status-actions">
                        <p>Status</p>
                        <div className="shorting-left">
                            <div className="select_drop">
                                <div className="cust-select select">
                                    {props.orderPageOn === "edit" ?
                                        <select name="format" id="format" className="edit-cust-select"
                                            value={props.status}
                                            onChange={(e) => props.SpclOrderAction(e.target.value, props.stock, props.quantity, props.karat, props.colour, props.size, props.desc, props.cust_notes, props.scanned_copy)}
                                        >
                                            <option value="not_sent">Not sent</option>
                                            <option value="sent_to_supplier">Sent to supplier</option>
                                            <option value="on_hold">On hold</option>
                                            <option value="partially_arrived">Partially arrived</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                        :
                                        <select disabled="disabled" name="format" id="format">
                                            <option value="not_sent">Not Sent</option>
                                        </select>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mandatory-star-wrap mandatory-star">
                        <label>Stock Number</label>
                        <input
                            index="0"
                            className="required_cls"
                            value={props.stock}
                            onChange={(e) => props.SpclOrderAction(props.status, e.target.value, props.quantity, props.karat, props.colour, props.size, props.desc, props.cust_notes, props.scanned_copy)}
                        />
                        {props.stock_err && (<div>{errorMsg}</div>)}
                    </div>
                    <div className="mandatory-star-wrap mandatory-star">
                        <label>Quantity</label>
                        <input
                            index="1"
                            className="required_cls"
                            value={props.quantity}
                            onChange={(e) => props.SpclOrderAction(props.status, props.stock, e.target.value, props.karat, props.colour, props.size, props.desc, props.cust_notes, props.scanned_copy)}
                        />
                        {props.quantity_err && (<div>{errorMsg}</div>)}
                    </div>
                    <div className="mandatory-star-wrap mandatory-star">
                        <label>Karat</label>
                        <input
                            index="2"
                            className="required_cls"
                            value={props.karat}
                            onChange={(e) => props.SpclOrderAction(props.status, props.stock, props.quantity, e.target.value, props.colour, props.size, props.desc, props.cust_notes, props.scanned_copy)}
                        />
                        {props.karat_err && (<div>{errorMsg}</div>)}
                    </div>
                    <div className="mandatory-star-wrap mandatory-star">
                        <label>Colour</label>
                        <input
                            index="3"
                            className="required_cls"
                            value={props.colour}
                            onChange={(e) => props.SpclOrderAction(props.status, props.stock, props.quantity, props.karat, e.target.value, props.size, props.desc, props.cust_notes, props.scanned_copy)}
                        />
                        {props.colour_err && (<div>{errorMsg}</div>)}
                    </div>
                    <div className="mandatory-star-wrap mandatory-star">
                        <label>Size</label>
                        <input
                            index="4"
                            className="required_cls"
                            value={props.size}
                            onChange={(e) => props.SpclOrderAction(props.status, props.stock, props.quantity, props.karat, props.colour, e.target.value, props.desc, props.cust_notes, props.scanned_copy)}
                        />
                        {props.size_err && (<div>{errorMsg}</div>)}
                    </div>
                    <div className="mandatory-star-wrap mandatory-star">
                        <label>Description</label>
                        <textarea rows="5"
                            index="5"
                            className="required_cls"
                            value={props.desc}
                            onChange={(e) => props.SpclOrderAction(props.status, props.stock, props.quantity, props.karat, props.colour, props.size, e.target.value, props.cust_notes, props.scanned_copy)}
                        />
                        {props.desc_err && (<div>{errorMsg}</div>)}
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Notes</label>
                        <textarea rows="5"
                            value={props.cust_notes}
                            onChange={(e) => props.SpclOrderAction(props.status, props.stock, props.quantity, props.karat, props.colour, props.size, props.desc, e.target.value, props.scanned_copy)}
                        />
                    </div>
                    <div className="mandatory-star-wrap imgattach-wrap">
                        <p>Image Attachment</p>
                        <div className="sel-wrap text-left no-style-file">
                            {props.orderPageOn === "edit" ?
                                <>
                                    {(props.src !== "" && props.src != "null" && props.src != null) ?
                                        <>
                                            <img src={props.src} alt="" width="150" height="150" />
                                            <div className="crossIcon" onClick={() => props.ProductsAction("", props.click)}><Icon source={CancelSmallMinor} color="base" /></div>
                                        </>
                                        :
                                        <input type="file" />
                                    }
                                </>
                                :
                                <>
                                    <input type="file" />
                                    { props.src != undefined && props.src !== "" ?
                                        <p className="selected-txt" style={{marginTop:"10px",marginBottom:"10px"}}>Product Image Selected</p>
                                        : null}
                                </>
                            }
                        </div>
                    </div>
                    {props.orderPageOn === "edit" ?
                        <>
                            {props.src === "" ?
                                <div className="prdct-img-div"  onClick={() => {
                                    props.ProductsAction(props.src, true);
                                    navigate("/special_order/pagerouters/product_images");
                                }}  onMouseEnter={(e)=>handleMouseEnter("enter",e)}
                                onMouseLeave={(e)=>handleMouseEnter("leave",e)}>Select Product Image</div>
                                : null}
                        </>
                        :
                        <div to="/special_order/pagerouters/product_images" className="prdct-img-div" onClick={() =>{
                            props.ProductsAction(props.src, true)
                            navigate("/special_order/pagerouters/product_images")
                        }   
                        } onMouseEnter={(e)=>handleMouseEnter("enter",e)}
                        onMouseLeave={(e)=>handleMouseEnter("leave",e)}>Select Product Image</div>
                    }
                    <div className="mandatory-star-wrap mandatory-star">
                        <label>Customer</label>
                        {props.customer === "" ?
                            <input index="6" className="required_cls created-disable"
                                disabled="disabled"
                            /> :
                            <>
                                {props.customer === "" && props.order_id === "" ?
                                    <input
                                        index="6"
                                        className="required_cls"
                                        defaultValue={props.customer}
                                    />
                                    :
                                    <input index="6" className="required_cls created-disable"
                                        disabled="disabled"
                                        defaultValue={props.customer}
                                    />
                                }
                            </>
                        }
                        {props.customer_err && (<div>{errorMsg}</div>)}
                    </div>
                    {props.customer != undefined && props.customer !== "" ?
                        <p className="selected-txt">Customer Selected</p>
                        : null}
                    <div className="prdct-img-div" onClick={() => {
                        props.Action(props.customer, props.clicked, true);
                        navigate("/special_order/pagerouters/select_customer");
                    }} onMouseEnter={(e)=>handleMouseEnter("enter",e)}
                    onMouseLeave={(e)=>handleMouseEnter("leave",e)}>Select Customer</div>
                    <div className="mandatory-star-wrap mandatory-star">
                        <label>Manufacturer</label>
                        {props.manu === "" ?
                            <input index="7" className="required_cls created-disable"
                                disabled="disabled"
                            /> :
                            <>
                                {props.manu === "" && props.order_id === "" ?
                                    <input
                                        index="7"
                                        className="required_cls"
                                        defaultValue={props.manu}
                                    />
                                    :
                                    <input index="7" className="required_cls created-disable"
                                        disabled="disabled"
                                        defaultValue={props.manu}
                                    />
                                }
                            </>
                        }
                        {props.manufacturer_err && (<div>{errorMsg}</div>)}
                    </div>
                    
                    {props.manu != undefined && props.manu !== "" ?
                        <p className="selected-txt">Manufacturer Selected</p>
                        : null}
                    <div className="prdct-img-div" onClick={() => {
                        props.ManuAction(props.manu, true);
                        navigate("/special_order/pagerouters/select_manufacturer");
                    }} onMouseEnter={(e)=>handleMouseEnter("enter",e)}
                    onMouseLeave={(e)=>handleMouseEnter("leave",e)}>Select Manufacturer</div>
                    <div className="mandatory-star-wrap">
                        <label>Created by</label>
                        <input value={props.shopOwner} className="created-disable"
                            disabled="disabled"
                        />
                    </div>
                    <div className="mandatory-star-wrap">
                        <label>Created on</label>
                        <input value={todayDate} className="created-disable"
                            disabled="disabled"
                        />
                    </div>
                </FormLayout>
            </div>
        </div>
    );
}

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        customer: state.customer,
        src: state.src,
        clicked: state.click,
        click: state.clickProductImage,
        clickCust: state.clickCustomer,
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
        stock_err: state.stock_err,
        quantity_err: state.quantity_err,
        karat_err: state.karat_err,
        colour_err: state.colour_err,
        size_err: state.size_err,
        desc_err: state.desc_err,
        customer_err: state.customer_err,
        manufacturer_err: state.manufacturer_err,
        order_id: state.order_id,
        orderPageOn: state.orderPageOn,
        shopOwner:state.shop_owner
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        Action: (payload, clicked, click) => dispatch(Action(payload, clicked, click)),
        ProductsAction: (src, click) => dispatch(ProductsAction(src, click)),
        ManuAction: (name, click) => dispatch(ManufacturersAction(name, click)),
        SpclOrderAction: (status, stock, quantity, karat, colour, size, desc, cust_notes, scanned_copy) => dispatch(SpclOrderAction(status, stock, quantity, karat, colour, size, desc, cust_notes, scanned_copy)),
    };
};

/*-------SpecialOrderDetails function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(SpecialOrderDetails);
