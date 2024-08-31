import { RateLimiterMemory } from 'rate-limiter-flexible';

// Create a rate limiter instance
const rateLimiter = new RateLimiterMemory({
  points: 7, // Number of points
  duration: 60 * 60 * 10, // Per second
});

// Middleware function
export default async function rateLimit(req, res, next) {
  try {
    // Use IP address as the unique key for rate limiting
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    await rateLimiter.consume(ip);
    next();
  } catch (rlRejected) {
    console.error("error 429: Too many requests, please try again later.")
    // Rate limit exceeded
    res.status(429).json({ error: 'Too many requests, please try again later.' });
  }
}
