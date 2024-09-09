require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');

require('./google-auth/passport');
const authRoutes = require('./google-auth/auth');

const app = express();

app.use(
    cookieSession({
        name: 'session',
        keys: [lekakenycollins999],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: 'http://localhost:3000',
        methoids: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });