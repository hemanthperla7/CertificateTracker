import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCerts } from '../../context/CertContext';
import { useAuth } from '../../context/AuthContext';
import { getDaysLeft } from '../../data/mockData';
import StatsCard from '../../components/StatsCard/StatsCard';
import CertCard from '../../components/CertCard/CertCard';
import './UserDashboard.css';

export default function UserDashboard() {
    const { currentUser } = useAuth();
    const { getCertsByUser, updateCertification } = useCerts();
    const navigate = useNavigate();

    const certs = getCertsByUser(currentUser?.id);

    const stats = useMemo(() => ({
        total: certs.length,
        active: certs.filter(c => c.status === 'active').length,
        expiring: certs.filter(c => c.status === 'expiring').length,
        expired: certs.filter(c => c.status === 'expired').length,
    }), [certs]);

    const hasExpiring = stats.expiring > 0;
    const recentCerts = certs.slice(0, 3);

    function handleRenew(cert) {
        updateCertification(cert.id, { status: 'renewal_pending', renewalStatus: 'pending' });
    }

    return (
        <div>
            {/* Welcome Banner */}
            <div className="user-welcome-banner">
                <div>
                    <h1>Welcome back, {currentUser?.name?.split(' ')[0]}! 👋</h1>
                    <p>Here's an overview of your certifications.</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/user/add-certification')}>
                    ✦ Add New Certification
                </button>
            </div>

            {/* Stats */}
            <div className="stats-row" style={{ margin: '20px 0' }}>
                <StatsCard icon="📋" value={stats.total} label="Total Certs" color="#6C63FF" />
                <StatsCard icon="✅" value={stats.active} label="Active" color="#22C55E" />
                <StatsCard icon="⏰" value={stats.expiring} label="Expiring Soon" color="#F59E0B" />
                <StatsCard icon="❌" value={stats.expired} label="Expired" color="#EF4444" />
            </div>

            {/* Expiry Alert */}
            {hasExpiring && (
                <div className="expiry-alert">
                    <span>⚠️ You have {stats.expiring} certification(s) expiring within 90 days.</span>
                    <Link to="/user/expiring" className="alert-link"> Take action →</Link>
                </div>
            )}

            {/* My Certs */}
            <div className="section-header">
                <h2>My Certifications</h2>
                <Link to="/user/certifications" className="view-all">View All →</Link>
            </div>

            <div className="cert-cards-grid">
                {recentCerts.map(cert => (
                    <CertCard
                        key={cert.id}
                        cert={cert}
                        onRenew={handleRenew}
                        onEdit={() => navigate(`/user/edit-certification/${cert.id}`)}
                        onView={() => { }}
                    />
                ))}
            </div>
        </div>
    );
}
