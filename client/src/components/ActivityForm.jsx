// ActivityForm.jsx - the form on the Home page for updating today's
// steps, calories and active minutes.
import { useState } from 'react';
import FormField from './FormField';
import { validateNumber } from '../utils/validation';

// Each field with its allowed range
const fields = [
  { name: 'steps', label: 'Steps', min: 0, max: 100000 },
  { name: 'calories', label: 'Calories (kcal)', min: 0, max: 10000 },
  { name: 'activeMinutes', label: 'Active min', min: 0, max: 1440 },
];

function ActivityForm({ initialValues, onSave, onCancel }) {
  // Inputs always give us text, so we keep the values as strings while typing
  const [values, setValues] = useState({
    steps: String(initialValues.steps),
    calories: String(initialValues.calories),
    activeMinutes: String(initialValues.activeMinutes),
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Check every field and collect the errors
    const newErrors = {};
    fields.forEach((field) => {
      const error = validateNumber(values[field.name], field.min, field.max);
      if (error) newErrors[field.name] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Turn the text back into numbers before saving
    onSave({
      steps: Number(values.steps),
      calories: Number(values.calories),
      activeMinutes: Number(values.activeMinutes),
    });
  }

  return (
    <form className="card activity-form" onSubmit={handleSubmit} noValidate>
      <h2 className="card-title">Update today's activity</h2>
      <div className="activity-form-fields">
        {fields.map((field) => (
          <FormField key={field.name} label={field.label} htmlFor={`activity-${field.name}`} error={errors[field.name]}>
            <input
              id={`activity-${field.name}`}
              name={field.name}
              type="number"
              inputMode="numeric"
              min={field.min}
              max={field.max}
              className="input"
              value={values[field.name]}
              onChange={handleChange}
              aria-invalid={errors[field.name] ? 'true' : 'false'}
              aria-describedby={errors[field.name] ? `activity-${field.name}-error` : undefined}
            />
          </FormField>
        ))}
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

export default ActivityForm;
