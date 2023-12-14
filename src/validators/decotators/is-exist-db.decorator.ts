import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsExistValidator } from '../is-exist.validator';

/**
 * `isExistDb` is a custom validator decorator to check if a certain column of a certain table already exists in the database.
 *
 * @param {any} property - The property to compare with.
 * @param {ValidationOptions} validationOptions - Optional validation options.
 * @returns {Function} - Returns a function that registers the custom validator.
 */
export function isExistDb(property: any, validationOptions?: ValidationOptions): Function {
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
