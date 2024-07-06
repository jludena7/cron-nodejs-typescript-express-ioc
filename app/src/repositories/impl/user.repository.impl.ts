import { UserRepository } from "../user.repository";
import { inject, injectable } from "inversify";
import { APP_TYPES } from "../../common/types/app.type";
import { DbConnection } from "../../common/database/mongodb.connection";
import { $log } from "@tsed/logger";
import { WithId } from "mongodb";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_500 } from "../../common/errors/messages";
import { UserEntity } from "../../entities/user.entity";
import MongodbHelper from "../../common/helpers/mongodb.helper";

@injectable()
export default class UserRepositoryImpl implements UserRepository {
  private collection: string = "users";

  constructor(
    @inject(APP_TYPES.DbConnection)
    private database: DbConnection,
  ) {}

  async getByEmail(email: string): Promise<UserEntity> {
    $log.debug("UserRepositoryImpl | getByEmail | params", { email });

    await this.database.connect();
    try {
      const collection = await this.database
        .getDb()
        .collection(this.collection);
      const user = await collection.findOne<UserEntity>({ email });

      return user as UserEntity;
    } catch (error) {
      $log.error("UserRepositoryImpl | getByEmail | error:", error);
      throw new AppException(ERROR_500.UNKNOWN);
    } finally {
      await this.database.close();
    }
  }

  async deactivate(email: string): Promise<string | null> {
    $log.debug("UserRepositoryImpl | deactivate | params", { email });

    await this.database.connect();
    try {
      const collection = await this.database
        .getDb()
        .collection(this.collection);

      const result: WithId<Document | null> | null =
        await collection.findOneAndUpdate(
          { email },
          {
            $set: { status: false },
          },
        );

      return MongodbHelper.getId(result);
    } catch (error) {
      $log.error("UserRepositoryImpl | deactivate | error:", error);
      throw new AppException(ERROR_500.UNKNOWN);
    } finally {
      await this.database.close();
    }
  }
}
