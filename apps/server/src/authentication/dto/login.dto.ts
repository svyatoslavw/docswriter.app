import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class LoginDto {
  @IsEmail()
  @MinLength(3, { message: "Login or Email must have at least 3 characters" })
  @MaxLength(30, { message: "Login or Email cannot be longer than 30 characters" })
  email_or_login: string

  @IsOptional()
  @MinLength(8, { message: "Password must have at least 8 characters" })
  password?: string
}

export class RegisterDto extends LoginDto {
  @IsString()
  @MinLength(3, { message: "Login must have at least 3 characters" })
  @MaxLength(20, { message: "Login cannot be longer than 20 characters" })
  login: string
}

export class ConfirmationDto {
  @IsEmail()
  @MinLength(3, { message: "Login or Email must have at least 3 characters" })
  @MaxLength(30, { message: "Login or Email cannot be longer than 30 characters" })
  email: string

  @IsString()
  @MinLength(6, { message: "Code must have at least 6 characters" })
  @MaxLength(6, { message: "Code cannot be longer than 6 characters" })
  code: string
}
