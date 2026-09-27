// WorkoutCard.jsx - one workout in the list (name, time, exercises, status).
// The button says Start, Resume or View depending on the user's progress.
import Icon from './Icon';

function WorkoutCard({ workout, doneCount, isStarted, isFinished, isSelected, onOpen }) {
  const total = workout.exercises.length;

  let buttonLabel = 'Start';
  let status = 'Not started';
  if (isFinished) {
    buttonLabel = 'View';
    status = 'Completed';
  } else if (isStarted) {
    buttonLabel = 'Resume';
    status = `${doneCount} of ${total} done`;
  }

  return (
    <li className={`card workout-card ${isSelected ? 'is-selected' : ''}`}>
      <div className="workout-card-info">
        <div className="workout-card-top">
          <h2 className="workout-name">{workout.name}</h2>
          <span className="tag">{workout.category}</span>
        </div>
        <span className="workout-meta">
          {workout.duration} min · {total} exercises
        </span>
        <span className={`workout-status ${isStarted || isFinished ? 'is-active' : ''}`}>{status}</span>
      </div>
      <button
        type="button"
        className={`btn ${isFinished ? 'btn-secondary' : 'btn-primary'}`}
        onClick={onOpen}
        aria-label={`${buttonLabel} ${workout.name}`}
      >
        {!isFinished && <Icon name="play" size={16} />}
        {buttonLabel}
      </button>
    </li>
  );
}

export default WorkoutCard;
