import express, { Express } from 'express';
import 'dotenv/config'
import { routes } from './routes';

import { customLogger, errorHandler } from './utils/middlewares';

export const app: Express = express();

const port = process.env.PORT || 8080

// Error handling middleware
app.use(customLogger)
app.use(express.json());
app.use('/', routes)

// Super generic error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = { app };
