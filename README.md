<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center"> nestjs DbValidator Module has some database check validation  </h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation

> npm install @youba/nestjs-dbvalidator


### About nestjs-DbValidator

This module has some costume database validators using class-validator and typeorm

### Quick Start

To configure the module you need to add typeorm configuration using register()

Example : 

```typescript
// src/xModule/x.module.ts
//...
import { DbValidatorsModule } from '@youba/nestjs-dbvalidator';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [DbValidatorsModule.register({
    type: 'mysql',
    host:  "localhost",
    port: 3306,
    username:"root",
    password:"password",
    database:"demo"})],
  providers: [StreetService],
  controllers: [StreetController],
})
export class StreetModule {
  constructor() {}
}
```

Now you can use the nestjs-dbvalidator, First validator is "IsExist" to check if the value is already exist in the table, For example:

```typescript
// src/xModule/x.dto.ts
import { IsExist } from '@youba/nestjs-dbvalidator';

export class StreetDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Validate(IsExist, 
    [ { table: "city", column: "id"}] )
  idcity: number;
  ...
```

Ps : In version 1.1.0 you can use IsArray to trait the value as an Array and check if all the values of the array are exists in the table, as an example:

```typescript
  @Validate(IsExist, 
    [ { table: "city", column: "id", isArray:true}] )
  idcities: any;
```

For the secand validator "IsUnique" is for checking if the value is unique in the table, For example: 

```typescript
// src/xModule/x.dto.ts
import { IsUnique } from '@youba/nestjs-dbvalidator';

export class StreetDto {

  @IsNotEmpty()
    @Validate(IsUnique, 
    [ { table: "company", column: "name" }] )
  name: string;
  ...
```
You can Add 'message' as a parameter to costume your error message

### To Do

- [X] Implement to these validators to check array of values 
- [ ] Implement to IsUnique to ignore an  x value for the update case  


### License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
