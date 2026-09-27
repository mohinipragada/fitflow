// format.js - small helpers that turn raw numbers and dates into the text we show.
// Keeping them in one place means every page formats things the same way.

// 7842 -> "7,842"
export function formatNumber(value) {
  return Math.round(value || 0).toLocaleString('en-US');
}

// 7842 -> "7.8k", 10000 -> "10k" (short labels on the chart)
export function formatShort(value) {
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(Math.round(value));
}

// 278 -> "4h 38m"
export function formatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

// -> "Sunday, Sep 27"
export function formatLongDate(date = new Date()) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

// "Good morning" / "Good afternoon" / "Good evening" depending on the time
export function getGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Monday = 0 ... Sunday = 6
// (JavaScript's getDay() starts the week on Sunday = 0, so we shift it.)
export function getWeekdayIndex(date = new Date()) {
  return (date.getDay() + 6) % 7;
}

// -> "Sep 21 – 27" (or "Sep 29 – Oct 5" when the week crosses a month)
export function formatWeekRange(date = new Date()) {
  const monday = new Date(date);
  monday.setDate(date.getDate() - getWeekdayIndex(date));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const start = monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const sameMonth = monday.getMonth() === sunday.getMonth();
  const end = sunday.toLocaleDateString('en-US', sameMonth ? { day: 'numeric' } : { month: 'short', day: 'numeric' });
  return `${start} – ${end}`;
}

// Height and weight are always stored in metric (cm and kg).
// These two functions convert them for display when the user picks imperial units.
export function formatHeight(cm, units) {
  if (units === 'imperial') {
    const totalInches = Math.round(cm / 2.54);
    return { value: `${Math.floor(totalInches / 12)}′ ${totalInches % 12}″`, unit: '' };
  }
  return { value: String(cm), unit: 'cm' };
}

export function formatWeight(kg, units) {
  if (units === 'imperial') {
    return { value: String(Math.round(kg * 2.20462)), unit: 'lb' };
  }
  return { value: String(kg), unit: 'kg' };
}
