// create-user.dto.ts
import { IsNotEmpty, IsString, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nome: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  sobrenome: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  senha: string;

  // Adicione outros campos conforme necessário
}
