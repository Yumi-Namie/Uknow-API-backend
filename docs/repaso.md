npm install -y (node)
npm install -g @nestjs/cli (nest)


#### Crear un nuevo proyecto NestJS:
```
$ nest new <filename>
```

#### Ingresar a la carpeta del proyecto en la terminal:
```
$ cd <pathproyecto>

```
#### Generar un módulo:
```
$ nest g mo espacio

```

#### Generar un controlador:
```
$ nest g co espacio

```

#### Generar un servicio:
```
$ nest g s espacio

```
- podemos hacer test (Arrange - Act - Assert)
```
$ npm test
```
- Desarrolamos el controller / service para tests

#### Instalar dependencias para la base de datos (MySQL en este ejemplo):
```
$ npm i @nestjs/typeorm typeorm mysql2
```
#### Crear los archivos de entidad en la carpeta src/entities:
- espacio.entity.ts (clase)
```
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags ('user')
@Entity()
export class Espacio {

  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the user', example: Yumi })
  @Column()
  nombre: string;

  // Agrega otras propiedades de la entidad aquí
}

```

#### Crear los DTO (Data Transfer Objects) en la carpeta src/dtos:
- create-espacio.dto.ts
* DTO - vienen en request y queremos mapearlos dentro mi create en controller


```
import { ApiProperty } from "@nestjs/swagger";
export class CreateEspacioDto {
  @ApiProperty ({example: 1})
  nombre: string;

  // Agrega otras propiedades del DTO aquí
}

```

#### Crear un archivo de configuración de la base de datos en la carpeta src/config:
- database.config.ts

npm i @nestjs/config
```
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'mysql',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  host: 'localhost',
  port: 3306,
  username: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'espacios',
}));

```

#### Modificar el archivo app.module.ts para incluir la entidad y configuración de la base de datos:
```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ContentModule } from './content/content.module';
import databaseConfig from './config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('db'),
    }),
    UserModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

#### CREATE SCHEMA espacios; (crea en workbench)
- (puedes comprobar ejecutando nest start despues que creas la bbddd en workbench)
- con un refresh en workbench, se creara la tabla con los elementos
```


gh repo crate https:github.../espacio --public
git remote add origin https://github.con/Yumi-Namie/reserva-espacio.git

https://github.com/factoriaf5-p7/reserva-espacios.git












