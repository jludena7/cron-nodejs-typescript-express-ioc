import { ProductEntity } from "../entities/product.entity";
import { ObjectId } from "mongodb";

export interface ProductRepository {
  updateStock(productId: ObjectId, stock: number): Promise<string | null>;

  getBySku(sku: string): Promise<ProductEntity>;
}
