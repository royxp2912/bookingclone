import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import hotelsRoute from './routers/hotels.js';
import authRoute from './routers/auth.js';
import usersRoute from './routers/user.js';
import roomsRoute from './routers/rooms.js';

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to Mongo!');
    } catch (err) {
        throw err;
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB Disconnected');
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
});

//middleware
app.use(cors({ credentials: true, origin: true }));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((error, req, res, next) => {
    const errStatus = error.status || 500;
    const errMessage = error.message || 'Something went wrong!';

    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
    });
});

app.listen(8800, () => {
    connect();
    console.log('Connected to backend!');
});
