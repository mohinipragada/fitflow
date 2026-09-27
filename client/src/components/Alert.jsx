// Alert.jsx - a coloured message box for success, error and info messages.
// Usage: <Alert type="error">Wrong password.</Alert>
import Icon from './Icon';

const icons = { success: 'check', error: 'alert', info: 'info' };

function Alert({ type = 'info', children, onClose }) {
  return (
    // role="alert" makes screen readers read errors out loud straight away
    <div className={`alert alert-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <Icon name={icons[type]} size={18} />
      <p className="alert-text">{children}</p>
      {onClose && (
        <button type="button" className="alert-close" onClick={onClose} aria-label="Dismiss message">
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
}

export default Alert;
