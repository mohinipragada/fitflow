// ExerciseItem.jsx - one exercise row in a workout.
// Tapping the row marks it as done (or not done).
import Icon from './Icon';

function ExerciseItem({ exercise, number, isDone, isCurrent, disabled, onToggle }) {
  // Show the reps if there are any, otherwise the exercise type (e.g. "Warm-up")
  const detail = exercise.reps || exercise.type;

  const classes = ['exercise'];
  if (isDone) classes.push('is-done');
  if (isCurrent) classes.push('is-current');

  return (
    <li>
      <button type="button" className={classes.join(' ')} onClick={onToggle} disabled={disabled} aria-pressed={isDone}>
        <span className="exercise-badge">{isDone ? <Icon name="check" size={18} strokeWidth={2.6} /> : number}</span>
        <span className="exercise-info">
          <span className="exercise-name">{exercise.name}</span>
          <span className="exercise-detail">
            {detail}
            {isCurrent && ' · Up now'}
          </span>
        </span>
        <span className="exercise-time">{exercise.duration} min</span>
      </button>
    </li>
  );
}

export default ExerciseItem;
