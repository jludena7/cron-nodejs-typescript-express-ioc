import { BodyResponseInterface } from "../responses/body-response.interface";

export default class AppException extends Error {
  public bodyResponse: BodyResponseInterface;

  constructor(bodyResponse: BodyResponseInterface) {
    super();
    this.bodyResponse = bodyResponse;
  }
}
