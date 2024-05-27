import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import type { ErrorMiddleware } from '@ts-types';

import { user } from '@drizzle-schema';
import userRouter from '@routes/users.routes';
import { SuccessResponse } from '@utils/responses';
import loggerMiddleware from '@middlewares/logger.middleware';
import catchAllMiddleware from '@middlewares/catchAll.middleware';
import { db, sql } from './db';

const app = express();

app.use(cors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }));
app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');

app.get(`/`, loggerMiddleware, async (_req, res) =>
  res.status(200).json({ message: `Server is running in ${process.env.API_ENV} environment` }),
);

app.use('/health', async (req, res, next) => {
  try {
    await db.select({ confirmation: sql`CONCAT('DATABASE',' ', 'CONNECTED')` }).from(user);
    return SuccessResponse(res, { message: 'All services are running perfectly.' });
  } catch (err) {
    return next(err);
  }
});

app.use(`/users`, loggerMiddleware, userRouter);
app.use('*', loggerMiddleware, (_req, res) =>
  res.status(404).json({ message: 'Endpoint not found' }),
);
app.use(catchAllMiddleware as ErrorMiddleware);

export default app;
