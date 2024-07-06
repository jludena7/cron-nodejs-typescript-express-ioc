import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  getByEmail(email: string): Promise<UserEntity>;

  deactivate(email: string): Promise<string | null>;
}
