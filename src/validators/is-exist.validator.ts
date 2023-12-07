import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { QueryService } from '../services';
import { ValidatorParamsInterface } from 'src/interfaces/validator-params.interface';

/**
 * `IsExistValidator` is a custom validator to check if a certain column of a certain table already exists in the database.
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsExistValidator implements ValidatorConstraintInterface {
  async validate(columnValue: any, args: ValidationArguments) {
    const params: ValidatorParamsInterface = args.constraints[0];

    try {
      let condition = QueryService.getEqualQuery(columnValue, params);
      let query = QueryService.getQuery(condition, params);
      let resultQuery = await QueryService.getDataQuery(query);

      if (params.isArray)
        return QueryService.isDataEqualArray(resultQuery, columnValue);

      return QueryService.isHasData(resultQuery);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * `defaultMessage` is a function that returns the default error message if validation failed.
   * @param args
   */
  defaultMessage(args: ValidationArguments) {
    const params = args.constraints[0];

    if (!params.message) return `the ${args.property} doesn't exist `;
    else return params.message;
  }
}
