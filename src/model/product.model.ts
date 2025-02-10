import { ProductImage } from "./productImage.model";
import { ProductVariant } from "./productVariant.model";

export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
  stockQuantity: number | null;
  categoryId: number;
  imageUrl: string;
  productVariantDtos: ProductVariant[];
}
