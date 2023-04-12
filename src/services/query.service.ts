import { getConnection, getManager } from 'typeorm';
import { UtilsService } from './utils.service';
import { DbService } from './database.service';

export class QueryService {
  static getEqualQuery(valueColumn: any, params: any): string {
    let whereCondition = `1 = 1 and `;
    let isNum = /^\d+$/.test(valueColumn);

    const colmunName =
      DbService.getDatabaseType() == 'postgres'
        ? `"${params.column}"`
        : `${params.column}`;

    if (
      params.isArray ||
      valueColumn.constructor === Array ||
      Array.isArray(valueColumn) ||
      valueColumn instanceof Array
    )
      whereCondition = ` ${colmunName} in (${valueColumn}) `;
    else if (isNum || valueColumn instanceof Number)
      whereCondition = ` ${colmunName} = ${valueColumn} `;
    else if (typeof valueColumn === 'string' || valueColumn instanceof String)
      whereCondition = ` ${colmunName} like '${valueColumn}' `;

    return whereCondition;
  }

  static getQuery(conditionQuery: string, params: any): string {
    const colmunName =
      DbService.getDatabaseType() == 'postgres'
        ? `"${params.column}"`
        : `${params.column}`;

    const tableName =
      DbService.getDatabaseType() == 'postgres'
        ? `"${params.table}"`
        : `${params.table}`;

    let query = `select ${colmunName} from ${tableName} where ${conditionQuery}  `;

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

  static getDatabaseType() {
    const connection = getConnection();
    console.log(connection.options.type);
    return connection.options.type;
  }
}
