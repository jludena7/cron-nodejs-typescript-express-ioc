import { CAC } from "cac";
import userRegisterCommands from "./user.cli";
import productRegisterCommands from "./product.cli";

const registerCommands = (cli: CAC) => {
  userRegisterCommands(cli);
  productRegisterCommands(cli);
};

export default registerCommands;
