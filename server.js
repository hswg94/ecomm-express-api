import express from 'express';
// import dotenv from 'dotenv when environment is not production, in production it will cause error if try to import.
if (process.env.NODE_ENV !== "production") {
  import('dotenv').then((dotenv) => dotenv.config());
}

import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

const port = process.env.PORT;

connectDB();
const app = express();

//read https://express-rate-limit.mintlify.app/guides/troubleshooting-proxy-issues
app.set('trust proxy', 1 /* number of proxies between user and server */);

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit 100 requests to each IP per windowMs
  standardHeaders: 'draft-7', // Uses combined RateLimit header
  legacyHeaders: false, // Disables legacy headers
}));

// Security
app.use(helmet({ contentSecurityPolicy: false }));
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Apply CORS
if (process.env.NODE_ENV == "production") {
  app.use(cors({
    origin: ['https://ecomm.hswg94.com', 'https://www.ecomm.hswg94.com'], // The frontend domain that is allowed to use this API server
    credentials: true, // Include cookies and other credentials in the CORS request
  }));
} else {
  app.use(cors({
    origin: 'http://localhost:3000', // The frontend domain that is allowed to use this API server
    credentials: true, // Include cookies and other credentials in the CORS request
  }));
}

// Define routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));
app.get('/health', (req, res) => {
  res.send('API Health Check: OK');
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

// This is meant for troubleshootingthe IP address returned in the response.
// If it matches your IP address then the number of proxies is correct and the rate limiter should now work correctly.
// If not, then keep increasing the number in trust proxy until it does.
app.get('/ip', (request, response) => response.send(request.ip))

app.get('/', (req, res) => {
  res.send('API Server is running...');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});