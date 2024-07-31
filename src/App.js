import logo from './logo.svg';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import NewMerchantOrder from './components/NewMerchantOrder';
import MerchantOrderForm from './components/MerchantOrderForm';
import MerchantOrderConfirmation from './components/MerchantOrderConfirmation';
import BecomeDriverPage from './components/BecomeDriverPage';
import React from 'react';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import DriverSignupConfirmation from './components/DriverSignupConfirmation';
import SignIn from './components/SignIn';
import MerchantHome from './components/MerchantHome';
import DriverHome from './components/DriverHome';
import AdminHome from './components/AdminHome';
import EditOrder from './components/EditOrder';
import OrderPhotoViewer from './components/OrderPhotoViewer';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/new_merchant" element={<NewMerchantOrder />}>

          </Route>
          <Route
            path="/merchant/place_order"
            element={<MerchantOrderForm />}
          />

          <Route
            path="/merchant"
            element={<MerchantHome />}
          />

          <Route
            path="/merchant/confirm_order"
            element={<MerchantOrderConfirmation />}
          />

          <Route
            path="/driver"
            element={<DriverHome />}
          />

          <Route
            path="/admin"
            element={<AdminHome />}
          />


          <Route path="/driver/view-order-photo/:orderId"
            element={<OrderPhotoViewer />} />

          <Route
            path="/driver/signup"
            element={<BecomeDriverPage />}
          />

          <Route
            path="/driver/confirm_signup"
            element={<DriverSignupConfirmation />}
          />

          <Route path="/driver/edit_order/:orderId"
            element={<EditOrder />} />




          <Route
            path="/signin"
            element={<SignIn />}
          />
          {/* <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} /> */}
          {/* Add additional routes here */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
