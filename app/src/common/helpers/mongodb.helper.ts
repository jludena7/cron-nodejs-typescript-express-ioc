import { WithId } from "mongodb";
export default class MongodbHelper {
  static getId<T>(result: WithId<T | null> | null): string | null {
    if (result?._id) {
      return result._id.toString();
    }

    return null;
  }
}
