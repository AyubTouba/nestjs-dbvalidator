import { TYPECOLUMN } from 'src/services/enums';

export interface ValidatorParamsInterface {
  /**
   * Table name
   */
  table: string;

  /**
   * column name
   */
  column: string;

  /**
   * isArray : is colmun consider as Array
   */
  isArray?: boolean;

  /**
   * customType : How you want to trait the colummn
   */
  customType?: TYPECOLUMN;
}
