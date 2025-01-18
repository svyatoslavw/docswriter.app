import { IsEmail, MinLength } from "class-validator"

export class ResetPasswordDto {
  @IsEmail()
  @MinLength(3, { message: "Email must have at least 3 characters" })
  email: string
}
