// server.js - the starting point of the FitFlow backend.
// Express is a Node.js library that lets us create a web server
// and define API routes (URLs the frontend can call).

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load secret settings (MONGO_URI, JWT_SECRET, PORT) from fitflow/.env.
// We run the server from the "server" folder, so the .env file is one level up.
dotenv.config({ path: '../.env', quiet: true });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware = functions that run on every request before our routes.
app.use(cors()); // allow the React app (a different port) to call this API
app.use(express.json()); // read JSON sent in request bodies into req.body

// A simple test route. Open http://localhost:5000/api/health to check the server is running.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FitFlow API is running' });
});

// Later steps will add: database connection (Step 4) and the
// auth, user, activity, workout and progress routes (Steps 6-11).

app.listen(PORT, () => {
  console.log(`FitFlow server running on http://localhost:${PORT}`);
});
