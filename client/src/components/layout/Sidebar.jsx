import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Sidebar() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Bookings', path: '/bookings' },
    { name: 'Guests', path: '/guests' },
    { name: 'Staff', path: '/staff' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold">Hotel Admin</h2>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${
                isActive 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}