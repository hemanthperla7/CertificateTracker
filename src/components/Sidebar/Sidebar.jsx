import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const adminLinks = [
    {
        section: 'MAIN MENU',
        items: [
            { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
            { to: '/admin/certifications', label: 'All Certifications', icon: '📋' },
            { to: '/admin/add-certification', label: 'Add Certification', icon: '➕' },
        ],
    },
    {
        section: 'MANAGEMENT',
        items: [
            { to: '/admin/users', label: 'Users', icon: '👥' },
            { to: '/admin/expiring', label: 'Expiring Soon', icon: '⏰' },
            { to: '/admin/expired', label: 'Expired', icon: '🔴' },
            { to: '/admin/renewals', label: 'Renewals', icon: '📋' },
        ],
    },
];

const userLinks = [
    {
        section: 'MY ACCOUNT',
        items: [
            { to: '/user', label: 'Dashboard', icon: '📊', end: true },
            { to: '/user/certifications', label: 'My Certifications', icon: '📋' },
            { to: '/user/add-certification', label: 'Add Certification', icon: '➕' },
        ],
    },
    {
        section: 'QUICK FILTERS',
        items: [
            { to: '/user/active', label: 'Active', icon: '✅' },
            { to: '/user/expiring', label: 'Expiring Soon', icon: '⏰' },
            { to: '/user/expired', label: 'Expired', icon: '🔴' },
        ],
    },
];

export default function Sidebar() {
    const { currentUser } = useAuth();
    const links = currentUser?.role === 'admin' ? adminLinks : userLinks;

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-icon">🏆</div>
                <div className="brand-text">
                    <span className="brand-name">Certification</span>
                    <span className="brand-name">Tracker</span>
                </div>
                {currentUser?.role === 'admin' && (
                    <span className="brand-badge">ADMIN</span>
                )}
            </div>

            <nav className="sidebar-nav">
                {links.map(group => (
                    <div key={group.section} className="nav-group">
                        <p className="nav-section-label">{group.section}</p>
                        {group.items.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    'nav-link' + (isActive ? ' active' : '')
                                }
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>
        </aside>
    );
}
