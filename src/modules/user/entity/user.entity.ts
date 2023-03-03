import { Cliente } from 'src/modules/cliente/entity/cliente.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  telefone: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  senha: string;

  @Column('integer', { nullable: true, name: 'cliente_id' })
  clienteId: number;
  @OneToOne(() => Cliente, (cliente) => cliente.user)
  cliente: Cliente;
}
