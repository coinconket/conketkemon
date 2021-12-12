# Conketkemon

This project is a demo of creating a game on blockchain.

## Prerequisite

- Node
- Metamask

## Frontend

`yarn start frontend`

## Backend

### Game API

`yarn start game-api`

## Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/8f5b43bf-e75e-4a51-b132-9972d647687e/deploy-status)](https://app.netlify.com/sites/conketkemon/deploys)

### Build

- Frontend `yarn build frontend --target=production`
- Game API `docker build -t game-api --build-arg=SERVICE_NAME=game-api --target=production .`
