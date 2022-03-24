const mongoose = require('mongoose');
const dotenv = require('dotenv');
const products = require('./data/products');
const users = require('./data/users');
const User = require('./schemas/user');
const Order = require('./schemas/order');
const Product = require('./schemas/product');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await Order.deleteMany();
    await Product.deleteMany();
    // await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const samplePrducts = products.map(product => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(samplePrducts);

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
