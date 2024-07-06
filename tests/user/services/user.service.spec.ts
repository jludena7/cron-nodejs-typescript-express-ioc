import "reflect-metadata";
import UserServiceImpl from "../../../app/src/services/impl/user.service.impl";
import { UserRepository } from "../../../app/src/repositories/user.repository";
import CheckUserInactivityDto from "../../../app/src/commands/user/dto/check-user-inactivity.dto";
import { UserEntity } from "../../../app/src/entities/user.entity";
import DateHelper from "../../../app/src/common/helpers/date.helper";
import { NUM_DAYS_USER_DEACTIVATE } from "../../../app/src/common/constants/app";
import AppResponse from "../../../app/src/common/responses/app.response";
import { ERROR_404, MESSAGES } from "../../../app/src/common/errors/messages";
import AppException from "../../../app/src/common/exceptions/app.exception";
import { ObjectId } from "mongodb";

describe("UserServiceImpl", () => {
  let userService: UserServiceImpl;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      getByEmail: jest.fn(),
      deactivate: jest.fn(),
    } as jest.Mocked<UserRepository>;

    userService = new UserServiceImpl(userRepository);
  });

  it("should deactivate user when inactive for more than specified days", async () => {
    const testEmail = "test@gmail.com";
    const params: CheckUserInactivityDto = { email: testEmail };
    const dateAgo = DateHelper.daysAgo(NUM_DAYS_USER_DEACTIVATE + 1);
    const user: UserEntity = {
      _id: new ObjectId(),
      name: "demo",
      email: testEmail,
      status: true,
      last_date_session: dateAgo.toISOString(),
    } as UserEntity;

    userRepository.getByEmail.mockResolvedValue(user);
    userRepository.deactivate.mockResolvedValue(new ObjectId().toString());
    const response = await userService.checkUserInactivity(params);

    expect(response).toEqual(
      AppResponse.format200({ deactivated: true, message: MESSAGES.OK }),
    );
  });

  it("should not deactivate user when inactive for less than specified days", async () => {
    const testEmail = "test@gmail.com";
    const params: CheckUserInactivityDto = { email: testEmail };
    const dateAgo = DateHelper.daysAgo(1);
    const user: UserEntity = {
      _id: new ObjectId(),
      name: "demo",
      email: testEmail,
      status: true,
      last_date_session: dateAgo.toISOString(),
    } as UserEntity;

    userRepository.getByEmail.mockResolvedValue(user);
    userRepository.deactivate.mockResolvedValue(null);
    const response = await userService.checkUserInactivity(params);

    expect(response).toEqual(
      AppResponse.format200({
        deactivated: false,
        message: MESSAGES.USER_NOT_REQUIRED_DEACTIVATE,
      }),
    );
  });

  it("should return message when user is already deactivated", async () => {
    const testEmail = "test@example.com";
    const params: CheckUserInactivityDto = { email: testEmail };
    const user: UserEntity = { email: testEmail, status: false } as UserEntity;

    userRepository.getByEmail.mockResolvedValue(user);

    const response = await userService.checkUserInactivity(params);

    expect(response).toEqual(
      AppResponse.format200({
        deactivated: false,
        message: MESSAGES.USER_ALREADY_DEACTIVATED,
      }),
    );
  });

  it("should throw an exception when user is not found", async () => {
    const testEmail = "nonexistent@example.com";
    const params: CheckUserInactivityDto = { email: testEmail };

    userRepository.getByEmail.mockResolvedValue(null as unknown as UserEntity);

    await expect(userService.checkUserInactivity(params)).rejects.toThrow(
      new AppException(ERROR_404.COLLECTION_NOT_FOUND),
    );
  });

  it("should throw an exception when deactivation fails", async () => {
    const testEmail = "test@example.com";
    const dateAgo = DateHelper.daysAgo(NUM_DAYS_USER_DEACTIVATE + 1);
    const params: CheckUserInactivityDto = { email: testEmail };
    const user: UserEntity = {
      _id: new ObjectId(),
      name: "demo",
      email: testEmail,
      status: true,
      last_date_session: dateAgo.toISOString(),
    } as UserEntity;

    userRepository.getByEmail.mockResolvedValue(user);
    userRepository.deactivate.mockResolvedValue(null);

    await expect(userService.checkUserInactivity(params)).rejects.toThrow(
      new AppException(ERROR_404.COLLECTION_NOT_UPDATED),
    );
  });
});
