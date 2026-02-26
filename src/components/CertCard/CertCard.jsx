import { getDaysLeft, formatDate } from '../../data/mockData';
import StatusBadge from '../StatusBadge/StatusBadge';
import './CertCard.css';

export default function CertCard({ cert, onView, onRenew, onEdit }) {
    const daysLeft = getDaysLeft(cert.expiryDate);
    const absDay = Math.abs(daysLeft);
    const progress = Math.min(100, Math.max(0, (daysLeft / 365) * 100));

    const progressColor =
        cert.status === 'expired'
            ? '#EF4444'
            : cert.status === 'expiring'
                ? '#F59E0B'
                : '#22C55E';

    const borderColor =
        cert.status === 'expired'
            ? '#EF4444'
            : cert.status === 'expiring'
                ? '#F59E0B'
                : cert.status === 'renewal_pending'
                    ? '#38BDF8'
                    : '#22C55E';

    return (
        <div className="cert-card" style={{ '--border-color': borderColor }}>
            <div className="cert-card-top">
                <div>
                    <div className="cert-card-name">{cert.name}</div>
                    <div className="cert-card-issuer">📋 {cert.issuer}</div>
                </div>
                <StatusBadge status={cert.status} />
            </div>

            <div className="cert-card-id">🔑 {cert.certNumber}</div>

            <div className="cert-card-dates">
                <div>
                    <span className="cert-date-label">Issued</span>
                    <span className="cert-date-value">{formatDate(cert.issueDate)}</span>
                </div>
                <div>
                    <span className="cert-date-label">Expires</span>
                    <span
                        className="cert-date-value"
                        style={{
                            color:
                                cert.status === 'expired'
                                    ? 'var(--danger)'
                                    : cert.status === 'expiring'
                                        ? '#D97706'
                                        : 'var(--text-dark)',
                        }}
                    >
                        {formatDate(cert.expiryDate)}
                    </span>
                </div>
            </div>

            <div className="cert-card-progress">
                <div className="cert-progress-info">
                    <span className="cert-days-label">
                        {cert.status === 'expired'
                            ? `⏱ Expired ${absDay}d ago`
                            : cert.status === 'expiring'
                                ? `⚠ ${daysLeft} days left`
                                : `${daysLeft} days left`}
                    </span>
                    <span className="cert-category">{cert.category}</span>
                </div>
                <div className="cert-progress-bar">
                    <div
                        className="cert-progress-fill"
                        style={{ width: `${progress}%`, background: progressColor }}
                    />
                </div>
            </div>

            <div className="cert-card-actions">
                <button className="btn btn-outline btn-sm" onClick={() => onView && onView(cert)}>
                    👁 View
                </button>
                {(cert.status === 'expired' || cert.status === 'expiring') && (
                    <button className="btn btn-warning btn-sm" onClick={() => onRenew && onRenew(cert)}>
                        🔄 Renew
                    </button>
                )}
                <button className="btn-icon" onClick={() => onEdit && onEdit(cert)}>✏️</button>
            </div>
        </div>
    );
}
