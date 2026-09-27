// Progress.jsx - the weekly progress page (/progress).
// Shows a Monday-to-Sunday bar chart plus summary numbers for the week.
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { formatMinutes, formatNumber, formatShort, formatWeekRange, getWeekdayIndex } from '../utils/format';
import { sampleWeek } from '../services/sampleData';
import './Progress.css';

const METRICS = [
  { key: 'steps', label: 'Steps', unit: 'steps' },
  { key: 'calories', label: 'Calories', unit: 'kcal' },
  { key: 'minutes', label: 'Minutes', unit: 'min' },
];

const DAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Adds up a list of numbers: sum([1, 2, 3]) -> 6
function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function Progress() {
  const { user } = useAuth();
  const [metricKey, setMetricKey] = useState('steps');
  const metric = METRICS.find((m) => m.key === metricKey);

  // Step 10: load this from GET /api/progress/weekly instead of sample data
  const week = sampleWeek;

  const todayIndex = getWeekdayIndex();
  const daysSoFar = todayIndex + 1; // e.g. on Wednesday, 3 days have passed
  const values = week[metricKey];
  const total = sum(values);

  // Compare this week's DAILY AVERAGE with last week's,
  // so a week that isn't finished yet is still a fair comparison.
  const thisWeekAverage = total / daysSoFar;
  const lastWeekAverage = week.lastWeek[metricKey] / 7;
  const change = lastWeekAverage > 0 ? Math.round(((thisWeekAverage - lastWeekAverage) / lastWeekAverage) * 100) : 0;

  // Summary cards
  const stepGoal = user.dailyStepGoal;
  const averageSteps = sum(week.steps) / daysSoFar;
  const goalDays = week.steps.filter((steps) => steps >= stepGoal).length;
  const totalCalories = sum(week.calories);
  const totalMinutes = sum(week.minutes);

  // Chart scale: the tallest bar (or the goal line) reaches about 87% of the chart height
  const showGoal = metricKey === 'steps';
  const chartMax = Math.max(...values, showGoal ? stepGoal : 0, 1) * 1.15;
  const toPercent = (value) => `${(value / chartMax) * 100}%`;

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">This week · {formatWeekRange()}</p>
        <h1 className="page-title">Progress</h1>
      </header>

      <div className="segmented" role="group" aria-label="Metric">
        {METRICS.map((m) => (
          <button key={m.key} type="button" aria-pressed={metricKey === m.key} onClick={() => setMetricKey(m.key)}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="progress-grid">
        <section className="card chart-card" aria-label={`Weekly ${metric.label.toLowerCase()} chart`}>
          <div className="chart-head">
            <div className="chart-total-wrap">
              <span className="chart-total">{formatNumber(total)}</span>
              <span className="chart-caption">{metric.unit} this week</span>
            </div>
            <span className={`change-badge ${change < 0 ? 'is-down' : ''}`}>
              {change >= 0 ? '+' : ''}
              {change}% vs last week
            </span>
          </div>

          {total === 0 ? (
            <div className="empty-state chart-empty">
              <p>No activity logged this week yet. Update today's activity on the Home page to see it here.</p>
            </div>
          ) : (
            <>
              <div className="chart">
                {showGoal && (
                  <div className="chart-goal" style={{ bottom: toPercent(stepGoal) }} aria-hidden="true">
                    <span>Goal {formatShort(stepGoal)}</span>
                  </div>
                )}
                {values.map((value, index) => (
                  <div key={DAY_NAMES[index]} className={`chart-column ${index === todayIndex ? 'is-today' : ''}`}>
                    {index === todayIndex && value > 0 && (
                      <span className="chart-bubble" style={{ bottom: `calc(${toPercent(value)} + 6px)` }} aria-hidden="true">
                        {formatShort(value)}
                      </span>
                    )}
                    <div
                      className="chart-bar"
                      style={{ height: toPercent(value) }}
                      title={`${DAY_NAMES[index]}: ${formatNumber(value)} ${metric.unit}`}
                    />
                    {/* Hidden text so screen readers can read the chart */}
                    <span className="sr-only">
                      {DAY_NAMES[index]}: {formatNumber(value)} {metric.unit}
                    </span>
                  </div>
                ))}
              </div>
              <div className="chart-labels" aria-hidden="true">
                {DAY_LETTERS.map((letter, index) => (
                  <span key={DAY_NAMES[index]} className={index === todayIndex ? 'is-today' : ''}>
                    {letter}
                  </span>
                ))}
              </div>
            </>
          )}
        </section>

        <div className="summary-grid">
          <section className="card summary-card">
            <span className="summary-label">Daily average</span>
            <span className="summary-value">
              {formatNumber(averageSteps)} <small>steps</small>
            </span>
          </section>
          <section className="card summary-card">
            <span className="summary-label">Goal reached</span>
            <span className="summary-value">
              {goalDays} <small>of {daysSoFar} days</small>
            </span>
          </section>
          <section className="card summary-card">
            <span className="summary-label">Calories burned</span>
            <span className="summary-value">
              {formatNumber(totalCalories)} <small>kcal</small>
            </span>
          </section>
          <section className="card summary-card">
            <span className="summary-label">Active time</span>
            <span className="summary-value">{formatMinutes(totalMinutes)}</span>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Progress;
