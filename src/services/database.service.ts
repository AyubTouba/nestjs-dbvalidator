import { DbConnectOptionsInterface } from 'src/interfaces';
import { DataSource } from 'typeorm';

export class DbService {
  private static appDataSource: DataSource;

  static async initializeDataSource(options: DbConnectOptionsInterface) {
    if (!this.appDataSource) {
      this.appDataSource = new DataSource({
        type: options.type,
        host: options.host,
        port: options.port,
        username: options.username,
        password: options.password,
        database: options.database,
      });

      await this.appDataSource.initialize();
    }
  }

  static getDataSourceType() {
    return this.appDataSource.options.type;
  }

  static getDataSource(): DataSource {
    if (!this.appDataSource) {
      throw new Error('DataSource is not initialized');
    }
    return this.appDataSource;
  }
}
