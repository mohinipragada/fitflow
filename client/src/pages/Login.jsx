// Login.jsx - the login page (/login).
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Logo from '../components/Logo';
import Alert from '../components/Alert';
import FormField from '../components/FormField';
import PasswordInput from '../components/PasswordInput';
import Icon from '../components/Icon';
import { useAuth } from '../hooks/useAuth';
import { validateLogin } from '../utils/validation';

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  // "State" = data this page remembers and re-draws when it changes
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null); // e.g. { type: 'info', text: '...' }

  // Already logged in? Go straight to Home.
  if (user) return <Navigate to="/home" replace />;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' }); // clear that field's error while typing
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    const newErrors = validateLogin(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Step 7: send the email + password to POST /api/auth/login,
    // and use rememberMe to decide where to keep the token.
    login(form.email.trim(), rememberMe);
    navigate('/home');
  }

  function showComingSoon(feature) {
    setMessage({ type: 'info', text: `${feature} is coming soon. Please use your email and password for now.` });
  }

  return (
    <AuthLayout>
      <div className="auth-header">
        <Logo className="auth-logo" />
        <div>
          <h1>Welcome back</h1>
          <p>Log in to keep your streak going.</p>
        </div>
      </div>

      {message && (
        <Alert type={message.type} onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      {/* noValidate turns off the browser's own pop-ups so we can show our own messages */}
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormField label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="you@example.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          error={errors.password}
          extra={
            <button type="button" className="link-button" onClick={() => showComingSoon('Password reset')}>
              Forgot password?
            </button>
          }
        >
          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password}
          />
        </FormField>

        <label className="checkbox-row">
          <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
          Remember me
        </label>

        <button type="submit" className="btn btn-primary btn-block btn-lg">
          Log in
          <Icon name="arrowRight" size={18} strokeWidth={2.4} />
        </button>
      </form>

      <div className="divider">or continue with</div>

      <div className="social-buttons">
        <button type="button" className="btn btn-secondary" onClick={() => showComingSoon('Google sign-in')}>
          Google
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => showComingSoon('Apple sign-in')}>
          Apple
        </button>
      </div>

      <p className="auth-switch">
        New to FitFlow? <Link to="/register">Create an account</Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
