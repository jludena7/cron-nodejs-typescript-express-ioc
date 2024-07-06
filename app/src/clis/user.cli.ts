import { CAC } from "cac";
import { Container } from "inversify";
import userContainerModule from "../containers/user.container";
import { APP_TYPES } from "../common/types/app.type";
import UserCommand from "../commands/user/user.command";
import { ICheckUserInactivityDto } from "../commands/user/dto/check-user-inactivity.dto";
const container: Container = new Container();
container.load(userContainerModule);

const userRegisterCommands = (cli: CAC) => {
  cli
    .command("check-user-inactivity", "check-user-inactivity")
    .option("--email [email]", "User Email", { default: null })
    .action(async (params): Promise<void> => {
      const command = container.get<UserCommand>(APP_TYPES.UserCommand);
      await command.checkUserInactivity(params as ICheckUserInactivityDto);
    });
};

export default userRegisterCommands;
