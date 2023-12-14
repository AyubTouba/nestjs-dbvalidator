import { UtilsService } from './utils.service';
import { DbService } from './database.service';
import { OPERATION } from './enums';

export class QueryService {
  static getEqualQuery(valueColumn: any, params: any): string {
    let whereCondition = `1 = 1 and `;
    let isNum = /^\d+$/.test(valueColumn);

    const columnName = QueryService.getQueryColumn(params.column);

    if (
      params.isArray ||
      valueColumn.constructor === Array ||
      Array.isArray(valueColumn) ||
      valueColumn instanceof Array
    )
      whereCondition = ` ${columnName} in (${valueColumn}) `;
    else if (isNum || valueColumn instanceof Number)
      whereCondition = ` ${columnName} = ${valueColumn} `;
    else if (typeof valueColumn === 'string' || valueColumn instanceof String)
      whereCondition = ` ${columnName} like '${valueColumn}' `;

    return whereCondition;
  }

  static getQuery(conditionQuery: string, params: any): string {
    const columnName = QueryService.getQueryColumn(params.column);
    const tableName = QueryService.getQueryColumn(params.table);

    return `select ${columnName}
            from ${tableName}
            where ${conditionQuery}  `;
  }

  static async getDataQuery(query: string): Promise<any> {
    try {
      const dataSource = DbService.getDataSource();
      return await dataSource.query(query);
    } catch (error) {
      console.log('Error in getDataQuery: ', error);
      throw new Error(error);
    }
  }

  static isHasData(data: Array<any>): boolean {
    if (data.length > 0) return true;
  }

  static isDataEqualArray(data: Array<any>, inputArray: any): boolean {
    inputArray = UtilsService.convertToArray(inputArray);
    inputArray = UtilsService.deleteDuplicate(inputArray);

    return data.length >= inputArray.length;
  }

  static getOperationQuery(
    valueColumn: any,
    params: any,
    operation: OPERATION = OPERATION.BIGGER,
  ): string {
    let whereCondition = `1 = 1 and `;

    let isNum = /^\d+$/.test(valueColumn);

    const columnName = QueryService.getQueryColumn(params.column);

    if (isNum || valueColumn instanceof Number)
      whereCondition = ` ${columnName} ${operation} ${valueColumn} `;

    return whereCondition;
  }

  static getQueryColumn(column: any) {
    return DbService.getDataSourceType() == 'postgres'
      ? `"${column}"`
      : `${column}`;
  }
}
