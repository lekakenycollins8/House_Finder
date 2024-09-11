const router = require('express').Router();
const passport = require('passport');
require('dotenv').config();

router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL+'/role',
        failureRedirect: '/login/failed',
    })
);

router.get('/login/success', (req, res) => {
    if (req.user) {
        if (!req.user.role) {
            return res.redirect(`${process.env.CLIENT_URL}/role`);
        }
        res.status(200).json({
            success: true,
            message: 'User has successfully authenticated',
            user: req.user,
            cookies: req.cookies,
        });
    }
    else {
        res.status(403).json({
            error: true,
            message: 'Not authenticated',
        });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        error: true,
        message: 'Login failed',
    });
});

router.get('/google', passport.authenticate('google', ['profile', 'email']));

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'User logged out' });
    });
});

module.exports = router;