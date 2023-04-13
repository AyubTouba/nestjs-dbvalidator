import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { QueryService } from '../services/query.service';

/*
 * isUnique is custom  validator is to check if any X colmun of X table is Already exist
 */
@Injectable()
@ValidatorConstraint({ async: true })
export class isBigger implements ValidatorConstraintInterface {
  async validate(colmunValue: any, args: ValidationArguments) {
    const params = args.constraints[0];
    if (!colmunValue) return true;
    try {
      let condition = QueryService.getOperationQuery(colmunValue, params);
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
    if (!params.message) return `the ${args.property} is not bigger `;
    else return params.message;
  }
}
