export interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  productImage?: string;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public price?: number,
    public productImage?: string
  ) {
  }
}
