import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { PokemonsModule } from '../pokemons/pokemons.module';
import { NftContractService } from '../../providers/nft.contract.service';
import { PaymentService } from '../../providers/payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    PokemonsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, NftContractService, PaymentService],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
