import { ContainerModule, interfaces } from "inversify";
import { APP_TYPES } from "../common/types/app.type";
import MongoDBConnection, {
  DbConnection,
} from "../common/database/mongodb.connection";
import { ENV } from "../common/env";
import { UserService } from "../services/user.service";
import UserServiceImpl from "../services/impl/user.service.impl";
import { UserRepository } from "../repositories/user.repository";
import UserRepositoryImpl from "../repositories/impl/user.repository.impl";
import UserCommand from "../commands/user/user.command";

const userContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  const mongoDBConnection: DbConnection = new MongoDBConnection(
    ENV.DATABASE_URI,
    ENV.DATABASE_NAME,
  );
  bind<DbConnection>(APP_TYPES.DbConnection).toConstantValue(mongoDBConnection);

  bind<UserCommand>(APP_TYPES.UserCommand).to(UserCommand);
  bind<UserService>(APP_TYPES.UserService).to(UserServiceImpl);
  bind<UserRepository>(APP_TYPES.UserRepository).to(UserRepositoryImpl);
});

export default userContainerModule;
