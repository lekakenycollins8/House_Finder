const express = require('express');
const router = express.Router();
const User = require('../models/User');

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  };

router.post('/create-role', async (req, res) => {
    const { role } = req.body;
    if (req.isAuthenticated() && role) {
        try {
            await User.update({ role }, { where: { googleId: req.user.googleId } });
            res.status(200).json({ message: 'Role updated' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating role' });
        }
    }
});
module.exports = router;
