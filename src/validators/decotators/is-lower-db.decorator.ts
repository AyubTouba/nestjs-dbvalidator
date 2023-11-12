import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsBiggerValidator } from '../is-bigger.validator';
import { IsLowerValidator } from '../is-lower.validator';

/*
 * isUnique is custom  validator is to check if any X column of X table is Already exist
 */

export function isLowerDb(
  property: any,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLowerDb',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsLowerValidator,
    });
  };
}
