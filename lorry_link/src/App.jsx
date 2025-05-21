import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './Pages/Navbar';
import Footer from './Pages/Footer';
import Login from './components/auth/Login';
import AdminLogin from './components/auth/AdminLogin';
import SignUpDriver from './components/auth/SignUpDriver';
import SignUpGoodsOwner from './components/auth/SignUpGoodsOwner';
import DriverDashboard from './components/driver/Driver_Dashboard';
import GoodsOwnerDashboard from './components/goods-owner/Goods_owner_Dashboard';
import AdminDashboard from './components/admin/Admin_Dashboard';
// import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="app">
          {/* <Navbar userType={userType} username={username} /> */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/signup-driver" element={<SignUpDriver />} />
              <Route path="/signup-goods-owner" element={<SignUpGoodsOwner />} />
              <Route path="/driver/*" element={<DriverDashboard />} />
              <Route path="/goods-owner/*" element={<GoodsOwnerDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// return (
//   <div>
//     {/* Your component logic using userType */}
//   </div>
// );
// }

