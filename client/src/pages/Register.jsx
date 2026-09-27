// Register.jsx - the sign-up page (/register).
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Logo from '../components/Logo';
import FormField from '../components/FormField';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../hooks/useAuth';
import { validateRegister } from '../utils/validation';

function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  if (user) return <Navigate to="/home" replace />;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validateRegister(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Step 7: send name, email and password to POST /api/auth/register
    register(form.name.trim(), form.email.trim());
    navigate('/home');
  }

  return (
    <AuthLayout>
      <div className="auth-header">
        <Logo className="auth-logo" />
        <div>
          <h1>Create your account</h1>
          <p>Start tracking your steps and workouts in under a minute.</p>
        </div>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormField label="Name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            className="input"
            placeholder="Your name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </FormField>

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

        <FormField label="Password" htmlFor="password" error={errors.password}>
          <PasswordInput
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            error={errors.password}
          />
          {!errors.password && <p className="field-hint">Use 8 or more characters with a letter and a number.</p>}
        </FormField>

        <FormField label="Confirm password" htmlFor="confirmPassword" error={errors.confirmPassword}>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Type it again"
            autoComplete="new-password"
            error={errors.confirmPassword}
          />
        </FormField>

        <button type="submit" className="btn btn-primary btn-block btn-lg">
          Create account
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
