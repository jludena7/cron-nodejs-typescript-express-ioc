import { inject, injectable } from "inversify";
import { $log } from "@tsed/logger";
import { BodyResponseInterface } from "../../common/responses/body-response.interface";
import { ProductService } from "../../services/product.service";
import { APP_TYPES } from "../../common/types/app.type";
import { validate } from "class-validator";
import AppResponse from "../../common/responses/app.response";
import ErrorHelper from "../../common/helpers/error.helper";
import CheckProductStockDto, {
  ICheckProductStockDto,
} from "./dto/check-product-stock.dto";

@injectable()
export default class ProductCommand {
  constructor(
    @inject(APP_TYPES.ProductService)
    private productService: ProductService,
  ) {}

  async checkProductStock(params: ICheckProductStockDto): Promise<void> {
    $log.info("ProductCommand | checkProductStock");

    try {
      const checkProductStockDto = new CheckProductStockDto(params);

      const error = await validate(checkProductStockDto);
      if (error.length > 0) {
        const errorResponse = AppResponse.validationRequest(
          ErrorHelper.extractConstraintMessages(error),
        );

        $log.error(
          "ProductCommand | checkProductStock | errorResponse: ",
          errorResponse,
        );
        return;
      }

      const okResponse: BodyResponseInterface =
        await this.productService.checkProductStock(checkProductStockDto);
      $log.info(
        "ProductCommand | checkProductStock | okResponse: ",
        okResponse,
      );
    } catch (error) {
      $log.error("ProductCommand | checkProductStock | error: ", error);
    }
  }
}
