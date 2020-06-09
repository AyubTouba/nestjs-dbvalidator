import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { Injectable } from '@nestjs/common';
import { QueryService } from "../services/query.service";
import { ValidatorParams } from "src/interfaces/ValidatorParams.interface";

/*
 * IsExist is custom validator is to check if any X colmun of X table is Already exist 
*/
@Injectable()
@ValidatorConstraint({ async: true })
export class IsExist implements ValidatorConstraintInterface {

   async validate(colmunValue: any, args: ValidationArguments) {
      const params:ValidatorParams = args.constraints[0];

      try {
         let condition = QueryService.getEqualQuery(colmunValue, params);
         let query = QueryService.getQuery(condition,params);
         let resultQuery = await QueryService.getDataQuery(query);
         
            if(params.isArray)
            return QueryService.isDataEqualArray(resultQuery,colmunValue);

         return QueryService.isHasData(resultQuery);


      } catch (error) {
         console.log(error);
      } 

   }

   defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
      const params = args.constraints[0];

      if (!params.message)
         return `the ${args.property} doesn't exist `;
      else
         return params.message;
   }
}