// ProfileForm.jsx - the "Edit profile" form (name, height, weight, age).
import { useState } from 'react';
import FormField from './FormField';
import { validateNumber } from '../utils/validation';

function ProfileForm({ user, onSave, onCancel }) {
  const [values, setValues] = useState({
    name: user.name,
    height: String(user.height),
    weight: String(user.weight),
    age: String(user.age),
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    if (values.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters.';
    const heightError = validateNumber(values.height, 50, 250);
    if (heightError) newErrors.height = heightError;
    const weightError = validateNumber(values.weight, 20, 300);
    if (weightError) newErrors.weight = weightError;
    const ageError = validateNumber(values.age, 10, 120);
    if (ageError) newErrors.age = ageError;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave({
      name: values.name.trim(),
      height: Number(values.height),
      weight: Number(values.weight),
      age: Number(values.age),
    });
  }

  // A small helper so the three number inputs don't repeat the same code
  function numberInput(name) {
    return (
      <input
        id={`profile-${name}`}
        name={name}
        type="number"
        inputMode="decimal"
        className="input"
        value={values[name]}
        onChange={handleChange}
        aria-invalid={errors[name] ? 'true' : 'false'}
        aria-describedby={errors[name] ? `profile-${name}-error` : undefined}
      />
    );
  }

  return (
    <form className="card profile-form" onSubmit={handleSubmit} noValidate>
      <h2 className="card-title">Edit profile</h2>
      <FormField label="Name" htmlFor="profile-name" error={errors.name}>
        <input
          id="profile-name"
          name="name"
          className="input"
          value={values.name}
          onChange={handleChange}
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'profile-name-error' : undefined}
        />
      </FormField>
      <div className="profile-form-numbers">
        <FormField label="Height (cm)" htmlFor="profile-height" error={errors.height}>
          {numberInput('height')}
        </FormField>
        <FormField label="Weight (kg)" htmlFor="profile-weight" error={errors.weight}>
          {numberInput('weight')}
        </FormField>
        <FormField label="Age" htmlFor="profile-age" error={errors.age}>
          {numberInput('age')}
        </FormField>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save changes
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
