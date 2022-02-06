import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const APP_ENV = process.env.APP_ENV || 'local';

import { DatabaseProviderModule } from '../../providers/database.module';
import { HealthModule } from '../../endpoints/health/health.module';
import { PokemonsModule } from '../../endpoints/pokemons/pokemons.module';
import { OrdersModule } from '../../endpoints/orders/orders.module';
import { NftItemsModule } from '../../endpoints/nft-items/nft-items.module';
import { SeedingModule } from '../../database/seeding/seeding.module';
import { SeedingService } from '../../database/seeding/seeding.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${APP_ENV}`,
    }),
    DatabaseProviderModule,
    PokemonsModule,
    OrdersModule,
    NftItemsModule,
    SeedingModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedingService) {}
  async onApplicationBootstrap() {
    await this.seedingService.seed();
  }
}
