// BottomNav.jsx - the main navigation.
// On phones and tablets it sits at the bottom of the screen (like the design).
// On desktop, CSS turns it into a sidebar on the left.
//
// NavLink is React Router's link that knows when its page is open:
// it adds the "active" class, which we colour green.
import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import Logo from './Logo';

const links = [
  { to: '/home', label: 'Home', icon: 'home' },
  { to: '/workouts', label: 'Workout', icon: 'workout' },
  { to: '/progress', label: 'Progress', icon: 'progress' },
  { to: '/profile', label: 'Profile', icon: 'profile' },
];

function BottomNav() {
  return (
    <nav className="nav" aria-label="Main">
      <Logo size={36} className="nav-brand" />
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} className="nav-link">
              <Icon name={link.icon} size={24} />
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
