import "reflect-metadata";
import { BodyResponseInterface } from "../../../app/src/common/responses/body-response.interface";
import ErrorHelper from "../../../app/src/common/helpers/error.helper";
import { $log } from "@tsed/logger";
import UserCommand from "../../../app/src/commands/user/user.command";
import { UserService } from "../../../app/src/services/user.service";
import CheckUserInactivityDto, {
  ICheckUserInactivityDto,
} from "../../../app/src/commands/user/dto/check-user-inactivity.dto";
import AppResponse from "../../../app/src/common/responses/app.response";

jest
  .spyOn(AppResponse, "validationRequest")
  .mockReturnValue({} as BodyResponseInterface);
jest
  .spyOn(ErrorHelper, "extractConstraintMessages")
  .mockReturnValue("Validation errors");
jest.spyOn($log, "error").mockReturnThis();

describe("UserCommand", () => {
  let userCommand: UserCommand;
  let userService: jest.Mocked<UserService>;

  beforeEach(() => {
    userService = {
      checkUserInactivity: jest.fn(),
    } as jest.Mocked<UserService>;
    userCommand = new UserCommand(userService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return successfully process when checkUserInactivity is called", async () => {
    userService.checkUserInactivity.mockResolvedValue(
      {} as BodyResponseInterface,
    );

    const params = {
      email: "demotest@gmail.com",
    } as ICheckUserInactivityDto;

    await userCommand.checkUserInactivity(params as CheckUserInactivityDto);

    const checkProductStockDto = new CheckUserInactivityDto(params);
    expect(userService.checkUserInactivity).toHaveBeenCalledWith(
      checkProductStockDto,
    );
  });

  it("should return validation error if validation fails", async () => {
    const params = {
      email: "demo-test",
    } as any as ICheckUserInactivityDto;

    await userCommand.checkUserInactivity(params);

    expect(ErrorHelper.extractConstraintMessages).toHaveBeenCalled();
    expect(AppResponse.validationRequest).toHaveBeenCalled();
  });

  it("should return error if checkUserInactivity has exception", async () => {
    userService.checkUserInactivity.mockRejectedValue(new Error("Test error"));

    const params = {
      email: "demotest@gmail.com",
    } as ICheckUserInactivityDto;

    await userCommand.checkUserInactivity(params);

    expect($log.error).toHaveBeenCalled();
  });
});
