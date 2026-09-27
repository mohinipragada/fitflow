// validation.js - checks form input BEFORE we send it anywhere.
// Each validate function returns an "errors" object, e.g. { email: 'Please enter your email.' }.
// An empty object {} means everything is valid.
// (The backend checks again later - never trust the frontend alone.)

// Simple email check: something@something.something
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateLogin({ email, password }) {
  const errors = {};

  if (!email.trim()) errors.email = 'Please enter your email.';
  else if (!isValidEmail(email.trim())) errors.email = 'Please enter a valid email address.';

  if (!password) errors.password = 'Please enter your password.';

  return errors;
}

export function validateRegister({ name, email, password, confirmPassword }) {
  const errors = {};

  if (!name.trim()) errors.name = 'Please enter your name.';
  else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!email.trim()) errors.email = 'Please enter your email.';
  else if (!isValidEmail(email.trim())) errors.email = 'Please enter a valid email address.';

  // Password rule: at least 8 characters, with at least one letter and one number
  if (!password) errors.password = 'Please create a password.';
  else if (password.length < 8) errors.password = 'Password must be at least 8 characters.';
  else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    errors.password = 'Password must contain at least one letter and one number.';
  }

  if (!confirmPassword) errors.confirmPassword = 'Please confirm your password.';
  else if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match.';

  return errors;
}

// Checks one number field. Returns an error message, or '' if the value is fine.
export function validateNumber(value, min, max) {
  if (value === '' || value === null || value === undefined) return 'This field is required.';
  const number = Number(value);
  if (!Number.isFinite(number)) return 'Please enter a number.';
  if (number < min || number > max) {
    return `Enter a number from ${min.toLocaleString('en-US')} to ${max.toLocaleString('en-US')}.`;
  }
  return '';
}
