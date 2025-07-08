import { useAuth } from '../../context/AuthContext.jsx';

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600">Hotel Management</h1>
            </div>
          </div>
          
          <div className="flex items-center">
            {currentUser && (
              <div className="ml-3 relative">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">
                    {currentUser.name} ({currentUser.role})
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}