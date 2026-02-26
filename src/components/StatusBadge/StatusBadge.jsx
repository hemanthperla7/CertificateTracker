import './StatusBadge.css';

const STATUS_CONFIG = {
    active: { label: 'ACTIVE', className: 'badge-active' },
    expiring: { label: 'EXPIRING', className: 'badge-expiring' },
    expired: { label: 'EXPIRED', className: 'badge-expired' },
    renewal_pending: { label: 'RENEWAL PENDING', className: 'badge-renewal' },
};

export default function StatusBadge({ status }) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.active;
    return (
        <span className={`status-badge ${config.className}`}>
            <span className="badge-dot" />
            {config.label}
        </span>
    );
}
