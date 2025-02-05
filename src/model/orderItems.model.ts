export class OrderItems {
  orderItemId!: number;
  productId!: number; // Store productId instead of full Product object (to match Java)
  variantId!: number; // Store variantId instead of full ProductVariant object
  quantity!: number;
  priceAtTimeOfOrder!: number;
}