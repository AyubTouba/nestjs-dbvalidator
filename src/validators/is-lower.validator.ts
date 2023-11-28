import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { QueryService } from '../services';
import { OPERATION } from 'src/services/enums';

/*
 * isUnique is custom  validator is to check if any X column of X table is Already exist
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class IsLowerValidator implements ValidatorConstraintInterface {
  async validate(columnValue: any, args: ValidationArguments) {
    const params = args.constraints[0];
    if (!columnValue) return true;
    try {
      let condition = QueryService.getOperationQuery(
        columnValue,
        params,
        OPERATION.LOWER,
      );
      let query = QueryService.getQuery(condition, params);
      let resultQuery = await QueryService.getDataQuery(query);

      return !QueryService.isHasData(resultQuery);
    } catch (error) {
      console.log(error);
    }
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    const params = args.constraints[0];
    if (!params.message) return `the ${args.property} is not lower `;
    else return params.message;
  }
}