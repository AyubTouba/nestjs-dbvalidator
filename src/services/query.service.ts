import { getManager } from "typeorm";
import { UtilsService } from "./utils.service";


export class QueryService {


    static getEqualQuery(valueColumn: any, params: any): string {
        let whereCondition = `1 = 1 and `;
        let isNum = /^\d+$/.test(valueColumn);

        if (params.isArray || valueColumn.constructor === Array || Array.isArray(valueColumn) ||
            valueColumn instanceof Array)
            whereCondition = ` ${params.column} in (${valueColumn}) `;
        else if (isNum || valueColumn instanceof Number)
            whereCondition = ` ${params.column} = ${valueColumn} `;

        else if (typeof valueColumn === 'string' || valueColumn instanceof String)
            whereCondition = ` ${params.column} like '${valueColumn}' `;



        return whereCondition;
    }

    static getQuery(conditionQuery: string, params: any): string {
        let query = `select ${params.column} from ${params.table} where ${conditionQuery}  `;

        return query;
    }

    static async getDataQuery(query): Promise<any> {
        try {
            return await getManager().query(query);
        } catch (error) {
            console.log(error);
        }

    }

    static isHasData(data: Array<any>): boolean {
        if (data.length > 0) return true;
    }

    static isDataEqualArray(data: Array<any>, inputArray: any): boolean {
        inputArray = UtilsService.convertToArray(inputArray);
        inputArray = UtilsService.deleteDuplicate(inputArray);

        return data.length >= inputArray.length ? true : false;
    }

} 