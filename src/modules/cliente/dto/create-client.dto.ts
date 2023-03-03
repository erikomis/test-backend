import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumberString,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nome_fantasia: string;

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(14)
  @Matches(/^(\d)\1{2}\.\1{3}\.\1{3}\/\1{4}\-\d{2}$/)
  cnpj: string;

  @IsString()
  @MaxLength(255)
  telefone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  cep: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  endereco: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  numero: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  complemento: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  bairro: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  cidade: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  uf: string;

  // Adicione outros campos conforme necessário
}
