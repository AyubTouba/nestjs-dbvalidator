import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { QueryService } from '../services';
import { ValidatorParamsInterface } from 'src/interfaces';

/**
 * `IsUniqueValidator` is a custom validator to check if a certain column of a certain table is unique in the database.
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueValidator implements ValidatorConstraintInterface {
  async validate(columnValue: any, args: ValidationArguments) {
    const params = args.constraints[0] as ValidatorParamsInterface;

    try {
      let condition = QueryService.getEqualQuery(columnValue, params);
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
    if (!params.message) return `the ${args.property} is already exist`;
    else return params.message;
  }
}
