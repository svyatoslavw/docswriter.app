import { UserService } from "@/models/user/user.service"
import { Injectable } from "@nestjs/common"
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator"

@ValidatorConstraint({ async: true })
@Injectable()
export class UserExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(id: string, args: ValidationArguments): Promise<boolean> {
    const user = await this.userService.get(id)
    return !!user
  }

  defaultMessage(args: ValidationArguments): string {
    return `User with ID ${args.value} does not exist.`
  }
}

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserExistsConstraint
    })
  }
}
