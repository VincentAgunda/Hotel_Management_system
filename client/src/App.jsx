import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-hot-toast';
import Dashboard from './pages/Dashboard.jsx';
import Rooms from './pages/Rooms/index.jsx';
import Bookings from './pages/Bookings/index.jsx';
import Guests from './pages/Guests.jsx';
import Staff from './pages/Staff.jsx';
import Login from './pages/Login.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Sidebar from './components/layout/Sidebar.jsx';

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <ToastContainer position="top-right" />
        </main>
      </div>
    </div>
  );
}

export default App;