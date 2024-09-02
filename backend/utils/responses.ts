import type { JSONData, Request, Response } from '@ts-types';

import logger from '@lib/logger';
import generateMetaForLogger from './generateMetaForLogger';

export const BadRequestException = (req: Request, res: Response, response: string | object) => {
  const meta = generateMetaForLogger(req);
  logger.error({
    context: 'BadRequestException',
    ...meta,
    error: typeof response === 'object' ? JSON.stringify(response) : response,
  });

  return res.status(400).json({
    method: req.method,
    path: req.originalUrl,
    response,
    statusCode: 400,
  });
};

export const ForbiddenException = (req: Request, res: Response, response: string | object) => {
  const meta = generateMetaForLogger(req);
  logger.error({
    context: 'ForbiddenException',
    ...meta,
    error: typeof response === 'object' ? JSON.stringify(response) : response,
  });

  return res.status(403).json({
    method: req.method,
    path: req.originalUrl,
    response,
    statusCode: 403,
  });
};

export const NotFoundException = (req: Request, res: Response, response: string | object) => {
  const meta = generateMetaForLogger(req);
  logger.error({
    context: 'NotFoundException',
    ...meta,
    error: typeof response === 'object' ? JSON.stringify(response) : response,
  });

  return res.status(404).json({
    method: req.method,
    path: req.originalUrl,
    response,
    statusCode: 404,
  });
};
export const InternalServerException = (req: Request, res: Response, response: string | object) => {
  const meta = generateMetaForLogger(req);
  logger.error({
    context: 'InternalServerException',
    ...meta,
    error: typeof response === 'object' ? JSON.stringify(response) : response,
  });

  return res.status(500).json({
    method: req.method,
    path: req.originalUrl,
    response,
    statusCode: 500,
  });
};

export const SuccessResponse = (res: Response, response: string | JSONData) =>
  res.status(200).json({ data: response });
