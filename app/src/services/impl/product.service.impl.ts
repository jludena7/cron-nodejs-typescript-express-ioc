import { ProductService } from "../product.service";
import { BodyResponseInterface } from "../../common/responses/body-response.interface";
import AppResponse from "../../common/responses/app.response";
import { inject, injectable } from "inversify";
import { APP_TYPES } from "../../common/types/app.type";
import { ProductRepository } from "../../repositories/product.repository";
import { ProductEntity } from "../../entities/product.entity";
import CheckProductStockDto from "../../commands/product/dto/check-product-stock.dto";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_404, MESSAGES } from "../../common/errors/messages";
import { MIN_STOCK_DEFAULT } from "../../common/constants/app";

@injectable()
export default class ProductServiceImpl implements ProductService {
  constructor(
    @inject(APP_TYPES.ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async checkProductStock(
    params: CheckProductStockDto,
  ): Promise<BodyResponseInterface> {
    const product: ProductEntity = await this.productRepository.getBySku(
      params.sku,
    );
    if (!product) {
      throw new AppException(ERROR_404.COLLECTION_NOT_FOUND);
    }

    if (product.stock > MIN_STOCK_DEFAULT) {
      return AppResponse.format200({
        stock_updated: false,
        message: MESSAGES.PRODUCT_STOCK_NOT_UPDATED,
      });
    }

    const id: string | null = await this.productRepository.updateStock(
      product._id,
      params.min_stock,
    );
    if (!id) {
      throw new AppException(ERROR_404.COLLECTION_NOT_UPDATED);
    }

    return AppResponse.format200({ stock_updated: true, message: MESSAGES.OK });
  }
}
