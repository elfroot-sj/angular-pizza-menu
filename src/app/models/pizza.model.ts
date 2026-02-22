export interface Pizza {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  // quantità gestita nello stato dell'app -> cart.service.ts
}

