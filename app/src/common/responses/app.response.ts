import { HTTP } from "../constants/app";
import { BodyResponseInterface } from "./body-response.interface";

export default class AppResponse {
  static format200<T>(data: T): BodyResponseInterface {
    return {
      success: true,
      status: HTTP.STATUS_200,
      body: data,
    } as BodyResponseInterface;
  }

  static validationRequest(message: string): BodyResponseInterface {
    return {
      success: false,
      status: HTTP.STATUS_400,
      body: message,
    } as BodyResponseInterface;
  }
}
