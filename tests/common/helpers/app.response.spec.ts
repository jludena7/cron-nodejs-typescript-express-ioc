import { BodyResponseInterface } from "../../../app/src/common/responses/body-response.interface";
import AppResponse from "../../../app/src/common/responses/app.response";
import { HTTP } from "../../../app/src/common/constants/app";

describe("AppResponse", () => {
  describe("format200", () => {
    it("should format response with HTTP status 200", () => {
      const data = { message: "Success" };
      const expectedResponse: BodyResponseInterface = {
        success: true,
        status: HTTP.STATUS_200,
        body: data,
      };

      const response = AppResponse.format200(data);

      expect(response).toEqual(expectedResponse);
    });
  });

  describe("validationRequest", () => {
    it("should format validation request response with HTTP status 400", () => {
      const errorMessage = "Invalid input";
      const expectedResponse: BodyResponseInterface = {
        success: false,
        status: HTTP.STATUS_400,
        body: errorMessage,
      };

      const response = AppResponse.validationRequest(errorMessage);

      expect(response).toEqual(expectedResponse);
    });
  });
});
