const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 999,
    imageUrl: 'https://via.placeholder.com/300',
    category: 'Electronics',
    stock: 10,
  },
  {
    name: 'Phone',
    description: 'Smartphone',
    price: 599,
    imageUrl: 'https://via.placeholder.com/300',
    category: 'Electronics',
    stock: 20,
  },
  {
    name: 'Book',
    description: 'Programming book',
    price: 29,
    imageUrl: 'https://via.placeholder.com/300',
    category: 'Books',
    stock: 50,
  },
];

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Products seeded');
  process.exit();
};

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => seedDB())
  .catch(err => console.log(err));
