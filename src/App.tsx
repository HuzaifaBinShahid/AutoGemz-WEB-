import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
// import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Auctions from "./pages/Auctions";
import UsersDealers from "./pages/UsersDealers";
import UserDealerDetails from "./pages/UserDealerDetails";
import MyVehicles from "./pages/MyVehicles";
import VehicleDetails from "./pages/VehicleDetails";
import PaymentsRefunds from "./pages/PaymentsRefunds";
import PaymentRefundDetails from "./pages/PaymentRefundDetails";
import InstantOffers from "./pages/InstantOffers";
import InstantOfferDetails from "./pages/InstantOfferDetails";
import InspectionReport from "./pages/InspectionReport";
import InspectionReportDetails from "./pages/InspectionReportDetails";
import DisputesCenter from "./pages/DisputesCenter";
import Settings from "./pages/Settings";
import AuctionDetails from "./pages/AuctionDetails";
import ParticipationRequests from "./pages/ParticipationRequests";
import DashboardLayout from "./components/common/DashboardLayout";
import InspectorLayout from "./components/common/InspectorLayout";
import InspectorInspectionList from "./pages/InspectorInspectionList";
import AddNewCar from "./pages/AddNewCar";
import RoleProtectedRoute from "./components/common/RoleProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        {/* <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} /> */}
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <RoleProtectedRoute allowedRoles={["admin", "user"]}>
              <DashboardLayout />
            </RoleProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="auctions" element={<Auctions />} />
          <Route
            path="participation-requests"
            element={<ParticipationRequests />}
          />
          <Route path="auctions/:id" element={<AuctionDetails />} />
          <Route path="users-dealers" element={<UsersDealers />} />
          <Route path="users-dealers/:id" element={<UserDealerDetails />} />
          <Route path="my-vehicles" element={<MyVehicles />} />
          <Route path="my-vehicles/:id" element={<VehicleDetails />} />
          <Route path="payments-refunds" element={<PaymentsRefunds />} />
          <Route
            path="payments-refunds/:id"
            element={<PaymentRefundDetails />}
          />
          <Route path="instant-offer" element={<InstantOffers />} />
          <Route path="instant-offer/:id" element={<InstantOfferDetails />} />
          <Route path="inspection-report" element={<InspectionReport />} />
          <Route
            path="inspection-report/:id"
            element={<InspectionReportDetails />}
          />
          <Route path="disputes-center" element={<DisputesCenter />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/inspector" element={<InspectorLayout />}>
          <Route index element={<InspectorInspectionList />} />
          <Route path="add" element={<AddNewCar />} />
          <Route path=":id" element={<InspectionReportDetails />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
