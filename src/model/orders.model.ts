import { OrderItems } from "./orderItems.model";

export class Orders {
  orderId?: number;
  userId?: string; 
  orderDate!: string; 
  status!: string;
  totalPrice!: number;
  paymentStatus: string | undefined;
  shippingAddress!: string;
  createdAt!: string;
  orderItems!: OrderItems[];
}
