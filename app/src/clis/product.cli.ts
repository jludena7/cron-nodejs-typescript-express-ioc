import { CAC } from "cac";
import { Container } from "inversify";
import productContainerModule from "../containers/product.container";
import { APP_TYPES } from "../common/types/app.type";
import ProductCommand from "../commands/product/product.command";
import { ICheckProductStockDto } from "../commands/product/dto/check-product-stock.dto";

const container: Container = new Container();
container.load(productContainerModule);

const productRegisterCommands = (cli: CAC) => {
  cli
    .command("check-product-stock", "check-product-stock")
    .option("--sku [sku]", "Product sku", { default: null })
    .option("--min_stock [min_stock]", "Product min stock", { default: null })
    .action(async (params): Promise<void> => {
      const command = container.get<ProductCommand>(APP_TYPES.ProductCommand);
      await command.checkProductStock(params as ICheckProductStockDto);
    });
};

export default productRegisterCommands;
