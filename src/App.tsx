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
          <Route path="users-dealers" element={<UsersDealers />} />
          <Route path="payments-refunds" element={<Dashboard />} />
          <Route path="instant-offer" element={<Dashboard />} />
          <Route path="inspection-report" element={<Dashboard />} />
          <Route path="disputes-center" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
