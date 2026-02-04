import { Link, useLocation } from 'react-router-dom';
import AutoGemzIconBlack from './svgs/navbar/AutoGemzIconBlack';
import DashboardIcon from './svgs/sidebar/DashboardIcon';
import AuctionsIcon from './svgs/sidebar/AuctionsIcon';
import UsersDealersIcons from './svgs/sidebar/UsersDealersIcons';
import PaymentsIcon from './svgs/sidebar/PaymentsIcon';
import InstantOffers from './svgs/sidebar/InstantOffers';
import InspectionReport from './svgs/sidebar/InspectionReport';
import DisputesCenter from './svgs/sidebar/DisputesCenter';
import SettingsIcon from './svgs/sidebar/SettingsIcon';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { path: '/my-vehicles', label: 'My Vehicles', icon: AuctionsIcon },
  { path: '/auctions', label: 'Auctions', icon: AuctionsIcon },
  { path: '/users-dealers', label: 'Users & Dealers', icon: UsersDealersIcons },
  { path: '/payments-refunds', label: 'Payments & Refunds', icon: PaymentsIcon },
  { path: '/instant-offer', label: 'Instant Offer', icon: InstantOffers },
  { path: '/inspection-report', label: 'Inspection Report', icon: InspectionReport },
  { path: '/disputes-center', label: 'Disputes Center', icon: DisputesCenter },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-3 border-b border-gray-200">
        <AutoGemzIconBlack />
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-2 py-3 transition-colors ${
                isActive
                  ? 'bg-gray-100 '
                  : ' hover:bg-gray-50 text-black!'
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

export default Sidebar;
