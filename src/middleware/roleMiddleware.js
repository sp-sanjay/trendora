// src/middleware/roleMiddleware.js

/**
 * Middleware to restrict access based on user roles.
 * Usage: router.post('/', requireRole('admin'), controllerFunction);
 *
 * @param {string|string[]} roles - A single role or an array of roles that are allowed.
 * @returns {Function} Express middleware.
 */
export const requireRole = (roles) => {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not authenticated',
        });
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Insufficient privileges',
        });
      }
      next();
    };
  };