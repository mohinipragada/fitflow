// Workouts.jsx - the workout page (/workouts).
// Left/top: a list of workouts with category filters.
// Right/below: the open workout with its exercises.
// (On phones only one of the two shows at a time.)
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import WorkoutCard from '../components/WorkoutCard';
import ExerciseItem from '../components/ExerciseItem';
import Alert from '../components/Alert';
import Icon from '../components/Icon';
import { formatLongDate } from '../utils/format';
import { sampleWorkouts } from '../services/sampleData';
import './Workouts.css';

const CATEGORIES = ['All', 'Strength', 'Cardio', 'Mobility'];

function Workouts() {
  // If we came from Home's "Start" button, it sends the workout id to open
  const location = useLocation();
  const startWorkoutId = location.state?.startWorkoutId ?? null;

  const [category, setCategory] = useState('All');
  const [selectedId, setSelectedId] = useState(startWorkoutId);
  // progress remembers which exercises are done in each started workout,
  // e.g. { 'full-body-burn': [0, 1] } means the first two are done
  const [progress, setProgress] = useState(startWorkoutId ? { [startWorkoutId]: [] } : {});
  const [finishedIds, setFinishedIds] = useState([]);
  const [message, setMessage] = useState('');

  // Step 9: load the workouts from GET /api/workouts instead of sample data
  const workouts = sampleWorkouts;
  const visibleWorkouts = category === 'All' ? workouts : workouts.filter((w) => w.category === category);
  const selected = workouts.find((w) => w.id === selectedId) || null;

  // Values for the open workout
  const doneList = selected ? progress[selected.id] || [] : [];
  const isFinished = selected ? finishedIds.includes(selected.id) : false;
  const allDone = selected ? doneList.length === selected.exercises.length : false;
  // The "current" exercise is the first one that isn't done yet
  const currentIndex = selected ? selected.exercises.findIndex((_, index) => !doneList.includes(index)) : -1;

  // Start (or resume) a workout
  function openWorkout(id) {
    // Step 9: POST /api/workouts/:id/start
    setProgress((previous) => (previous[id] ? previous : { ...previous, [id]: [] }));
    setSelectedId(id);
    setMessage('');
  }

  // Tick or un-tick one exercise
  function toggleExercise(index) {
    const next = doneList.includes(index) ? doneList.filter((i) => i !== index) : [...doneList, index];
    setProgress({ ...progress, [selected.id]: next });
  }

  // The big button: mark the current exercise as done
  function completeCurrentExercise() {
    if (currentIndex !== -1) toggleExercise(currentIndex);
  }

  function finishWorkout() {
    // Step 9: POST /api/workouts/:id/complete saves this in WorkoutHistory
    setFinishedIds([...finishedIds, selected.id]);
    setMessage(`Great job! You finished ${selected.name}.`);
  }

  function restartWorkout() {
    setProgress({ ...progress, [selected.id]: [] });
    setFinishedIds(finishedIds.filter((id) => id !== selected.id));
    setMessage('');
  }

  // Which big button to show on the open workout
  let actionButton;
  if (isFinished) {
    actionButton = (
      <button type="button" className="btn btn-secondary" onClick={restartWorkout}>
        Do it again
      </button>
    );
  } else if (allDone) {
    actionButton = (
      <button type="button" className="btn btn-primary" onClick={finishWorkout}>
        <Icon name="check" size={18} strokeWidth={2.6} />
        Finish workout
      </button>
    );
  } else {
    actionButton = (
      <button type="button" className="btn btn-primary" onClick={completeCurrentExercise}>
        <Icon name="check" size={18} strokeWidth={2.6} />
        Complete exercise
      </button>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">{formatLongDate()}</p>
        <h1 className="page-title">Workouts</h1>
      </header>

      <div className={`workouts-layout ${selected ? 'has-selection' : ''}`}>
        {/* ---------- List of workouts ---------- */}
        <div className="workout-list-panel">
          <div className="chips" role="group" aria-label="Filter workouts">
            {CATEGORIES.map((name) => (
              <button
                key={name}
                type="button"
                className="chip"
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {visibleWorkouts.length === 0 ? (
            <div className="card empty-state">
              <p>No {category.toLowerCase()} workouts yet.</p>
            </div>
          ) : (
            <ul className="workout-list">
              {visibleWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  doneCount={(progress[workout.id] || []).length}
                  isStarted={Boolean(progress[workout.id])}
                  isFinished={finishedIds.includes(workout.id)}
                  isSelected={workout.id === selectedId}
                  onOpen={() => openWorkout(workout.id)}
                />
              ))}
            </ul>
          )}
        </div>

        {/* ---------- The open workout ---------- */}
        <div className="workout-detail-panel">
          {selected ? (
            <section className="workout-detail" aria-label={selected.name}>
              <button type="button" className="back-button" onClick={() => setSelectedId(null)}>
                <Icon name="chevronLeft" size={20} />
                All workouts
              </button>

              <div className="active-workout">
                <div className="active-workout-info">
                  <h2 className="active-workout-name">{selected.name}</h2>
                  <span className="active-workout-meta">
                    {selected.duration} min · {selected.exercises.length} exercises · {doneList.length} of{' '}
                    {selected.exercises.length} done
                  </span>
                </div>
                {actionButton}
              </div>

              {message && (
                <Alert type="success" onClose={() => setMessage('')}>
                  {message}
                </Alert>
              )}

              <ol className="exercise-list" aria-label="Exercises">
                {selected.exercises.map((exercise, index) => (
                  <ExerciseItem
                    key={exercise.name}
                    exercise={exercise}
                    number={index + 1}
                    isDone={doneList.includes(index)}
                    isCurrent={!isFinished && index === currentIndex}
                    disabled={isFinished}
                    onToggle={() => toggleExercise(index)}
                  />
                ))}
              </ol>
            </section>
          ) : (
            <div className="card empty-state">
              <Icon name="workout" size={32} />
              <p>Pick a workout to see its exercises.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
