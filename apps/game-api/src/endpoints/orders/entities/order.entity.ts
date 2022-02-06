import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Pokemon } from '../../pokemons/entities/pokemon.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderStatus } from './order-status';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column({
    name: 'from_address',
  })
  fromAddress: string;

  @Column({
    name: 'to_address',
  })
  toAddress: string;

  @Column({
    name: 'transaction_hash',
  })
  transactionHash: string;

  @Column({
    name: 'transaction_json',
  })
  transactionJson: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Open,
  })
  status: OrderStatus;

  @CreateDateColumn({
    name: 'created_at',
    default: new Date(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.orders, { cascade: true })
  @JoinColumn({
    name: 'pokemon_id',
  })
  pokemon: Pokemon;

  static fromDto(orderDto: CreateOrderDto) {
    const entity = new Order();
    entity.fromAddress = orderDto.fromAddress;
    entity.toAddress = orderDto.toAddress;
    entity.transactionHash = orderDto.transactionHash;
    entity.transactionJson = orderDto.transactionJson;

    const pokemonEntity = new Pokemon();
    pokemonEntity.id = Number(orderDto.pokemonId);
    entity.pokemon = pokemonEntity;

    return entity;
  }
}
