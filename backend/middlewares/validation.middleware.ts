import { ZodError, type Schema } from 'zod';
import type { Request, Response, NextFunction, Middleware } from '@ts-types';

import { BadRequestException, InternalServerException } from '@utils/responses';

const validationMiddleware =
  (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const valid = await schema.parseAsync(req.body);
      req.body = valid;
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errs = error.errors.reduce(
          (acc, e) => ({ ...acc, [e.path[0] ?? e.code]: e.message }),
          {},
        );
        return BadRequestException(req, res, errs);
      }
      return InternalServerException(req, res, 'Internal Server Exception');
    }
  };

// eslint-disable-next-line no-unused-vars
export default validationMiddleware as unknown as (schema: Schema) => Middleware;
