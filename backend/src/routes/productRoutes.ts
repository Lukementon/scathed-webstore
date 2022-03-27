import express, { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';
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

      if (!product) {
        return next(
          new ErrorResponse(`Product not found with ID ${req.params.id}`, 404)
        );
      }

      res.status(200).json(product);
    }
  )
);

export default router;
