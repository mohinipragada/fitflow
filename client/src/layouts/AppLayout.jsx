// AppLayout.jsx - the frame shared by every logged-in page:
// the page content plus the navigation.
// <Outlet /> is where React Router puts the current page (Home, Workouts, ...).
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './AppLayout.css';

function AppLayout() {
  return (
    <div className="app-shell">
      <BottomNav />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
