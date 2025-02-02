import { WishlistStatus } from "./wishlistStatus.model";

export class Wishlist{
     wishlistId!: number;
     userId!: string;
     productId!: number;
     dateAdded!: string;
     status!: WishlistStatus;
}