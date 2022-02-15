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
- Docker
## Frontend

`yarn start frontend`

## Backend

#### game-api service

- Prepare environment variables

```
cp -n apps/game-api/.env.sample apps/game-api/.env.local
```

- Start with Docker

```
docker compose up
```

- Generate database migration

```
yarn nx run game-api:generate-migration  -n NewDBChange
```

- For more migration commands, look in `apps/game-api/project.json`

## Deployment

### game-api

- build image:
  ```
  docker build -t game-api --build-arg=SERVICE_NAME=game-api  --target=production .
  ```
- envs: `apps/game-api/.env.sample`

### Frontend

- Environment variables:
  ```
  NX_BOOKING_API_ORIGIN=https://game-api.sample.com
  ```
- Build
  `yarn build frontend --config=production`

  output: `dist/apps/frontend`
