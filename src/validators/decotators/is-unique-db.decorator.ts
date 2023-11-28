import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueValidator } from '../is-unique.validator';

/*
 * isUnique is custom  validator is to check if any X colmun of X table is Already exist 
*/

export function isUniqueDb(property: any) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUniqueDb',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      validator: IsUniqueValidator,
    });
  };
}