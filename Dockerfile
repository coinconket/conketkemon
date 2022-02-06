FROM node:16-bullseye-slim as dependency

WORKDIR /workdir

ARG SERVICE_NAME

# install dependencies for root package.json
COPY package.json yarn.lock ./
RUN yarn install

# Development image
FROM dependency as development

WORKDIR /workdir

ARG SERVICE_NAME

ENV SERVICE_NAME=${SERVICE_NAME}
ENV NODE_ENV=development
ENV APP_ENV=local
ENV NODE_PATH=.

COPY ./ .

CMD ["sh" , "-c", "yarn start ${SERVICE_NAME}"]


# Builder to compile Typescript
FROM dependency as builder

WORKDIR /workdir

ARG SERVICE_NAME

ENV NODE_ENV=production
ENV NODE_PATH=.

COPY ./ .
RUN yarn nx build ${SERVICE_NAME} --configuration=production


# Production image
FROM node:16-bullseye-slim as production

WORKDIR /workdir

ARG SERVICE_NAME

ENV NODE_ENV=production
ENV NODE_PATH=.

COPY --from=builder /workdir/dist/apps/${SERVICE_NAME} /workdir/
COPY --from=builder /workdir/yarn.lock /workdir/yarn.lock

# Install production dependencies only
RUN yarn install
# tslib issue: https://github.com/nrwl/nx/issues/2625
RUN yarn add tslib@2.3.1

CMD ["node", "main.js"]
