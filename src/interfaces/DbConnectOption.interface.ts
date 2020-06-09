
export class DbConnectOptions {
  
  /**
   * Database Type
   */
  type : any ;
 
  /**
   * server name or IP address
   */
  host: string;
  /**
   * server port number
   */
  port: number;
  /**
   * database name
   */
  database: string;
  /**
   * user name
   */
  username: string;
  /**
   * user password, or a function that returns one
   */
  password: string;
  

}