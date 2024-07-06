import { IsEmail, IsNotEmpty } from "class-validator";

export interface ICheckUserInactivityDto {
  email: string;
}

export default class CheckUserInactivityDto {
  @IsEmail(
    {},
    {
      message: "email has invalid format",
    },
  )
  @IsNotEmpty({
    message: "email is required",
  })
  email: string;

  constructor(params: ICheckUserInactivityDto) {
    this.email = params.email;
  }
}
