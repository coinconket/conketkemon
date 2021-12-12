import path from 'path';
import dotenv from 'dotenv';

const APP_ENV = process.env.APP_ENV || 'local';

dotenv.config({
  path: path.resolve(process.cwd(), `.${APP_ENV}.env`),
});

import app from './app';

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/health`);
});
server.on('error', console.error);
