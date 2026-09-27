// NotFound.jsx - shown when the URL doesn't match any page.
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

function NotFound() {
  return (
    <main className="not-found">
      <Logo />
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/home" className="btn btn-primary">
        Go to Home
      </Link>
    </main>
  );
}

export default NotFound;
