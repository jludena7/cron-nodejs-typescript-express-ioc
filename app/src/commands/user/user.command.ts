import { inject, injectable } from "inversify";
import { $log } from "@tsed/logger";
import CheckUserInactivityDto, {
  ICheckUserInactivityDto,
} from "./dto/check-user-inactivity.dto";
import { validate } from "class-validator";
import { UserService } from "../../services/user.service";
import { APP_TYPES } from "../../common/types/app.type";
import { BodyResponseInterface } from "../../common/responses/body-response.interface";
import ErrorHelper from "../../common/helpers/error.helper";
import AppResponse from "../../common/responses/app.response";

@injectable()
export default class UserCommand {
  constructor(
    @inject(APP_TYPES.UserService)
    private userService: UserService,
  ) {}

  async checkUserInactivity(params: ICheckUserInactivityDto) {
    $log.info("UserCommand | checkUserInactivity");

    try {
      const checkUserInactivityDto = new CheckUserInactivityDto(params);

      const error = await validate(checkUserInactivityDto);
      if (error.length > 0) {
        const errorResponse = AppResponse.validationRequest(
          ErrorHelper.extractConstraintMessages(error),
        );

        $log.error(
          "UserCommand | checkUserInactivity | errorResponse: ",
          errorResponse,
        );
        return false;
      }

      const okResponse: BodyResponseInterface =
        await this.userService.checkUserInactivity(checkUserInactivityDto);

      $log.info("UserCommand | checkUserInactivity | okResponse: ", okResponse);
    } catch (error) {
      $log.error("UserCommand | checkUserInactivity | error: ", error);
    }
  }
}
