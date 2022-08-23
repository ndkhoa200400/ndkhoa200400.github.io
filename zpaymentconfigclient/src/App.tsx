import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "antd-css-utilities/utility.min.css";
import { ErrorPage } from "pages/ErrorPage";
import "./App.css";
import { AddProductPaymentMethod } from "./pages/AddProductPaymentMethod";
import { CreateGamePage } from "./pages/CreateGamePage";
import { CreateGroupProductPage } from "./pages/CreateGroupProduct";
import { CreatePaymentMethodPage } from "./pages/CreatePaymentMethodPage";
import { CreateProductPage } from "./pages/CreateProductPage";
import { CreateProviderPage } from "./pages/CreateProviderPage";
import { GameHome } from "./pages/GameHome";
import { GamePage } from "./pages/GamePage";
import { GroupProductPage } from "./pages/GroupProductPage";
import { Home } from "./pages/Home";
import { ListGamePage } from "./pages/ListGames";
import { ListGroupProduct } from "./pages/ListGroupProductsPage";
import { ListPaymentMethodsPage } from "./pages/ListPaymentMethods";
import { ListProductPage } from "./pages/ListProductPage";
import { ListProviderPage } from "./pages/ListProviderPage";
import { PaymentMethodPage } from "./pages/PaymentMethodPage";
import { ProductPage } from "./pages/ProductPage";
import { ProductPaymentMethodPage } from "./pages/ProductPaymentMethodPage";
import { ProviderPage } from "./pages/ProviderPage";
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<ListGamePage />}></Route>
            <Route path="games">
              <Route index element={<ListGamePage />}></Route>
              <Route path="create-game" element={<CreateGamePage />}></Route>
            </Route>

            {/* Payment Methods */}
            <Route path="payment-methods">
              <Route index element={<ListPaymentMethodsPage />}></Route>
              <Route
                path="create-payment-method"
                element={<CreatePaymentMethodPage />}
              ></Route>
              <Route path=":id" element={<PaymentMethodPage />} />
            </Route>

            {/* Providers */}
            <Route path="providers">
              <Route index element={<ListProviderPage />}></Route>
              <Route
                path="create-provider"
                element={<CreateProviderPage />}
              ></Route>
              <Route path=":id" element={<ProviderPage />} />
            </Route>
          </Route>

          {/* Game by AppID section */}
          <Route path="games/:appId" element={<GameHome />}>
            <Route index element={<GamePage />} />
            <Route
              path="create-group-product"
              element={<CreateGroupProductPage></CreateGroupProductPage>}
            ></Route>
            <Route path="products" element={<ListProductPage />}></Route>
            <Route path="group-products">
              <Route index element={<ListGroupProduct />} />

              <Route path=":groupId">
                <Route
                  index
                  element={<GroupProductPage></GroupProductPage>}
                ></Route>
                <Route path=":productID">
                  <Route index element={<ProductPage></ProductPage>}></Route>
                  <Route
                    path=":methodId"
                    element={
                      <ProductPaymentMethodPage></ProductPaymentMethodPage>
                    }
                  ></Route>
                  <Route
                    path="add-payment-method"
                    element={
                      <AddProductPaymentMethod></AddProductPaymentMethod>
                    }
                  ></Route>
                </Route>
                <Route
                  path="create-product"
                  element={<CreateProductPage></CreateProductPage>}
                ></Route>
              </Route>
            </Route>
          </Route>
          <Route path="error" element={<ErrorPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
