import { ContainerModule, interfaces } from "inversify";
import { APP_TYPES } from "../common/types/app.type";
import MongoDBConnection, {
  DbConnection,
} from "../common/database/mongodb.connection";
import { ENV } from "../common/env";
import { ProductService } from "../services/product.service";
import ProductServiceImpl from "../services/impl/product.service.impl";
import { ProductRepository } from "../repositories/product.repository";
import ProductRepositoryImpl from "../repositories/impl/product.repository.impl";
import ProductCommand from "../commands/product/product.command";

const productContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  const mongoDBConnection: DbConnection = new MongoDBConnection(
    ENV.DATABASE_URI,
    ENV.DATABASE_NAME,
  );
  bind<DbConnection>(APP_TYPES.DbConnection).toConstantValue(mongoDBConnection);

  bind<ProductService>(APP_TYPES.ProductService).to(ProductServiceImpl);
  bind<ProductCommand>(APP_TYPES.ProductCommand).to(ProductCommand);
  bind<ProductRepository>(APP_TYPES.ProductRepository).to(
    ProductRepositoryImpl,
  );
});

export default productContainerModule;
