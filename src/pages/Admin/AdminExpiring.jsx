import { useCerts } from '../../context/CertContext';
import { USERS, formatDate, getDaysLeft } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { useNavigate } from 'react-router-dom';

export default function AdminExpiring() {
    const { certifications, updateCertification } = useCerts();
    const navigate = useNavigate();
    const expiring = certifications.filter(c => c.status === 'expiring');

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">⏰ Expiring Soon</h1>
                    <p className="page-subtitle">{expiring.length} certifications expiring within 90 days</p>
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
                            <th>Days Left</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expiring.length === 0 && (
                            <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: 'var(--text-light)' }}>No expiring certifications.</td></tr>
                        )}
                        {expiring.map(cert => {
                            const user = USERS.find(u => u.id === cert.userId);
                            const daysLeft = getDaysLeft(cert.expiryDate);
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
                                    <td>
                                        <span style={{ color: '#B45309', fontWeight: 700, fontSize: 13 }}>⚠ {daysLeft}d left</span>
                                    </td>
                                    <td><StatusBadge status={cert.status} /></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => {
                                                    updateCertification(cert.id, { status: 'renewal_pending', renewalStatus: 'pending' });
                                                }}
                                            >🔄 Initiate Renewal</button>
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
