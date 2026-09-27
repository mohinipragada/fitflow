// App.jsx - the list of pages (routes) in the app.
// React Router looks at the URL and shows the matching page.
import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      {/* Public pages - anyone can open these */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private pages - ProtectedRoute sends logged-out visitors to /login.
          They all share AppLayout (the navigation bar). */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Any other URL */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
