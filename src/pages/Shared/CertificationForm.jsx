import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCerts } from '../../context/CertContext';
import { useAuth } from '../../context/AuthContext';
import { USERS, computeStatus } from '../../data/mockData';
import './CertificationForm.css';

const CATEGORIES = [
    'Cloud Computing', 'Cybersecurity', 'Project Management', 'DevOps',
    'Data Science & AI', 'Networking', 'Development', 'Other'
];

export default function CertificationForm({ mode = 'add' }) {
    const { currentUser } = useAuth();
    const { certifications, addCertification, updateCertification } = useCerts();
    const navigate = useNavigate();
    const { certId } = useParams();

    const isAdmin = currentUser?.role === 'admin';
    const backPath = isAdmin ? '/admin/certifications' : '/user/certifications';

    const existingCert = certId ? certifications.find(c => c.id === certId) : null;

    const [form, setForm] = useState({
        userId: isAdmin ? 'john' : currentUser?.id,
        name: '',
        issuer: '',
        certNumber: '',
        category: 'Cloud Computing',
        issueDate: '',
        expiryDate: '',
        credentialUrl: '',
        notes: '',
        renewalStatus: null,
    });

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (existingCert) {
            setForm({
                userId: existingCert.userId,
                name: existingCert.name,
                issuer: existingCert.issuer,
                certNumber: existingCert.certNumber,
                category: existingCert.category,
                issueDate: existingCert.issueDate,
                expiryDate: existingCert.expiryDate,
                credentialUrl: existingCert.credentialUrl || '',
                notes: existingCert.notes || '',
                renewalStatus: existingCert.renewalStatus,
            });
        }
    }, [existingCert]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const status = computeStatus(form.expiryDate);
        const certData = { ...form, status };

        if (existingCert) {
            updateCertification(existingCert.id, certData);
        } else {
            addCertification(certData);
        }
        setSuccess(true);
        setTimeout(() => navigate(backPath), 1200);
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">{existingCert ? 'Edit Certification' : 'Add Certification'}</h1>
                    <p className="page-subtitle">{existingCert ? 'Update certification details' : 'Record a new professional certification'}</p>
                </div>
                <button className="btn btn-outline" onClick={() => navigate(backPath)}>
                    ← Back
                </button>
            </div>

            <div className="card cert-form-card">
                {success && (
                    <div className="form-success">
                        ✅ Certification {existingCert ? 'updated' : 'added'} successfully! Redirecting...
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {isAdmin && (
                        <div className="form-group">
                            <label>Assign to User</label>
                            <select
                                name="userId"
                                className="form-control"
                                value={form.userId}
                                onChange={handleChange}
                                required
                            >
                                {USERS.filter(u => u.role === 'user').map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="form-row">
                        <div className="form-group">
                            <label>Certification Name *</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="e.g. AWS Solutions Architect"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Issuing Organization *</label>
                            <input
                                type="text"
                                name="issuer"
                                className="form-control"
                                placeholder="e.g. Amazon Web Services"
                                value={form.issuer}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Certificate Number</label>
                            <input
                                type="text"
                                name="certNumber"
                                className="form-control"
                                placeholder="e.g. AWS-SAA-2024"
                                value={form.certNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Category *</label>
                            <select
                                name="category"
                                className="form-control"
                                value={form.category}
                                onChange={handleChange}
                            >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Issue Date *</label>
                            <input
                                type="date"
                                name="issueDate"
                                className="form-control"
                                value={form.issueDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date *</label>
                            <input
                                type="date"
                                name="expiryDate"
                                className="form-control"
                                value={form.expiryDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Credential URL</label>
                        <input
                            type="url"
                            name="credentialUrl"
                            className="form-control"
                            placeholder="https://www.credly.com/..."
                            value={form.credentialUrl}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Notes</label>
                        <textarea
                            name="notes"
                            className="form-control"
                            rows={3}
                            placeholder="Additional notes..."
                            value={form.notes}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={() => navigate(backPath)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {existingCert ? '💾 Update Certification' : '+ Add Certification'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
