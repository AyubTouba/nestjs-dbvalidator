import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsBiggerValidator } from '../is-bigger.validator';

/*
 * isUnique is custom  validator is to check if any X column of X table is Already exist
*/

export function isBiggerDb(property: any, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBiggerDb',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsBiggerValidator,
    });
  };
}
