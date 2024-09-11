const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/role', async (req, res) => {
    try {
        const { role } = req.body;
        if (!['landlord', 'renter'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        user.role = role;
        await user.save();
        res.status(200).json({ message: 'Role updated successfully' });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
