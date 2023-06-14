import React, { useState, useCallback, useEffect } from "react";
import { Card, TextField } from "@shopify/polaris";
import { GetAllProductsService } from "../../components";
import { Link } from "react-router-dom";
import { Action, ProductsAction } from "../../components";
import { connect } from "react-redux";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useAuthenticatedFetch } from '../../hooks';

/*------------This function is for product images tab in add special order page-----------------*/
function ProductImages(props) {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [productImg, setProductImg] = useState([]);
    const [viewImage, setViewImage] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const fetch = useAuthenticatedFetch();
    const [message,setMessage] = useState("records found");
    useEffect(() => {
        // const getProductsData = async () => {
        //     let shop = document.querySelector("#shop_id").value;
        //     // shop = JSON.parse(shop);
        //     const shopName = { store: shop.name };
        //     const result = await GetAllProductsService(shopName);
        //     setProducts(result.message.products);
        // };
        const getShopData = () => {
            setMessage("loading...");
            fetch("/api/shop").then(data => data.json()).then(async (shop_json) => {
                let shop = shop_json.shop;
                const shopName = { shop: shop.domain };
                const result = await GetAllProductsService(shopName);
                setProducts(result.message.products);
                setProductsFiltered(result.message.products);
                setMessage("records found");
            }
            )
        }
        getShopData();
        // getProductsData();
    }, []);
    // const handleChange = useCallback((newValue) => {
    //     setValue(newValue)
    //     console.log("filter product image data =====>",products);
    // }, []);

    useEffect(() => {
        
        let dataAll = products;
        if(value1 != "" && value2 == "" && value3 == ""){
          let datafilter =   dataAll.filter((item,index)=>item.id == parseInt(value1));
          dataAll = datafilter;
        }
        if(value1 != "" && value2 != "" && value3 == ""){
            let datafilter =   dataAll.filter((item,index)=>(item.id == parseInt(value1) && item.variants[0].sku.includes(value2)));
            dataAll = datafilter;
        }
        if(value1 == "" && value2 != "" && value3 == ""){
            let datafilter =   dataAll.filter((item,index)=>item.variants[0].sku.includes(value2));
            dataAll = datafilter;
        }
        if(value1 == "" && value2 == "" && value3 != ""){
            let datafilter =   dataAll.filter((item,index)=>item.title.includes(value3));
            dataAll = datafilter;
        }
        if(value1 == "" && value2 != "" && value3 != ""){
            let datafilter =   dataAll.filter((item,index)=>(item.variants[0].sku.includes(value2) && item.title.includes(value3)));
            dataAll = datafilter;
        }
        if(value1 != "" && value2 != "" && value3 != ""){
            let datafilter =   dataAll.filter((item,index)=>item.id == parseInt(value1) && item.variants[0].sku.includes(value2) &&item.title.includes(value3) );
            dataAll = datafilter;
        }
       setTimeout(()=>{
        setProductsFiltered(dataAll);
       },0)
    },[products,value1,value2,value3]);



    const handleChange1 = (value)=>{
        setValue1(value);
        handleFilter(value);
    }
    const handleChange2 = (value)=>{
        setValue2(value);
        handleFilter(value);
    }
    const handleChange3 = (value)=>{
        setValue3(value);
        handleFilter(value);
    }

    const handleFilter = (value)=>{
        console.log(value);
        console.log("check filtered data---==>",productsFiltered)

    }

    const handleViewImages = (id) => {
        setViewImage(true);
        setProductImg(products.filter(items => {
            return items.id === id;
        }));
    };
    const rowMarkup = productsFiltered.map((product) => (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.variants[0].sku}</td>
            <td>{product.title}</td>
            <td>
                <a href="#" onClick={() => { handleViewImages(product.id); }}
                onMouseEnter={(e)=>handleMouseEnter("enter",e)}
                onMouseLeave={(e)=>handleMouseEnter("leave",e)}
                >View Images</a>
            </td>
        </tr>
    ));

    const handleMouseEnter = (value,event)=>{
        if(value == "enter"){
        event.target.style.color = "#ba4000";
        } else{
            event.target.style.color = "#007bdb";
        }
            }

    return (
        <div>
            <Card>
                <div className="shorting-wrap">
                    <p className="admin__control-support-text">
                        {products.length} {message}
                    </p>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"><div className="sort-wrap">ID</div></th>
                            <th scope="col"><div className="sort-wrap">SKU</div></th>
                            <th scope="col"><div className="sort-wrap">Name</div></th>
                            <th scope="col"><div className="sort-wrap">View Images</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <TextField
                                    value={value1}
                                    onChange={(e)=>handleChange1(e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={value2}
                                    onChange={(e)=>handleChange2(e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={value3}
                                    onChange={(e)=>handleChange3(e)}
                                    autoComplete="off"
                                />
                            </td>
                            <td></td>
                        </tr>
                        {rowMarkup}
                    </tbody>
                </table>
                <div className={viewImage ? "img_cross_view img_cross_view_wrapper" : "img_cross_view"}>
                    {viewImage && productImg[0] && productImg[0].images.length &&
                        <>
                            <Lightbox
                                mainSrc={productImg[0].images[photoIndex].src}
                                nextSrc={productImg[0].images[(photoIndex + 1) % productImg[0].images.length].src}
                                prevSrc={productImg[0].images[(photoIndex + productImg[0].images.length - 1) % productImg[0].images.length].src}
                                onCloseRequest={() => { setProductImg([]); setViewImage(false); }}
                                onMovePrevRequest={() =>
                                    setPhotoIndex((photoIndex + productImg[0].images.length - 1) % productImg[0].images.length)
                                }
                                onMoveNextRequest={() =>
                                    setPhotoIndex((photoIndex + 1) % productImg[0].images.length)
                                }
                            />
                            <Link
                                to="/special_order/pagerouters"
                                style={{background: "white",
                                    padding: "6px 23px",
                                    color: "#120f0f",
                                    fontWeight: "800",
                                    margin: "10px",
                                    border: "1px solid #000"}}
                                onClick={() => {
                                    props.ProductsAction(productImg[0].images[photoIndex].src, props.click);
                                    props.Action(props.customer, true, props.clickCust);
                                }}
                                onMouseEnter={(e)=>handleMouseEnter("enter",e)}
                                onMouseLeave={(e)=>handleMouseEnter("leave",e)}
                            >
                                Select
                            </Link>
                        </>
                    }
                </div>
            </Card>
        </div>
    );
}

/*-----------Redux states------------------*/
const mapStateToProps = (state) => {
    return {
        customer: state.customer,
        clicked: state.click,
        src: state.src,
        click: state.clickProductImage,
        clickCust: state.clickCustomer
    };
};

/*-----------Redux Dispatchers--------------*/
const mapDispatchToProps = (dispatch) => {
    return {
        Action: (payload, clicked, click) => dispatch(Action(payload, clicked, click)),
        ProductsAction: (src, click) => dispatch(ProductsAction(src, click)),
    };
};

/*-------ProductImages function is exported-----------------*/
export default connect(mapStateToProps, mapDispatchToProps)(ProductImages);
