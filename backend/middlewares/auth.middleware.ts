import jwt, { JsonWebTokenError } from 'jsonwebtoken';

import type { Request, Response, NextFunction, Middleware } from '@ts-types';

import logger from '@lib/logger';
import { ForbiddenException } from '@utils/responses';
import { getUserByEmail } from '@services/users.service';

type JWTPayload = {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
};

const authMiddleware = async (
  req: Request<{ password?: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) return ForbiddenException(req, res, 'Invalid auth token');

    const jwtToken = authToken.replace(/^Bearer/, '');
    if (!jwtToken) return ForbiddenException(req, res, 'Invalid auth token');

    const jwtPayload = jwt.verify(jwtToken, process.env.JWT_SECRET!, {
      algorithms: ['RS256'],
    }) as JWTPayload;

    if (jwtPayload.exp > Date.now()) return ForbiddenException(req, res, 'JWT Token expired');

    const user = await getUserByEmail(jwtPayload.iss);
    if (!user) return ForbiddenException(req, res, { error: 'Invalid User' });

    req.user = { id: user.id, email: user.email };

    return next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) logger.error({ context: 'JWTError', error: err.message });
    return ForbiddenException(req, res, { error: 'Invalid JWT token' });
  }
};

// eslint-disable-next-line no-unused-vars
export default authMiddleware as unknown as Middleware;
