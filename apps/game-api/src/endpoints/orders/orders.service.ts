import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { NftContractService } from '../../providers/nft.contract.service';
import { PaymentService } from '../../providers/payment.service';
import { Pokemon } from '../pokemons/entities/pokemon.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './entities/order-status';
import { Order } from './entities/order.entity';

const { PUBLIC_ENDPOINT } = process.env;
@Injectable()
export class OrdersService {
  logger: Logger;

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>,
    private readonly paymentService: PaymentService,
    private readonly nftContractInstanceService: NftContractService
  ) {
    this.logger = new Logger();
  }

  async create(createOrderDto: CreateOrderDto) {
    const orderEntity = Order.fromDto(createOrderDto);
    const pokemon = await this.pokemonRepository.findOne(
      createOrderDto.pokemonId
    );
    if (pokemon.owner) {
      throw new Error('The pokemon already owned by someone.');
    }
    await this.paymentService.verify(
      createOrderDto.transactionHash,
      pokemon.initialPrice
    );
    const dbTx = await getManager().transaction(async (transactionManager) => {
      await transactionManager.insert(Order, {
        ...orderEntity,
        status: OrderStatus.Complete,
      });
      await transactionManager.update(Pokemon, createOrderDto.pokemonId, {
        owner: createOrderDto.fromAddress,
      });
    });
    this.logger.debug(`Database transaction: ${JSON.stringify(dbTx)}`);
    const mintTx = await this.nftContractInstanceService.mintNFT(
      createOrderDto.fromAddress,
      `${PUBLIC_ENDPOINT}/v1/${createOrderDto.pokemonId}`
    );
    this.logger.debug(`Mint NFT transaction: ${JSON.stringify(mintTx)}`);
    return dbTx;
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOne(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, updateOrderDto);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
