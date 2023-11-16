import { Module, Provider, DynamicModule } from '@nestjs/common';
import { IsUniqueValidator } from './validators/is-unique.validator';
import { IsExistValidator } from './validators/is-exist.validator';
import { createConnection } from 'typeorm';
import { DbConnectOptionsInterface } from './interfaces';
import { QueryService, UtilsService } from './services';
import { DbService } from './services/database.service';
import { IsBiggerValidator } from './validators/is-bigger.validator';
import { IsLowerValidator } from './validators/is-lower.validator';

@Module({})
export class DbValidatorsModule {
  static register(options: DbConnectOptionsInterface): DynamicModule {
    return {
      module: DbValidatorsModule,
      providers: [
        ...this.createConnectProviders(options),
        IsUniqueValidator,
        IsExistValidator,
        IsBiggerValidator,
        IsLowerValidator,
      ],
      exports: [IsUniqueValidator, IsExistValidator, IsBiggerValidator, IsLowerValidator],
      imports: [QueryService, UtilsService, DbService],
    };
  }

  private static createConnectProviders(options: DbConnectOptionsInterface): Provider[] {
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
