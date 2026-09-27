// Home.jsx - the dashboard (/home): today's steps, calories, active minutes
// and the next workout.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressRing from '../components/ProgressRing';
import StatCard from '../components/StatCard';
import ActivityForm from '../components/ActivityForm';
import Avatar from '../components/Avatar';
import Alert from '../components/Alert';
import Icon from '../components/Icon';
import { useAuth } from '../hooks/useAuth';
import { formatLongDate, formatNumber, getGreeting } from '../utils/format';
import { sampleActivity, sampleWorkouts } from '../services/sampleData';
import './Home.css';

// Daily goals for calories and active minutes (the step goal comes from the user's settings)
const CALORIE_GOAL = 600;
const MINUTES_GOAL = 60;

function Home() {
  const { user } = useAuth();

  // Step 8: load today's activity from GET /api/activity instead of sample data
  const [activity, setActivity] = useState(sampleActivity);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Numbers for the step ring
  const stepGoal = user.dailyStepGoal;
  const percent = Math.round((activity.steps / stepGoal) * 100);
  const remaining = Math.max(stepGoal - activity.steps, 0);

  const firstName = user.name.split(' ')[0];
  const nextWorkout = sampleWorkouts[0];

  function handleSave(newActivity) {
    // Step 8: send the new numbers to the backend (POST /api/activity)
    setActivity(newActivity);
    setIsEditing(false);
    setMessage('Activity updated.');
  }

  return (
    <div className="page">
      <header className="home-header">
        <div className="page-header">
          <p className="eyebrow">{formatLongDate()}</p>
          <h1 className="home-title">
            {getGreeting()}, {firstName}
          </h1>
        </div>
        <Link to="/profile" className="avatar-link" aria-label="Open profile">
          <Avatar name={user.name} image={user.profileImage} size={44} />
        </Link>
      </header>

      {message && (
        <Alert type="success" onClose={() => setMessage('')}>
          {message}
        </Alert>
      )}

      <div className="home-grid">
        <section className="card steps-card" aria-label="Steps today">
          <ProgressRing value={activity.steps} max={stepGoal}>
            <Icon name="steps" size={22} className="ring-icon" />
            <span className="ring-value">{formatNumber(activity.steps)}</span>
            <span className="ring-label">of {formatNumber(stepGoal)} steps</span>
          </ProgressRing>
          <p className="steps-summary">
            {remaining > 0 ? (
              <>
                <strong>{percent}% of goal</strong> · {formatNumber(remaining)} to go
              </>
            ) : (
              <strong>Goal reached! {percent}% of your daily goal</strong>
            )}
          </p>
        </section>

        <div className="home-side">
          <div className="stat-grid">
            <StatCard icon="flame" label="Calories" value={activity.calories} unit="kcal" goal={CALORIE_GOAL} />
            <StatCard icon="timer" label="Active minutes" value={activity.activeMinutes} unit="min" goal={MINUTES_GOAL} />
          </div>

          {isEditing ? (
            <ActivityForm initialValues={activity} onSave={handleSave} onCancel={() => setIsEditing(false)} />
          ) : (
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={() => {
                setIsEditing(true);
                setMessage('');
              }}
            >
              <Icon name="plus" size={18} />
              Update today's activity
            </button>
          )}

          <section className="card up-next">
            <div className="up-next-info">
              <span className="section-label">Up next</span>
              <span className="up-next-title">{nextWorkout.name}</span>
              <span className="up-next-meta">
                {nextWorkout.duration} min · {nextWorkout.exercises.length} exercises
              </span>
            </div>
            {/* "state" passes the workout id to the Workouts page so it opens straight away */}
            <Link to="/workouts" state={{ startWorkoutId: nextWorkout.id }} className="btn btn-primary">
              <Icon name="play" size={16} />
              Start
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
