import { Link, useLocation } from "react-router-dom";
import AutoGemzIconBlack from "./svgs/navbar/AutoGemzIconBlack";
import InspectionReport from "./svgs/sidebar/InspectionReport";
import SettingsIcon from "./svgs/sidebar/SettingsIcon";

const inspectorNavItems = [
  { path: "/inspector", label: "Inspection List", icon: InspectionReport },
  { path: "/inspector/settings", label: "Settings", icon: SettingsIcon },
];

const InspectorSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-3 border-b border-gray-200">
        <AutoGemzIconBlack />
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {inspectorNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-2 py-3 transition-colors ${
                isActive ? "bg-gray-100 border-l-4 border-autogemz-orange" : "hover:bg-gray-50 text-black!"
              }`}
            >
              <Icon />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default InspectorSidebar;
