// StatCard.jsx - a small card with an icon, a number and a progress bar
// (used for Calories and Active minutes on the Home page).
import Icon from './Icon';
import { formatNumber } from '../utils/format';

function StatCard({ icon, label, value, unit, goal }) {
  const percent = goal > 0 ? Math.min((value / goal) * 100, 100) : 0;

  return (
    <section className="card stat-card">
      <span className="stat-icon">
        <Icon name={icon} size={20} />
      </span>
      <span className="stat-label">{label}</span>
      <div className="stat-value">
        <span className="stat-number">{formatNumber(value)}</span>
        <span className="stat-unit">{unit}</span>
      </div>
      <div className="stat-track" aria-hidden="true">
        <div className="stat-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="stat-goal">
        Goal {formatNumber(goal)} {unit}
      </span>
    </section>
  );
}

export default StatCard;
