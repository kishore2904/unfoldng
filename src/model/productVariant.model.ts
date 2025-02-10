import { ProductImage } from "./productImage.model";
export class ProductVariant {
    variantId?: number;
    productId!: number;
    colorId!: number;
    sizeId!: number;
    price!: number;
    stockQuantity!: number;
    productImageDtos!: ProductImage[];
}