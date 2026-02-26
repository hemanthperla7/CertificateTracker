import { useCerts } from '../../context/CertContext';
import { USERS, formatDate, getDaysLeft } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { useNavigate } from 'react-router-dom';

export default function AdminRenewals() {
    const { certifications, updateCertification } = useCerts();
    const navigate = useNavigate();
    const renewals = certifications.filter(c => c.status === 'renewal_pending');

    function markComplete(cert) {
        const newExpiry = new Date(cert.expiryDate);
        newExpiry.setFullYear(newExpiry.getFullYear() + 2);
        const newDate = newExpiry.toISOString().split('T')[0];
        updateCertification(cert.id, {
            status: 'active',
            renewalStatus: null,
            expiryDate: newDate,
        });
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">📋 Renewals</h1>
                    <p className="page-subtitle">{renewals.length} certifications pending renewal</p>
                </div>
            </div>
            <div className="card">
                <table>
                    <thead>
                        <tr>
                            <th>Certification</th>
                            <th>User</th>
                            <th>Category</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renewals.length === 0 && (
                            <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--text-light)' }}>No renewals pending.</td></tr>
                        )}
                        {renewals.map(cert => {
                            const user = USERS.find(u => u.id === cert.userId);
                            return (
                                <tr key={cert.id}>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: 13 }}>{cert.name}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{cert.issuer}</div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div className="avatar" style={{ width: 28, height: 28, fontSize: 11, background: user?.color }}>{user?.initials}</div>
                                            <span style={{ fontSize: 13 }}>{user?.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--text-light)', fontSize: 13 }}>{cert.category}</td>
                                    <td style={{ fontSize: 13 }}>{formatDate(cert.expiryDate)}</td>
                                    <td><StatusBadge status={cert.status} /></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => markComplete(cert)}
                                            >✅ Mark Renewed</button>
                                            <button
                                                className="btn-icon"
                                                onClick={() => navigate(`/admin/edit-certification/${cert.id}`)}
                                            >✏️</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
