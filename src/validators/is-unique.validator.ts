import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { QueryService } from '../services';

/*
 * isUnique is custom  validator is to check if any X column of X table is Already exist
*/
@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueValidator implements ValidatorConstraintInterface {


  async validate(columnValue: any, args: ValidationArguments) {
    const params = args.constraints[0];

    try {
      let condition = QueryService.getEqualQuery(columnValue, params);
      let query = QueryService.getQuery(condition, params);
      let resultQuery = await QueryService.getDataQuery(query);

      return !QueryService.isHasData(resultQuery);


    } catch (error) {
      console.log(error);
    }

  }

  defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
    const params = args.constraints[0];
    if (!params.message)
      return `the ${args.property} is already exist`;
    else
      return params.message;
  }
}

