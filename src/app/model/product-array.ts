import {IProduct} from './product.model';

export interface IProductArray {
  count?: number;
  products?: IProduct[];
}

export class ProductArray implements IProductArray {
  constructor(
    public count?: number,
    public products?: IProduct[]
  ) {
  }
}
