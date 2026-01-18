import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Auctions from "./pages/Auctions";
import UsersDealers from "./pages/UsersDealers";
import UserDealerDetails from "./pages/UserDealerDetails";
import PaymentsRefunds from "./pages/PaymentsRefunds";
import PaymentRefundDetails from "./pages/PaymentRefundDetails";
import InstantOffers from "./pages/InstantOffers";
import InstantOfferDetails from "./pages/InstantOfferDetails";
import InspectionReport from "./pages/InspectionReport";
import DisputesCenter from "./pages/DisputesCenter";
import Settings from "./pages/Settings";
import AuctionDetails from "./pages/AuctionDetails";
import DashboardLayout from "./components/common/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="auctions" element={<Auctions />} />
          <Route path="auctions/:id" element={<AuctionDetails />} />
          <Route path="users-dealers" element={<UsersDealers />} />
          <Route path="users-dealers/:id" element={<UserDealerDetails />} />
          <Route path="payments-refunds" element={<PaymentsRefunds />} />
          <Route path="payments-refunds/:id" element={<PaymentRefundDetails />} />
          <Route path="instant-offer" element={<InstantOffers />} />
          <Route path="instant-offer/:id" element={<InstantOfferDetails />} />
          <Route path="inspection-report" element={<InspectionReport />} />
          <Route path="disputes-center" element={<DisputesCenter />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
