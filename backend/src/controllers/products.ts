import asyncHandler from 'express-async-handler';
import Product from '../schemas/product';
import ErrorResponse from '../utils/errorResponse';

// @desc      Fetch all prodcuts
// @route     GET /api/products
// @access    Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc      Fetch single prodcuts
// @route     GET /api/products/:id
// @access    Public
const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with ID ${req.params.id}`, 404)
    );
  }

  res.status(200).json(product);
});

export { getProduct, getProducts };
