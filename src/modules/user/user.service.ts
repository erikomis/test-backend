import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Cliente } from '../cliente/entity/cliente.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateClientDto } from '../cliente/dto/create-client.dto';
import { ListUsersDto } from './dto/list-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Cliente)
    private readonly clientRepository: Repository<Cliente>,
  ) {}

  async create(createUserDto: CreateUserDto, createClientDto: CreateClientDto) {
    const cnppjExists = await this.clientRepository.findOne({
      where: { cnpj: createClientDto.cnpj },
    });

    if (cnppjExists) {
      throw new ConflictException('CNPJ already exists');
    }

    const emailExists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    const cliente = this.clientRepository.create(createClientDto);
    const newCliente = await this.clientRepository
      .save(cliente)
      .catch((err) => {
        throw new InternalServerErrorException(err.message);
      });

    const user = this.userRepository.create({
      ...createUserDto,
      clienteId: newCliente.id,
    });
    await this.userRepository.save(user);
    return user;
  }

  async listUsers({ page = 1, size = 10 }: ListUsersDto) {
    const skip = page === 1 ? 0 : (page - 1) * size;
    const [results, count] = await this.userRepository.findAndCount({
      take: size,
      skip,
    });
    return {
      data: results,
      page,
      size,
      total: count,
    };
  }
  async remove(id: number | number[], isCallback = false) {
    if (Array.isArray(id)) {
      const response = await Promise.all(
        id.map(async (id) => {
          return this.remove(id, true);
        }),
      );
      const errors = response
        .filter((res) => res.statusCode === 404)
        .map((res) => res.id);
      return {
        message:
          id.length === errors?.length
            ? `Users deleted, but some could not be deleted, because they were not found  ids '${errors.join(
                ', ',
              )}'`
            : 'Users deleted',
        statusCode: 200,
        errors: errors,
      };
    } else {
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      });

      if (!user && isCallback)
        return {
          message: 'User not found',
          statusCode: 404,
          id: id,
        };

      if (!user && !isCallback) {
        throw new NotFoundException('User not found');
      }
      await this.userRepository.remove(user);
      return {
        message: 'User deleted',
        statusCode: 200,
      };
    }
  }
}
