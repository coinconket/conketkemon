# conketkemon

This project is a demo of creating a game on blockchain.

## Blockchain

### Wallet

https://metamask.io/

Add Binance Smart Chain to MetaMask: https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain

### BNB token on testnet

https://testnet.binance.org/faucet-smart

### Contracts

CONKET Token Contract: https://testnet.bscscan.com/address/0xD461B07e3d3040D9eD4E77837d6De87538F9b32f


CONKET NFT Contract: https://testnet.bscscan.com/address/0xe5ba7fe86cb2845793ba985e135719df4e0d8fc9

### Buy Token

PancakeSwap Testnet: https://pancake.kiemtienonline360.com/#/swap

## Prerequisite

- Node

## Frontend

`yarn start frontend`

## Backend

### Game API

`docker compose up`

### Database migration

Currently, The project only supports run migration automatically when the app startup due to an issue of Webpack with TypeORM.

- Creating a new migration: `yarn typeorm migration:create -d apps/game-api/src/database/migrations -n NewMigration`

## Deployment

### Build

- Frontend `yarn build frontend --target=production`
- Game API `docker build -t game-api --build-arg=SERVICE_NAME=game-api --target=production .`

  RUN : `docker run -p 3333:3333 --rm game-api`
