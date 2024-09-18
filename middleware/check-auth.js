//Middleware to ensure user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  };

// Middleware to ensure user is authenticated and is a landlord

const ensureLandlord = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'landlord') {
        return next();
    }
    res.status(403).json({ message: 'Forbidden: Only landlords can create listings' });
};
