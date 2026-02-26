import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CertProvider } from './context/CertContext';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AllCertifications from './pages/Admin/AllCertifications';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminExpiring from './pages/Admin/AdminExpiring';
import AdminExpired from './pages/Admin/AdminExpired';
import AdminRenewals from './pages/Admin/AdminRenewals';
import CertificationForm from './pages/Shared/CertificationForm';
import UserDashboard from './pages/User/UserDashboard';
import UserCertifications from './pages/User/UserCertifications';
import './index.css';

function ProtectedLayout({ role }) {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (role && currentUser.role !== role) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/user'} replace />;
  }

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content-area">
          <Routes>
            {role === 'admin' ? (
              <>
                <Route index element={<AdminDashboard />} />
                <Route path="certifications" element={<AllCertifications />} />
                <Route path="add-certification" element={<CertificationForm mode="add" />} />
                <Route path="edit-certification/:certId" element={<CertificationForm mode="edit" />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="expiring" element={<AdminExpiring />} />
                <Route path="expired" element={<AdminExpired />} />
                <Route path="renewals" element={<AdminRenewals />} />
              </>
            ) : (
              <>
                <Route index element={<UserDashboard />} />
                <Route path="certifications" element={<UserCertifications />} />
                <Route path="active" element={<UserCertifications filterStatus="active" />} />
                <Route path="expiring" element={<UserCertifications filterStatus="expiring" />} />
                <Route path="expired" element={<UserCertifications filterStatus="expired" />} />
                <Route path="add-certification" element={<CertificationForm mode="add" />} />
                <Route path="edit-certification/:certId" element={<CertificationForm mode="edit" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to={currentUser.role === 'admin' ? '/admin' : '/user'} /> : <Login />} />
      <Route path="/admin/*" element={<ProtectedLayout role="admin" />} />
      <Route path="/user/*" element={<ProtectedLayout role="user" />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CertProvider>
          <AppRoutes />
        </CertProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
