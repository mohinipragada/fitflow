// ProgressRing.jsx - the circular progress bar on the Home page.
//
// How it works: an SVG circle's outline can be drawn as a "dash".
// strokeDasharray = the full length of the circle (its circumference)
// strokeDashoffset = how much of that dash to hide.
// Hiding (1 - percent) of the circle leaves exactly "percent" of the ring visible.

const SIZE = 200; // drawing size; the ring is scaled with CSS
const STROKE = 16;

function ProgressRing({ value, max, children }) {
  const radius = (SIZE - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = max > 0 ? Math.min(value / max, 1) : 0; // never more than a full circle
  const offset = circumference * (1 - percent);

  return (
    <div className="ring">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        {/* Grey track behind */}
        <circle cx={SIZE / 2} cy={SIZE / 2} r={radius} fill="none" stroke="var(--border)" strokeWidth={STROKE} />
        {/* Green progress on top, rotated so it starts at the top */}
        <circle
          className="ring-progress"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      {/* Whatever we put inside <ProgressRing>...</ProgressRing> shows in the middle */}
      <div className="ring-content">{children}</div>
    </div>
  );
}

export default ProgressRing;
