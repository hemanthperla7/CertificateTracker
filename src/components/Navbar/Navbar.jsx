import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <header className="navbar">
            <div className="navbar-left">
                <span className="navbar-brand">🏆 Certification Tracker</span>
            </div>
            <div className="navbar-right">
                <span className="navbar-username">{currentUser?.name}</span>
                <div className="avatar" style={{ background: currentUser?.color }}>
                    {currentUser?.initials}
                </div>
                <button className="btn-logout" onClick={handleLogout}>
                    🚪 Logout
                </button>
            </div>
        </header>
    );
}
