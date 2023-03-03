import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from '../cliente/cliente.module';
import { Cliente } from '../cliente/entity/cliente.entity';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cliente]), ClienteModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
