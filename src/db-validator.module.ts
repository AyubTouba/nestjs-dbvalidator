import { Module, Provider, DynamicModule } from '@nestjs/common';
import { IsUniqueValidator } from './validators/is-unique.validator';
import { IsExistValidator } from './validators/is-exist.validator';
import { DbConnectOptionsInterface } from './interfaces';
import { QueryService, UtilsService } from './services';
import { IsBiggerValidator } from './validators/is-bigger.validator';
import { IsLowerValidator } from './validators/is-lower.validator';
import { DbService } from './services/database.service';
@Module({})
export class DbValidatorsModule {
  static async register(
    options: DbConnectOptionsInterface,
  ): Promise<DynamicModule> {
    await DbService.initializeDataSource(options);
    return {
      module: DbValidatorsModule,
      providers: [
        IsUniqueValidator,
        IsExistValidator,
        IsBiggerValidator,
        IsLowerValidator,
      ],
      exports: [
        IsUniqueValidator,
        IsExistValidator,
        IsBiggerValidator,
        IsLowerValidator,
      ],
      imports: [QueryService, UtilsService],
    };
  }
}
