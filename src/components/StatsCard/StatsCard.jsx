import './StatsCard.css';

export default function StatsCard({ icon, value, label, color }) {
    return (
        <div className="stats-card" style={{ '--card-color': color }}>
            <div className="stats-card-bar" />
            <div className="stats-card-body">
                <span className="stats-icon">{icon}</span>
                <div>
                    <div className="stats-value">{value}</div>
                    <div className="stats-label">{label}</div>
                </div>
            </div>
        </div>
    );
}
