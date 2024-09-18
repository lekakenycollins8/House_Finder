require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const session = require('express-session');
const passportSetup = require('./google-auth/passport');
const sequelize = require('./config/db');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

require('./google-auth/passport');
const authRoutes = require('./google-auth/auth');
const roleRoutes = require('./routes/role');
const houseRoutes = require('./routes/house');
const messageRoutes = require('./routes/message');


const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('joinHouse', ({ houseId }) => {
        socket.join(houseId);
        console.log(`User joined conversation for house: ${houseId}`);
    });


    socket.on('sendMessage', (messageData) => {
        io.to(messageData.houseId).emit(`receiveMessage-${messageData.houseId}`, messageData);

        io.to(messageData.receiverId).emit('messageNotification', {
            message: 'You have a new message',
            houseId: messageData.houseId,
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24,
        }
    })
)

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
app.use('/role', roleRoutes);
app.use('/house', houseRoutes);
app.use('/messages', messageRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });