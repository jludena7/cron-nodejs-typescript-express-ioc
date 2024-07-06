import { ObjectId } from "mongodb";

export interface UserEntity extends Document {
  _id: ObjectId;

  email: string;

  name: string;

  status: boolean;

  last_date_session: string;
}
