import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCerts } from '../../context/CertContext';
import { USERS, formatDate, getDaysLeft } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import './AllCertifications.css';

export default function AllCertifications() {
    const { certifications, deleteCertification } = useCerts();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filtered = useMemo(() => {
        return certifications.filter(c => {
            const matchSearch =
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.issuer.toLowerCase().includes(search.toLowerCase()) ||
                c.category.toLowerCase().includes(search.toLowerCase());
            const matchStatus = filterStatus === 'all' || c.status === filterStatus;
            return matchSearch && matchStatus;
        });
    }, [certifications, search, filterStatus]);

    function handleDelete(id) {
        if (window.confirm('Delete this certification?')) {
            deleteCertification(id);
        }
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">All Certifications</h1>
                    <p className="page-subtitle">{certifications.length} total certifications</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/admin/add-certification')}>
                    + Add Certification
                </button>
            </div>

            <div className="card">
                <div className="filter-bar">
                    <input
                        className="form-control search-input"
                        placeholder="🔍 Search certifications..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select
                        className="form-control filter-select"
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="expiring">Expiring Soon</option>
                        <option value="expired">Expired</option>
                        <option value="renewal_pending">Renewal Pending</option>
                    </select>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Certification</th>
                                <th>User</th>
                                <th>Category</th>
                                <th>Issue Date</th>
                                <th>Expiry Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 && (
                                <tr><td colSpan={7} className="empty-row">No certifications found.</td></tr>
                            )}
                            {filtered.map(cert => {
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
                                                <div className="avatar avatar-sm" style={{ background: user?.color }}>{user?.initials}</div>
                                                <span style={{ fontSize: 13 }}>{user?.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ color: 'var(--text-light)', fontSize: 13 }}>{cert.category}</td>
                                        <td style={{ fontSize: 13 }}>{formatDate(cert.issueDate)}</td>
                                        <td style={{ fontSize: 13 }}>{formatDate(cert.expiryDate)}</td>
                                        <td><StatusBadge status={cert.status} /></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                                                <button
                                                    className="btn btn-outline btn-sm"
                                                    onClick={() => navigate(`/admin/edit-certification/${cert.id}`)}
                                                >✏️ Edit</button>
                                                <button
                                                    className="btn-icon"
                                                    onClick={() => handleDelete(cert.id)}
                                                >🗑</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
