import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoutes from './routes/auth-routes'; // Corrected path to auth-routes
import { sequelize } from './models/index'; // Corrected path to models/index

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files for your client-side React app
import path from 'path';
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
app.use('/auth', authRoutes); // Register auth-routes at /auth

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});