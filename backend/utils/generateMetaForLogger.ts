import { getClientIp } from '@supercharge/request-ip';

import type { Request } from '@ts-types';

const generateMetaForLogger = (req: Request<{ password?: string }>) => {
  const meta: Record<string, unknown> = {
    request: {
      url: req.originalUrl,
      method: req.method,
      origin: req.headers.origin,
      ip: getClientIp(req),
    },
    ...(req.user ? { user: { id: req.user.id, email: req.user.email } } : {}),
  };

  if (req.body) {
    const body = { ...req.body };
    delete (body as { password?: string }).password;
    meta.body = body;
  }

  return meta;
};

export default generateMetaForLogger;
