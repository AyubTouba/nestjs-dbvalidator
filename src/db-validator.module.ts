import { Module, Provider, DynamicModule, DynamicModule, Global } from '@nestjs/common';
import { IsUnique } from './validators/isunique.validator';
import { IsExist } from './validators/isexist.validator';
import { createConnection } from 'typeorm';
import { DbConnectOptions } from './interfaces/DbConnectOption.interface';
import { QueryService } from './services/query.service';
import { UtilsService } from './services/utils.service';
import { DbService } from './services/database.service';
import { isBigger } from './validators/isBigger.validator';
import { isLower } from './validators/isLower.validator';

@Global()
@Module({})
export class DbValidatorsModule {
  static register(options: DbConnectOptions): DynamicModule {
    return {
      module: DbValidatorsModule,
      providers: [
        ...this.createConnectProviders(options),
        IsUnique,
        IsExist,
        isBigger,
        isLower,
      ],
      exports: [IsUnique, IsExist, isBigger, isLower],
      imports: [QueryService, UtilsService, DbService],
    };
  }

  static registerAsync(options: AsyncOptions): DynamicModule {
    return {
      module: DbValidatorsModule,
      providers: [
        ...this.createConnectProvidersAsync(options),
        IsUnique,
        IsExist,
        isBigger,
        isLower,
      ],
      exports: [IsUnique, IsExist, isBigger, isLower],
      imports: [...options.imports, QueryService, UtilsService, DbService],
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

  private static createConnectProvidersAsync(options: AsyncOptions): Provider[] {
    return [
      {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (configService: ConfigService) => {
          const dbOptions = await options.useFactory(configService);
          return await createConnection({
            type: dbOptions.type,
            host: dbOptions.host,
            port: dbOptions.port,
            username: dbOptions.username,
            password: dbOptions.password,
            database: dbOptions.database,
          });
        },
        inject: options.inject,
      },
    ];
  }
}

interface AsyncOptions {
  imports: any[];
  useFactory: (...args: any[]) => Promise<DbConnectOptions> | DbConnectOptions;
  inject: any[];
}
