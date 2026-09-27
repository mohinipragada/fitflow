// Logo.jsx - the FitFlow logo: a green square with a pulse line, plus the name.
import Icon from './Icon';

function Logo({ size = 44, showName = true, className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <span className="logo-mark" style={{ width: size, height: size }}>
        <Icon name="pulse" size={Math.round(size * 0.55)} strokeWidth={2.4} />
      </span>
      {showName && <span className="logo-name">FitFlow</span>}
    </span>
  );
}

export default Logo;
