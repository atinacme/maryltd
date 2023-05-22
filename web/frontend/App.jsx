import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import HomePage from "./pages/HomePage";
import ManufacturerHomePage from "./pages/ManufacturerHomePage";
import NewTaskHomePage from "./pages/NewTaskHomePage";
import AddSpecialOrderPage from "./pages/Add Special Order/AddSpecialOrderPageRoutes";
import ScannedCopy from "./pages/Add Special Order/ScannedCopy";

import Routers2 from "./Routing/Routers";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { Provider } from "react-redux";
import store from "./components/Redux/store";
import "../resources/css/app.css";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");


  return (
    <Provider store={store}>
      <PolarisProvider>
        <BrowserRouter>
          <AppBridgeProvider>
            <QueryProvider>
              {/* <NavigationMenu
                navigationLinks={[
                  {
                    destination: "/HomePage",
                  },
                  {
                    destination: "/ManufacturerHomePage",
                  },
                  {
                    destination: "/NewTaskHomePage",
                  },
                  {
                    destination: "/AddSpecialOrderPage",
                  }
                ]}
              /> */}

              {/* <Routers2 /> */}
              {/*<Routes>
                <Route index={true} path="/HomePage" element={<HomePage />} />
                <Route path="/ManufacturerHomePage" element={<ManufacturerHomePage />} />
                <Route path="/NewTaskHomePage" element={<NewTaskHomePage />} />
                <Route exact path="/AddSpecialOrderPage" element={<AddSpecialOrderPage />} >
                  <Route exact path="/AddSpecialOrderPage/scanned_copy" element={<ScannedCopy />} />
                </Route>
              </Routes>*/}
              <Routers2 />
              {/* <Routes pages={pages} /> */}
            </QueryProvider>
          </AppBridgeProvider>
        </BrowserRouter>
      </PolarisProvider>
    </Provider>
  );
}


// create react nexted routing