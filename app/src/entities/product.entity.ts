import { ObjectId } from "mongodb";

export interface ProductEntity extends Document {
  _id: ObjectId;

  sku: string;

  name: string;

  price: number;

  stock: number;
}
