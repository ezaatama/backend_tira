import express from 'express';
import { publicRouter } from '../routes/public_api.js';
import { errorMiddleware } from '../middleware/error_middleware.js';
import { routers } from '../routes/api.js';

export const web = express();
web.use(cors({
    origin: ['http://localhost', 'http://10.0.2.2:3000', 'http://127.0.0.1:3000'], // Untuk Android emulator
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
web.use(express.json());
web.use(publicRouter);
web.use(routers);
web.use(errorMiddleware);