function rateLimit({ windowMs, max, message }) {
  const requests = new Map();

  const cleanup = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of requests) {
      if (entry.resetAt <= now) requests.delete(key);
    }
  }, windowMs);
  cleanup.unref();

  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.socket?.remoteAddress || "unknown";
    let entry = requests.get(key);

    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      requests.set(key, entry);
    }

    entry.count += 1;
    const remaining = Math.max(0, max - entry.count);
    const retryAfter = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));

    res.set({
      "RateLimit-Limit": String(max),
      "RateLimit-Remaining": String(remaining),
      "RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
    });

    if (entry.count > max) {
      res.set("Retry-After", String(retryAfter));
      return res.status(429).json({
        message,
        retryAfter,
      });
    }

    return next();
  };
}

module.exports = rateLimit;
