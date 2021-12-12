FROM node:14-buster-slim as builder

WORKDIR /workdir

ARG SERVICE_NAME

# install dependencies for root package.json
COPY package.json yarn.lock ./
RUN yarn install --ignore-scripts

COPY ./ .
RUN yarn nx build ${SERVICE_NAME} --configuration=production

FROM node:14-buster-slim as production

WORKDIR /workdir

ARG SERVICE_NAME

ENV NODE_ENV=production
ENV NODE_PATH=.

COPY --from=builder /workdir/dist/apps/${SERVICE_NAME} /workdir/
COPY --from=builder /workdir/yarn.lock /workdir/yarn.lock

RUN yarn install
RUN yarn add tslib@2.3.1

CMD ["node", "main.js"]
