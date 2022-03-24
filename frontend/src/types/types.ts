interface CountInStock {
  size: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  countInStock: CountInStock[];
}
