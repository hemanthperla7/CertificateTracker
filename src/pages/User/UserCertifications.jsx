import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCerts } from '../../context/CertContext';
import { useAuth } from '../../context/AuthContext';
import CertCard from '../../components/CertCard/CertCard';

export default function UserCertifications({ filterStatus }) {
    const { currentUser } = useAuth();
    const { getCertsByUser, updateCertification } = useCerts();
    const navigate = useNavigate();

    const allCerts = getCertsByUser(currentUser?.id);
    const [search, setSearch] = useState('');

    const certs = useMemo(() => {
        let list = filterStatus ? allCerts.filter(c => c.status === filterStatus) : allCerts;
        if (search) {
            list = list.filter(c =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.issuer.toLowerCase().includes(search.toLowerCase())
            );
        }
        return list;
    }, [allCerts, filterStatus, search]);

    const titleMap = {
        active: '✅ Active Certifications',
        expiring: '⏰ Expiring Soon',
        expired: '🔴 Expired Certifications',
        undefined: 'My Certifications',
        null: 'My Certifications',
    };

    const title = titleMap[filterStatus] ?? 'My Certifications';

    function handleRenew(cert) {
        updateCertification(cert.id, { status: 'renewal_pending', renewalStatus: 'pending' });
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">{title}</h1>
                    <p className="page-subtitle">{certs.length} certification{certs.length !== 1 ? 's' : ''}</p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/user/add-certification')}>
                    + Add New
                </button>
            </div>

            <div style={{ marginBottom: 20 }}>
                <input
                    className="form-control"
                    style={{ maxWidth: 380 }}
                    placeholder="🔍 Search certifications..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {certs.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: 48, color: 'var(--text-light)' }}>
                    No certifications found.{' '}
                    <span
                        className="view-all"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/user/add-certification')}
                    >
                        Add one now →
                    </span>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
                    {certs.map(cert => (
                        <CertCard
                            key={cert.id}
                            cert={cert}
                            onRenew={handleRenew}
                            onEdit={() => navigate(`/user/edit-certification/${cert.id}`)}
                            onView={() => { }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
