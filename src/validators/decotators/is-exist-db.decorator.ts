import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsExistValidator } from '../is-exist.validator';

/*
 * isUnique is custom validator is to check if any X column of X table is Already exist
*/

export function isExistDb(property: any, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isExistDb',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsExistValidator,
    });
  };
}
