// AuthLayout.jsx - the frame for the Login and Register pages.
// Phones see just the form. Desktops also get a welcome panel on the left.
import Logo from '../components/Logo';
import Icon from '../components/Icon';
import ProgressRing from '../components/ProgressRing';
import './AuthLayout.css';

const features = [
  'Daily steps, calories and active minutes',
  'Guided workouts, one exercise at a time',
  'Weekly progress charts from your own data',
];

function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <aside className="auth-brand">
        <Logo />
        <div className="auth-brand-body">
          <h2>Move more. Track every step.</h2>
          <p>FitFlow keeps your activity, workouts and weekly progress in one place.</p>
          <ul className="auth-features">
            {features.map((feature) => (
              <li key={feature}>
                <Icon name="check" size={18} strokeWidth={2.6} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        {/* A decorative preview of the Home screen's step ring */}
        <div className="auth-preview" aria-hidden="true">
          <ProgressRing value={7842} max={10000}>
            <span className="auth-preview-value">7,842</span>
            <span className="auth-preview-label">steps today</span>
          </ProgressRing>
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-card">{children}</div>
      </main>
    </div>
  );
}

export default AuthLayout;
