import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsBiggerValidator } from '../is-bigger.validator';

/**
 * `isBiggerDb` is a custom validator decorator to check if a property value is bigger than a certain value in the database.
 *
 * @param {any} property - The property to compare with.
 * @param {ValidationOptions} validationOptions - Optional validation options.
 * @returns {Function} - Returns a function that registers the custom validator.
 */
export function isBiggerDb(property: any, validationOptions?: ValidationOptions): Function {
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
