import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import { connect } from "react-redux";
import Header from '../components/Header/Header';
import { NavigationMenu } from "@shopify/app-bridge-react";
import { Navigate } from "react-router-dom";
import { useAuthenticatedFetch } from '../hooks';

function PrivateRoutes() {
    const fetch = useAuthenticatedFetch();
    const auth = { isAuth: localStorage.getItem("authenticated") };
    useEffect(() => {
        const getShopData = () => {
            fetch("/api/shop").then(data => data.json()).then(shop_json => {
                let shop = shop_json.shop;

                let customerOptions = {
                    method: "POST",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify({ name: shop.domain })
                };
                const customerUrl = "/api/customers";
                let customerFetchRes = fetch(customerUrl, customerOptions);
                customerFetchRes.then((res) => res.json()).then((d) => {
                });

            }
            )
        }

        getShopData();


    }, []);
    return (
        <div>
            {auth.isAuth ?
                <div className="main-content-wrapper">
                    <Dashboard />
                    <div className="main-wrapper">
                        <Header />
                        <Outlet />

                    </div>
                </div>
                :
                // <NavigationMenu
                //     navigationLinks={[
                //         {
                //             destination: "/",
                //         },
                //     ]}
                // />
                <Navigate to="/user_auth" />
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        dashboard_tab: state.dashboard_tab
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);