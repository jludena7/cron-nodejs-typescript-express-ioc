import { ProductRepository } from "../product.repository";
import { inject, injectable } from "inversify";
import { APP_TYPES } from "../../common/types/app.type";
import { DbConnection } from "../../common/database/mongodb.connection";
import { $log } from "@tsed/logger";
import { ObjectId, WithId } from "mongodb";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_500 } from "../../common/errors/messages";
import { ProductEntity } from "../../entities/product.entity";
import MongodbHelper from "../../common/helpers/mongodb.helper";

@injectable()
export default class ProductRepositoryImpl implements ProductRepository {
  private collection: string = "products";

  constructor(
    @inject(APP_TYPES.DbConnection)
    private database: DbConnection,
  ) {}

  async updateStock(
    productId: ObjectId,
    stock: number,
  ): Promise<string | null> {
    $log.debug("ProductRepositoryImpl | updateStock | params", {
      productId,
      stock,
    });

    await this.database.connect();
    try {
      const collection = await this.database
        .getDb()
        .collection(this.collection);

      const result: WithId<Document | null> | null =
        await collection.findOneAndUpdate(
          { _id: productId },
          {
            $set: { stock },
          },
        );
      return MongodbHelper.getId(result);
    } catch (error) {
      $log.error("ProductRepositoryImpl | updateStock | error:", error);
      throw new AppException(ERROR_500.UNKNOWN);
    } finally {
      await this.database.close();
    }

    return null;
  }

  async getBySku(sku: string): Promise<ProductEntity> {
    $log.debug("ProductRepositoryImpl | getBySku | params", { sku });

    await this.database.connect();
    try {
      const collection = await this.database
        .getDb()
        .collection(this.collection);
      const product = await collection.findOne<ProductEntity>({ sku });

      return product as ProductEntity;
    } catch (error) {
      $log.error("ProductRepositoryImpl | getBySku | error:", error);
      throw new AppException(ERROR_500.UNKNOWN);
    } finally {
      await this.database.close();
    }
  }
}
