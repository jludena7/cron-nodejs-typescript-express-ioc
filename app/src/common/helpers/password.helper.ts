import bcrypt from "bcrypt";

export default class PasswordHelper {
  static async hash(password: string): Promise<string> {
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
  }

  static async compare(
    password: string,
    passwordCrypt: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordCrypt);
  }
}
