import { Product } from "./product.model";
import { ProductVariant } from "./productVariant.model";

export class OrderItems {
    orderItemId!: number;
    product!: Product;
    productVariant!: ProductVariant;
    quantity!: number;
    priceAtTimeOfOrder!: number;
  }