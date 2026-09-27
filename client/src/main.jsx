// main.jsx - the entry point of the React app.
// It finds the <div id="root"> in index.html and renders our <App /> inside it.
// Global styles first, so each page's own CSS (imported inside App) can override them
import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter lets us use page URLs like /home and /profile.
        basename = the folder the site lives in ("/" locally, "/<repo-name>/" on GitHub Pages) */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* AuthProvider shares the logged-in user with every page */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
