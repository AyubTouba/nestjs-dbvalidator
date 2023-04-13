import { registerDecorator, ValidationOptions } from "class-validator";
import { isBigger } from "../isBigger.validator";

/*
 * isUnique is custom  validator is to check if any X colmun of X table is Already exist 
*/

export function isBiggerDb(property: any, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBiggerDb',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: isBigger
    });
  };
}
