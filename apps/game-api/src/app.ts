import Koa from 'koa';
import healthCheck from 'koa-simple-healthcheck';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import endpoints from './endpoints';
import { errorHandler } from './middlewares/error-handler';

const app = new Koa();

app.use(
  cors({
    maxAge: 3600,
  })
);

app.use(bodyParser());
app.use(errorHandler());

app.use(healthCheck({ path: '/health' }));

app.use(endpoints);

export default app;
