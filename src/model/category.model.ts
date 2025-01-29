import { Product } from "./product.model";

export class Category {
    categoryId!: number;
    categoryName: string | undefined;
    parentCategoryId: number | undefined;
    productDtos: Product[] = [];

}