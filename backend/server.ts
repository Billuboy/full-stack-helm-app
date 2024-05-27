import app from '@init/app';
import logger from '@lib/logger';

if (process.env.API_ENV === 'development') {
  import('dotenv').then((dotenv) => dotenv.config());
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  logger.info(`Listening on: http://localhost:${port}`);
});
