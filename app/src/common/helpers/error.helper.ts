import { ValidationError } from "class-validator";
import { ERROR_404 } from "../errors/messages";

export default class ErrorHelper {
  static extractConstraintMessages(errors: ValidationError[]): string {
    if (errors.length > 0) {
      const constraints = Object.values(errors[0].constraints || {});
      if (constraints.length > 0) {
        return constraints[0];
      }
    }

    return ERROR_404.UNKNOWN_VALIDATION.body;
  }
}
