import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cnpj: string;

  @Column({ name: 'nome_fantasia' })
  nomeFantasia: string;

  @Column()
  telefone: string;

  @Column()
  cep: string;

  @Column()
  endereco: string;

  @Column()
  numero: string;

  @Column({ nullable: true })
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  uf: string;

  // @Column('integer', { nullable: true, name: 'userId' })
  // userId: number;
  @OneToOne(() => User, (user) => user.cliente)
  @JoinColumn()
  user: User;
}
