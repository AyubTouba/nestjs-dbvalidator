import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { QueryService } from '../services';

/**
 * `IsBiggerValidator` is a custom validator to check if a certain column value is bigger than a certain value in the database.
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsBiggerValidator implements ValidatorConstraintInterface {
  async validate(columnValue: any, args: ValidationArguments) {
    const params = args.constraints[0];
    if (!columnValue) return true;
    try {
      let condition = QueryService.getOperationQuery(columnValue, params);
      let query = QueryService.getQuery(condition, params);
      let resultQuery = await QueryService.getDataQuery(query);

      return !QueryService.isHasData(resultQuery);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * `defaultMessage` is a function that returns the default error message if validation failed.
   * @param args
   */
  defaultMessage(args: ValidationArguments) {
    const params = args.constraints[0];
    if (!params.message) return `the ${args.property} is not bigger `;
    else return params.message;
  }
}
