import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueValidator } from '../is-unique.validator';
import { ValidatorParamsInterface } from 'src/interfaces';

/**
 * `isExistDb` is a custom validator decorator to check if a certain column of a certain table already exists in the database.
 * @param {any} property - The property to compare with.
 * @returns {Function} - Returns a function that registers the custom validator.
 */
export function isUniqueDb(property: ValidatorParamsInterface): Function {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUniqueDb',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      validator: IsUniqueValidator,
    });
  };
}
