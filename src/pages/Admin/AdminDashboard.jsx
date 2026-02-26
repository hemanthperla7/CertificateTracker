import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useCerts } from '../../context/CertContext';
import { USERS } from '../../data/mockData';
import StatsCard from '../../components/StatsCard/StatsCard';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { formatDate, getDaysLeft } from '../../data/mockData';
import './AdminDashboard.css';

const COLORS = ['#22C55E', '#F59E0B', '#EF4444', '#38BDF8'];

export default function AdminDashboard() {
    const { certifications, deleteCertification } = useCerts();
    const navigate = useNavigate();

    const stats = useMemo(() => {
        const total = certifications.length;
        const active = certifications.filter(c => c.status === 'active').length;
        const expiring = certifications.filter(c => c.status === 'expiring').length;
        const expired = certifications.filter(c => c.status === 'expired').length;
        const renewal = certifications.filter(c => c.status === 'renewal_pending').length;
        return { total, active, expiring, expired, renewal };
    }, [certifications]);

    const pieData = [
        { name: 'Active', value: stats.active },
        { name: 'Expiring Soon', value: stats.expiring },
        { name: 'Expired', value: stats.expired },
        { name: 'Renewal Pending', value: stats.renewal },
    ];

    const attentionCerts = useMemo(() =>
        certifications
            .filter(c => c.status !== 'active')
            .slice(0, 8),
        [certifications]
    );

    const users = USERS.filter(u => u.role === 'user');

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString('en-US', options);

    function handleDelete(id) {
        if (window.confirm('Delete this certification?')) {
            deleteCertification(id);
        }
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Admin Dashboard</h1>
                    <p className="page-subtitle">{dateStr}</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/admin/add-certification')}>
                    + Add Certification
                </button>
            </div>

            {/* Stats Row */}
            <div className="stats-row">
                <StatsCard icon="📋" value={stats.total} label="Total Certs" color="#6C63FF" />
                <StatsCard icon="✅" value={stats.active} label="Active" color="#22C55E" />
                <StatsCard icon="⏰" value={stats.expiring} label="Expiring Soon" color="#F59E0B" />
                <StatsCard icon="❌" value={stats.expired} label="Expired" color="#EF4444" />
                <StatsCard icon="🔄" value={stats.renewal} label="Renewal Pending" color="#38BDF8" />
            </div>

            {/* Middle Section */}
            <div className="dashboard-mid">
                {/* Donut Chart */}
                <div className="card chart-card">
                    <h3 className="card-title">Certification Status Overview</h3>
                    <div className="chart-area">
                        <ResponsiveContainer width={200} height={200}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    dataKey="value"
                                    paddingAngle={2}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="chart-center-text">Total</div>
                        <div className="chart-legend">
                            {pieData.map((d, i) => (
                                <div key={d.name} className="legend-row">
                                    <span className="legend-dot" style={{ background: COLORS[i] }} />
                                    <span className="legend-name">{d.name}</span>
                                    <span className="legend-val">{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Users Card */}
                <div className="card users-card">
                    <div className="card-header-row">
                        <h3 className="card-title">👥 Users</h3>
                        <Link to="/admin/users" className="view-all">View All</Link>
                    </div>
                    {users.map(user => {
                        const count = certifications.filter(c => c.userId === user.id).length;
                        return (
                            <div key={user.id} className="user-row">
                                <div className="avatar" style={{ background: user.color }}>{user.initials}</div>
                                <div className="user-info">
                                    <div className="user-name">{user.name}</div>
                                    <div className="user-email">{user.email}</div>
                                </div>
                                <span className="cert-count-badge">{count} certs</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Attention Table */}
            <div className="card attention-card">
                <div className="card-header-row">
                    <h3 className="card-title">⚠️ Attention Required</h3>
                    <Link to="/admin/certifications" className="view-all">View All →</Link>
                </div>
                <div className="table-container">
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
                            {attentionCerts.map(cert => {
                                const user = USERS.find(u => u.id === cert.userId);
                                const daysLeft = getDaysLeft(cert.expiryDate);
                                const expired = daysLeft < 0;
                                return (
                                    <tr key={cert.id}>
                                        <td>
                                            <div className="cert-name-cell">{cert.name}</div>
                                            <div className="cert-issuer-cell">{cert.issuer}</div>
                                        </td>
                                        <td>
                                            <div className="user-cell">
                                                <div className="avatar avatar-sm" style={{ background: user?.color }}>{user?.initials}</div>
                                                {user?.name}
                                            </div>
                                        </td>
                                        <td className="text-light">{cert.category}</td>
                                        <td>{formatDate(cert.expiryDate)}</td>
                                        <td><StatusBadge status={cert.status} /></td>
                                        <td>
                                            <div className="action-row">
                                                <span
                                                    className={`days-badge ${expired ? 'days-expired' : cert.status === 'expiring' ? 'days-expiring' : 'days-pending'}`}
                                                >
                                                    {expired
                                                        ? `Expired ${Math.abs(daysLeft)}d ago`
                                                        : cert.status === 'renewal_pending'
                                                            ? `${daysLeft}d left`
                                                            : `⚠ ${daysLeft}d left`}
                                                </span>
                                                <button
                                                    className="btn-icon"
                                                    title="Delete"
                                                    onClick={() => handleDelete(cert.id)}
                                                >🗑</button>
                                                <button
                                                    className="btn-icon"
                                                    title="Edit"
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
        </div>
    );
}
