import "reflect-metadata";
import ProductCommand from "../../../app/src/commands/product/product.command";
import { ProductService } from "../../../app/src/services/product.service";
import { BodyResponseInterface } from "../../../app/src/common/responses/body-response.interface";
import CheckProductStockDto, {
  ICheckProductStockDto,
} from "../../../app/src/commands/product/dto/check-product-stock.dto";
import ErrorHelper from "../../../app/src/common/helpers/error.helper";
import { $log } from "@tsed/logger";
import AppResponse from "../../../app/src/common/responses/app.response";

jest
  .spyOn(AppResponse, "validationRequest")
  .mockReturnValue({} as BodyResponseInterface);
jest
  .spyOn(ErrorHelper, "extractConstraintMessages")
  .mockReturnValue("Validation errors");
jest.spyOn($log, "error").mockReturnThis();

describe("ProductCommand", () => {
  let productCommand: ProductCommand;
  let productService: jest.Mocked<ProductService>;

  beforeEach(() => {
    productService = {
      checkProductStock: jest.fn(),
    } as jest.Mocked<ProductService>;
    productCommand = new ProductCommand(productService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return successfully process when checkProductStock is called", async () => {
    productService.checkProductStock.mockResolvedValue(
      {} as BodyResponseInterface,
    );

    const params = {
      sku: "PR100",
      min_stock: 20,
    } as ICheckProductStockDto;

    await productCommand.checkProductStock(params as CheckProductStockDto);

    const checkProductStockDto = new CheckProductStockDto(params);
    expect(productService.checkProductStock).toHaveBeenCalledWith(
      checkProductStockDto,
    );
  });

  it("should return validation error if validation fails", async () => {
    const params = {
      sku: "PR100",
      min_stock: "nn",
    } as any as ICheckProductStockDto;

    await productCommand.checkProductStock(params);

    expect(ErrorHelper.extractConstraintMessages).toHaveBeenCalled();
    expect(AppResponse.validationRequest).toHaveBeenCalled();
  });

  it("should register error if checkProductStock has exception", async () => {
    productService.checkProductStock.mockRejectedValue(new Error("Test error"));

    const params = {
      sku: "PR100",
      min_stock: 10,
    } as ICheckProductStockDto;

    await productCommand.checkProductStock(params);

    expect($log.error).toHaveBeenCalled();
  });
});
