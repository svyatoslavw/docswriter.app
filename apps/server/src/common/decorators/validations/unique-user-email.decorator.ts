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
export class UniqueUserEmailConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const user = await this.userService.findByEmail(email)
    return !user
  }

  defaultMessage(args: ValidationArguments): string {
    return `Email "${args.value}" is already taken.`
  }
}

export function UniqueUserEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueUserEmailConstraint
    })
  }
}
