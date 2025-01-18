import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class NewPasswordDto {
  @IsString({ message: "Password must be a string" })
  @IsNotEmpty({ message: "Password must not be empty" })
  @MinLength(8, { message: "Password must have at least 8 characters" })
  password: string
}
