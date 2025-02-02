import { ProductVariant } from "./productVariant.model";

export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
  imageUrl: string | null;
  productVariantDtos: ProductVariant[];
}
