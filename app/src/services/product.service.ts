import { BodyResponseInterface } from "../common/responses/body-response.interface";
import CheckProductStockDto from "../commands/product/dto/check-product-stock.dto";

export interface ProductService {
  checkProductStock(
    params: CheckProductStockDto,
  ): Promise<BodyResponseInterface>;
}
