<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/built%20with-NestJs-red.svg)](https://nestjs.com)

# nestjs-DbValidator

This module provides custom database validators using class-validator and typeorm.

## Important Note

For Nestjs V8 and below, use version 1.1.3.

## Installation

```bash
  npm install @youba/nestjs-dbvalidator
  or
  yarn add @youba/nestjs-dbvalidator
```

## Quick Start

To configure the module, you need to add the typeorm configuration using register()

```typescript
// src/xModule/x.module.ts
//...
import { DbValidatorsModule } from '@youba/nestjs-dbvalidator';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DbValidatorsModule.register({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'demo',
    }),
  ],
  providers: [StreetService],
  controllers: [StreetController],
})
export class StreetModule {
  constructor() {}
}
```

## Usage/Examples

Now you can use nestjs-dbvalidator. The first validator is isExistDb, which checks if the value already exists in the table. For example:

```typescript
// src/xModule/x.dto.ts
import { isExistDb } from '@youba/nestjs-dbvalidator';

export class StreetDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @isExistDb({ table: 'user', column: 'firstName' })
  idcity: number;
  ...
```

#### Note: In version 1.1.0, you can use IsArray to treat the value as an array and check if all the values of the array exist in the table. For example::

```typescript
  @isExistDb({ table: 'user', column: 'firstName', isArray:true })
  idcities: any;
```

## All Validators

| Parameter    | Description                                                  |     |
| :----------- | :----------------------------------------------------------- | :-- |
| `isExistDb`  | Check if the value is already exist in database              |     |
| `isUniqueDb` | Check if the value is unique in database                     |     |
| `isLowerDb`  | Check if the value is lower _(example:check client credits)_ |     |
| `isBiggerDb` | Check if the value is bigger _(example:check stock)_         |     |

| Parameter                 | Description                                                                                      |              |
| :------------------------ | :----------------------------------------------------------------------------------------------- | :----------- |
| `table`                   | Table name                                                                                       | **Required** |
| `column`                  | Column name                                                                                      | **Required** |
| `message`                 | Custom error message                                                                             | _optional_   |
| `isArray`                 | Check in array (_works only with isExistDb & isUniqueDb_)                                        | _optional_   |
| `customType` only in V2.0 | CChanges the type column for validation (Use TYPECOLUMN enums to select a type (NUMBER, STRING)) | _optional_   |

## License

[MIT](https://choosealicense.com/licenses/mit/)
