import { ValidationError } from "class-validator";
import ErrorHelper from "../../../app/src/common/helpers/error.helper";
import { ERROR_404 } from "../../../app/src/common/errors/messages";

describe("ErrorHelper", () => {
  describe("extractConstraintMessages", () => {
    it("should return the first constraint message when there are validation errors", () => {
      const errors: ValidationError[] = [
        {
          property: "",
          constraints: {
            isNotEmpty: "sku should not be empty",
          },
        },
      ] as ValidationError[];

      const result = ErrorHelper.extractConstraintMessages(errors);

      expect(result).toBe("sku should not be empty");
    });

    it("should return empty constraint message when there are validation errors", () => {
      const errors: ValidationError[] = [
        {
          property: "",
          constraints: undefined,
        },
      ] as ValidationError[];

      const result = ErrorHelper.extractConstraintMessages(errors);

      expect(result).toBe(ERROR_404.UNKNOWN_VALIDATION.body);
    });
  });

  describe("extractConstraintMessages", () => {
    it("should return UNKNOWN_VALIDATION body when there are no validation errors", () => {
      const errors: ValidationError[] = [];

      const result = ErrorHelper.extractConstraintMessages(errors);

      expect(result).toBe(ERROR_404.UNKNOWN_VALIDATION.body);
    });
  });
});
