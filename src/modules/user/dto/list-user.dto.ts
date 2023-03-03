import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class ListUsersDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => (Number.isNaN(+value) ? 1 : +value))
  page: number;
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => (Number.isNaN(+value) ? 1 : +value))
  size: number;
}
