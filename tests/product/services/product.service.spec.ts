import "reflect-metadata";
import { ProductRepository } from "../../../app/src/repositories/product.repository";
import ProductServiceImpl from "../../../app/src/services/impl/product.service.impl";
import { MIN_STOCK_DEFAULT } from "../../../app/src/common/constants/app";
import { ProductEntity } from "../../../app/src/entities/product.entity";
import { ObjectId } from "mongodb";
import CheckProductStockDto from "../../../app/src/commands/product/dto/check-product-stock.dto";
import AppResponse from "../../../app/src/common/responses/app.response";
import { ERROR_404, MESSAGES } from "../../../app/src/common/errors/messages";
import AppException from "../../../app/src/common/exceptions/app.exception";
import { ProductService } from "../../../app/src/services/product.service";

describe("ProductServiceImpl", () => {
  let productService: ProductService;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    productRepository = {
      getBySku: jest.fn(),
      updateStock: jest.fn(),
    } as jest.Mocked<ProductRepository>;

    productService = new ProductServiceImpl(productRepository);
  });

  it("should return message that stock does not require updating when stock is sufficient", async () => {
    const product: ProductEntity = {
      _id: new ObjectId(),
      sku: "sku123",
      stock: MIN_STOCK_DEFAULT + 1,
    } as ProductEntity;
    productRepository.getBySku.mockResolvedValue(product);

    const params: CheckProductStockDto = {
      sku: "sku123",
      min_stock: MIN_STOCK_DEFAULT,
    };

    const response = await productService.checkProductStock(params);

    expect(response).toEqual(
      AppResponse.format200({
        stock_updated: false,
        message: MESSAGES.PRODUCT_STOCK_NOT_UPDATED,
      }),
    );
  });

  it("should throw an exception when product is not found", async () => {
    productRepository.getBySku.mockResolvedValueOnce(
      null as unknown as ProductEntity,
    );

    const params: CheckProductStockDto = {
      sku: "sku123",
      min_stock: MIN_STOCK_DEFAULT,
    };

    await expect(productService.checkProductStock(params)).rejects.toThrow(
      new AppException(ERROR_404.COLLECTION_NOT_FOUND),
    );
  });

  it("should update stock when stock is below minimum and return success message", async () => {
    const product: ProductEntity = {
      _id: new ObjectId(),
      sku: "sku123",
      stock: MIN_STOCK_DEFAULT - 1,
    } as ProductEntity;
    productRepository.getBySku.mockResolvedValue(product);
    productRepository.updateStock.mockResolvedValue("1");

    const params: CheckProductStockDto = {
      sku: "sku123",
      min_stock: MIN_STOCK_DEFAULT,
    };

    const response = await productService.checkProductStock(params);

    expect(response).toEqual(
      AppResponse.format200({ stock_updated: true, message: MESSAGES.OK }),
    );
  });

  it("should throw an exception when update stock fails", async () => {
    const product: ProductEntity = {
      _id: new ObjectId(),
      sku: "sku123",
      stock: MIN_STOCK_DEFAULT - 1,
    } as ProductEntity;
    productRepository.getBySku.mockResolvedValue(product);
    productRepository.updateStock.mockResolvedValue(null);

    const params: CheckProductStockDto = {
      sku: "sku123",
      min_stock: MIN_STOCK_DEFAULT,
    };

    await expect(productService.checkProductStock(params)).rejects.toThrow(
      new AppException(ERROR_404.COLLECTION_NOT_UPDATED),
    );
  });
});
