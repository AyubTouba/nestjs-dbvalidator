import { Module, Provider, DynamicModule } from '@nestjs/common';
import { IsUnique } from './validators/isunique.validator';
import { IsExist } from './validators/isexist.validator';
import { createConnection } from 'typeorm';
import { DbConnectOptions } from './interfaces/DbConnectOption.interface';
import { QueryService } from './services/query.service';
import { UtilsService } from './services/utils.service';
import { DbService } from './services/database.service';

@Module({})
export class DbValidatorsModule {
  static register(options: DbConnectOptions): DynamicModule {
    return {
      module: DbValidatorsModule,
      providers: [...this.createConnectProviders(options), IsUnique, IsExist],
      exports: [IsUnique, IsExist],
      imports: [QueryService, UtilsService, DbService],
    };
  }

  private static createConnectProviders(options: DbConnectOptions): Provider[] {
    return [
      {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () =>
          await createConnection({
            type: options.type,
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
          }),
      },
    ];
  }
}
