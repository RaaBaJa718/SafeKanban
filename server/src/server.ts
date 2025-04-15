import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index'; // Adjusted path to match the correct relative location
import { sequelize } from './models/index'; // Adjusted path to match the correct relative location

const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the React client's `dist` folder
import path from 'path';
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});