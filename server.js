require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('./google-auth/passport');

require('./google-auth/passport');
const authRoutes = require('./google-auth/auth');

const app = express();

app.use(
    cookieSession({
        name: 'session',
        keys: [process.env.SESSION_KEY],
        maxAge: 24 * 60 * 60 * 1000,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });