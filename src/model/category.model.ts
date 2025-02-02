import { Product } from "./product.model";

export class Category {
    categoryId!: number;
    categoryName!: string;
    parentCategoryId!: number | null;
    productDtos!: Product[];

}