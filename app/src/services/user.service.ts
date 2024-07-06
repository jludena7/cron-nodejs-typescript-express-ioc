import CheckUserInactivityDto from "../commands/user/dto/check-user-inactivity.dto";
import { BodyResponseInterface } from "../common/responses/body-response.interface";

export interface UserService {
  checkUserInactivity(
    params: CheckUserInactivityDto,
  ): Promise<BodyResponseInterface>;
}
