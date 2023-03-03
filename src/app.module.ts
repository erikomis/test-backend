import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClienteModule } from './modules/cliente/cliente.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: ['./src/database/migrations/*{.ts,.js}'],
    }),
    DatabaseModule,
    UserModule,
    ClienteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
