import { OrderItems } from "./orderItems.model";

export class Orders {

        orderId!: number;
        userId!: number;
        orderDate!: string; 
        status!: string;
        totalPrice!: number;
        paymentStatus!: string; 
        shippingAddress!: string;
        createdAt!: string;
        orderItems!: OrderItems[];
      
}