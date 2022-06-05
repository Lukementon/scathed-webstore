import dotenv from 'dotenv';
import express, { Application } from 'express';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorMiddleware';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

connectDB();

const app: Application = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
