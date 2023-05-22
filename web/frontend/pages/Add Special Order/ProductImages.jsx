import React, { useState, useCallback, useEffect } from "react";
import { Card, TextField } from "@shopify/polaris";
import { GetAllProductsService } from "../../components";
import { Link } from "react-router-dom";
import { Action, ProductsAction } from "../../components";
import { connect } from "react-redux";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

/*------------This function is for product images tab in add special order page-----------------*/
function ProductImages(props) {
    const [value, setValue] = useState("");
    const [products, setProducts] = useState([]);
    const [productImg, setProductImg] = useState([]);
    const [viewImage, setViewImage] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    useEffect(() => {
        const getProductsData = async () => {
            let shop = document.querySelector("#shop_id").value;
            shop = JSON.parse(shop);
            const shopName = { store: shop.name };
            const result = await GetAllProductsService(shopName);
            setProducts(result.message.products);
        };
        getProductsData();
    }, []);
    const handleChange = useCallback((newValue) => setValue(newValue), []);
    const handleViewImages = (id) => {
        setViewImage(true);
        setProductImg(products.filter(items => {
            return items.id === id;
        }));
    };
    const rowMarkup = products.map((product) => (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.variants[0].sku}</td>
            <td>{product.title}</td>
            <td>
                <a href="#" onClick={() => { handleViewImages(product.id); }}>View Images</a>
            </td>
        </tr>
    ));
    return (
        <div>
            <Card>
                <div className="shorting-wrap">
                    <p className="admin__control-support-text">
                        {products.length} records found
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
                                    value={value}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={value}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </td>
                            <td>
                                <TextField
                                    value={value}
                                    onChange={handleChange}
                                    autoComplete="off"
                                />
                            </td>
                            <td></td>
                        </tr>
                        {rowMarkup}
                    </tbody>
                </table>
                <div className={viewImage ? "img_cross_view img_cross_view_wrapper" : "img_cross_view"}>
                    {viewImage && productImg[0] && productImg[0].images &&
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
                                onClick={() => {
                                    props.ProductsAction(productImg[0].images[photoIndex].src, props.click);
                                    props.Action(props.customer, true, props.clickCust);
                                }}
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
