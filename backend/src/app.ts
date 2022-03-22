import express, { Application, Request, Response, NextFunction } from 'express';
const products = require('./data/products');
import { Product } from './types/types';

const app: Application = express();

app.get('/api', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello');
});

app.get('/api/products', (req: Request, res: Response, next: NextFunction) => {
  res.json(products);
});

app.get(
  '/api/products/:id',
  (req: Request, res: Response, next: NextFunction) => {
    const product = products.find(
      (product: Product) => product.id === req.params.id
    );

    console.log('product', product);
    res.json(product);
  }
);

app.listen(5000, () => console.log('server running'));
