import { useCerts } from '../../context/CertContext';
import { USERS, formatDate, getDaysLeft } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { useNavigate } from 'react-router-dom';

export default function AdminUsers() {
    const { certifications } = useCerts();
    const navigate = useNavigate();
    const users = USERS.filter(u => u.role === 'user');

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Users</h1>
                    <p className="page-subtitle">Manage platform users and their certifications</p>
                </div>
            </div>

            <div className="card">
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Total Certs</th>
                            <th>Active</th>
                            <th>Expiring</th>
                            <th>Expired</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            const uCerts = certifications.filter(c => c.userId === user.id);
                            const active = uCerts.filter(c => c.status === 'active').length;
                            const expiring = uCerts.filter(c => c.status === 'expiring').length;
                            const expired = uCerts.filter(c => c.status === 'expired').length;
                            return (
                                <tr key={user.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div className="avatar" style={{ background: user.color }}>{user.initials}</div>
                                            <span style={{ fontWeight: 600, fontSize: 14 }}>{user.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--text-light)', fontSize: 13 }}>{user.email}</td>
                                    <td><span style={{ fontWeight: 700, fontSize: 16 }}>{uCerts.length}</span></td>
                                    <td><span style={{ color: '#22C55E', fontWeight: 600 }}>{active}</span></td>
                                    <td><span style={{ color: '#F59E0B', fontWeight: 600 }}>{expiring}</span></td>
                                    <td><span style={{ color: '#EF4444', fontWeight: 600 }}>{expired}</span></td>
                                    <td>
                                        <button
                                            className="btn btn-outline btn-sm"
                                            onClick={() => navigate('/admin/certifications')}
                                        >
                                            View Certs
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {users.map(user => {
                const uCerts = certifications.filter(c => c.userId === user.id);
                return (
                    <div key={user.id} className="card" style={{ marginTop: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                            <div className="avatar" style={{ background: user.color }}>{user.initials}</div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 15 }}>{user.name}</div>
                                <div style={{ color: 'var(--text-light)', fontSize: 13 }}>{user.email}</div>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Certification</th>
                                    <th>Category</th>
                                    <th>Expiry</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uCerts.map(cert => (
                                    <tr key={cert.id}>
                                        <td>
                                            <div style={{ fontWeight: 600, fontSize: 13 }}>{cert.name}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{cert.issuer}</div>
                                        </td>
                                        <td style={{ color: 'var(--text-light)', fontSize: 13 }}>{cert.category}</td>
                                        <td style={{ fontSize: 13 }}>{formatDate(cert.expiryDate)}</td>
                                        <td><StatusBadge status={cert.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}
