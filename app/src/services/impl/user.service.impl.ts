import { UserService } from "../user.service";
import { inject, injectable } from "inversify";
import { APP_TYPES } from "../../common/types/app.type";
import { UserRepository } from "../../repositories/user.repository";
import CheckUserInactivityDto from "../../commands/user/dto/check-user-inactivity.dto";
import AppResponse from "../../common/responses/app.response";
import { BodyResponseInterface } from "../../common/responses/body-response.interface";
import { UserEntity } from "../../entities/user.entity";
import AppException from "../../common/exceptions/app.exception";
import { ERROR_404, MESSAGES } from "../../common/errors/messages";
import DateHelper from "../../common/helpers/date.helper";
import { NUM_DAYS_USER_DEACTIVATE } from "../../common/constants/app";

@injectable()
export default class UserServiceImpl implements UserService {
  constructor(
    @inject(APP_TYPES.UserRepository)
    private userRepository: UserRepository,
  ) {}

  async checkUserInactivity(
    params: CheckUserInactivityDto,
  ): Promise<BodyResponseInterface> {
    const user: UserEntity = await this.userRepository.getByEmail(params.email);
    if (!user) {
      throw new AppException(ERROR_404.COLLECTION_NOT_FOUND);
    }

    if (!user.status) {
      return AppResponse.format200({
        deactivated: false,
        message: MESSAGES.USER_ALREADY_DEACTIVATED,
      });
    }

    let deactivate = true;
    if (user.last_date_session.length > 0) {
      const dateAgo: Date = DateHelper.daysAgo(NUM_DAYS_USER_DEACTIVATE);
      const date: Date = new Date(user.last_date_session);
      deactivate = date.getTime() < dateAgo.getTime();
    }

    if (deactivate) {
      const id: string | null = await this.userRepository.deactivate(
        params.email,
      );
      if (!id) {
        throw new AppException(ERROR_404.COLLECTION_NOT_UPDATED);
      }

      return AppResponse.format200({ deactivated: true, message: MESSAGES.OK });
    }

    return AppResponse.format200({
      deactivated: false,
      message: MESSAGES.USER_NOT_REQUIRED_DEACTIVATE,
    });
  }
}
