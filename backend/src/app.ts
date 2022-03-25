import dotenv from 'dotenv';
import express, { Application } from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';

dotenv.config();

connectDB();

const app: Application = express();

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
