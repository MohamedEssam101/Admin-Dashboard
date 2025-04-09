export interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductViewModel {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
}
//
