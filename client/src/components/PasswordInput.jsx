// PasswordInput.jsx - a password box with an eye button to show or hide the text.
import { useState } from 'react';
import Icon from './Icon';

function PasswordInput({ id, name, value, onChange, placeholder, autoComplete, error }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-wrap">
      <input
        id={id}
        name={name}
        // Switching the type between "password" and "text" is what shows/hides it
        type={visible ? 'text' : 'password'}
        className="input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        <Icon name={visible ? 'eyeOff' : 'eye'} size={20} />
      </button>
    </div>
  );
}

export default PasswordInput;
