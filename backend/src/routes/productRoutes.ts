import express, { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../schemas/product';

const router = express.Router();

// @desc      Fetch all prodcuts
// @route     GET /api/products
// @access    Public
router.get(
  '/',
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const products = await Product.find({});

      res.json(products);
    }
  )
);

// @desc      Fetch single prodcuts
// @route     GET /api/products/:id
// @access    Public
router.get(
  '/:id',
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const product = await Product.findById(req.params.id);

      if (product) {
        res.json(product);
      } else {
        res.status(404);
        throw new Error('Product not found');
      }
    }
  )
);

export default router;
