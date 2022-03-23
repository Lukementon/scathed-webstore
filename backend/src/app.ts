import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { products } from './data/products';
import { Product } from './types/types';

dotenv.config();

const app: Application = express();

app.get('/api/products', (req: Request, res: Response, next: NextFunction) => {
  res.json(products);
});

app.get(
  '/api/products/:id',
  (req: Request, res: Response, next: NextFunction) => {
    const product = products.find(
      (product: Product) => product.id === req.params.id
    );

    res.json(product);
  }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
