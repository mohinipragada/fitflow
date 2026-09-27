// Profile.jsx - the profile and settings page (/profile).
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Alert from '../components/Alert';
import Icon from '../components/Icon';
import ProfileForm from '../components/ProfileForm';
import { useAuth } from '../hooks/useAuth';
import { formatHeight, formatNumber, formatWeight } from '../utils/format';
import { validateNumber } from '../utils/validation';
import './Profile.css';

// A small form for changing the daily step goal, shown inside the settings list
function StepGoalForm({ currentGoal, onSave, onCancel }) {
  const [value, setValue] = useState(String(currentGoal));
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const problem = validateNumber(value, 1000, 100000);
    if (problem) {
      setError(problem);
      return;
    }
    onSave(Number(value));
  }

  return (
    <form className="setting-edit" onSubmit={handleSubmit} noValidate>
      <label htmlFor="step-goal">Daily step goal</label>
      <div className="setting-edit-row">
        <input
          id="step-goal"
          type="number"
          inputMode="numeric"
          step="500"
          className="input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'step-goal-error' : undefined}
          autoFocus
        />
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
      {error && (
        <p className="field-error" id="step-goal-error">
          {error}
        </p>
      )}
    </form>
  );
}

// An on/off switch row, e.g. "Notifications"
function SwitchRow({ label, checked, onChange }) {
  return (
    <label className="setting-row">
      <span className="setting-row-label">{label}</span>
      <span className="switch">
        <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
        <span />
      </span>
    </label>
  );
}

function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [message, setMessage] = useState(null);

  const height = formatHeight(user.height, user.units);
  const weight = formatWeight(user.weight, user.units);

  function saveProfile(changes) {
    // Step 11: PUT /api/users/profile
    updateUser(changes);
    setIsEditing(false);
    setMessage({ type: 'success', text: 'Profile updated.' });
  }

  function changeSetting(changes, text) {
    // Step 11: PUT /api/users/settings
    updateUser(changes);
    setMessage({ type: 'success', text });
  }

  function saveGoal(goal) {
    changeSetting({ dailyStepGoal: goal }, `Daily step goal set to ${formatNumber(goal)}.`);
    setIsEditingGoal(false);
  }

  function handleSignOut() {
    logout();
    navigate('/login');
  }

  return (
    <div className="page">
      <h1 className="sr-only">Profile</h1>

      {message && (
        <Alert type={message.type} onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <div className="profile-grid">
        {/* ---------- Left: who you are ---------- */}
        <div className="profile-side">
          <header className="profile-header">
            <Avatar name={user.name} image={user.profileImage} size={88} />
            <div>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>
            </div>
            {!isEditing && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setIsEditing(true);
                  setMessage(null);
                }}
              >
                <Icon name="edit" size={16} />
                Edit profile
              </button>
            )}
          </header>

          {isEditing ? (
            <ProfileForm user={user} onSave={saveProfile} onCancel={() => setIsEditing(false)} />
          ) : (
            <section className="card body-stats" aria-label="Body stats">
              <div>
                <span className="body-stat-value">
                  {height.value} <small>{height.unit}</small>
                </span>
                <span className="body-stat-label">Height</span>
              </div>
              <div>
                <span className="body-stat-value">
                  {weight.value} <small>{weight.unit}</small>
                </span>
                <span className="body-stat-label">Weight</span>
              </div>
              <div>
                <span className="body-stat-value">{user.age}</span>
                <span className="body-stat-label">Age</span>
              </div>
            </section>
          )}
        </div>

        {/* ---------- Right: settings ---------- */}
        <div className="profile-main">
          <section className="settings" aria-labelledby="settings-heading">
            <h2 id="settings-heading" className="section-label">
              Settings
            </h2>
            <div className="card settings-list">
              {isEditingGoal ? (
                <StepGoalForm currentGoal={user.dailyStepGoal} onSave={saveGoal} onCancel={() => setIsEditingGoal(false)} />
              ) : (
                <button type="button" className="setting-row" onClick={() => setIsEditingGoal(true)}>
                  <span className="setting-row-label">Daily step goal</span>
                  <span className="setting-row-value">{formatNumber(user.dailyStepGoal)}</span>
                  <Icon name="chevronRight" size={18} className="setting-row-chevron" />
                </button>
              )}

              <button
                type="button"
                className="setting-row"
                onClick={() => {
                  const units = user.units === 'metric' ? 'imperial' : 'metric';
                  changeSetting({ units }, `Units changed to ${units}.`);
                }}
              >
                <span className="setting-row-label">Units</span>
                <span className="setting-row-value">{user.units === 'metric' ? 'Metric' : 'Imperial'}</span>
                <Icon name="chevronRight" size={18} className="setting-row-chevron" />
              </button>

              <SwitchRow
                label="Notifications"
                checked={user.notifications}
                onChange={(on) => changeSetting({ notifications: on }, `Notifications turned ${on ? 'on' : 'off'}.`)}
              />
              <SwitchRow
                label="Dark mode"
                checked={user.darkMode}
                onChange={(on) => changeSetting({ darkMode: on }, `Dark mode turned ${on ? 'on' : 'off'}.`)}
              />

              <button
                type="button"
                className="setting-row"
                onClick={() => setMessage({ type: 'info', text: 'Connecting apps like Google Fit is coming soon.' })}
              >
                <span className="setting-row-label">Connected apps</span>
                <span className="setting-row-value">None</span>
                <Icon name="chevronRight" size={18} className="setting-row-chevron" />
              </button>

              <button
                type="button"
                className="setting-row"
                onClick={() =>
                  setMessage({
                    type: 'info',
                    text: 'Your data is stored in your own FitFlow account and is only used to show your progress.',
                  })
                }
              >
                <span className="setting-row-label">Privacy &amp; data</span>
                <Icon name="chevronRight" size={18} className="setting-row-chevron" />
              </button>
            </div>
          </section>

          <button type="button" className="btn btn-danger btn-block" onClick={handleSignOut}>
            <Icon name="logout" size={18} />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
