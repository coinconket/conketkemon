import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions, getConnectionOptions } from 'typeorm';

type EntitiesAndMigrationsOpts = Pick<
  ConnectionOptions,
  'entities' | 'migrations'
>;

const importAllFunctions = (
  requireContext: __WebpackModuleApi.RequireContext
) =>
  requireContext
    .keys()
    .sort()
    .map((filename) => {
      const required = requireContext(filename);
      return Object.keys(required).reduce((result, exportedKey) => {
        const exported = required[exportedKey];
        if (typeof exported === 'function') {
          return result.concat(exported);
        }
        return result;
      }, [] as any);
    })
    .flat();

const entitiesViaWebpack: NonNullable<EntitiesAndMigrationsOpts['entities']> =
  importAllFunctions(require.context('../endpoints', true, /\.entity\.ts$/));

const migrationsViaWebpack: NonNullable<
  EntitiesAndMigrationsOpts['migrations']
> = importAllFunctions(
  require.context('../database/migrations', true, /\.ts$/)
);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const options = await getConnectionOptions();
        return Object.assign(options, {
          entities: entitiesViaWebpack,
          migrations: migrationsViaWebpack,
        });
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseProviderModule {}
