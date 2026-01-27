import { Outlet } from "react-router-dom";
import InspectorSidebar from "../InspectorSidebar";
import Navbar from "../Navbar";

const InspectorLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <InspectorSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InspectorLayout;
