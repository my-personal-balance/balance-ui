FROM node:22-alpine as base-image

WORKDIR /app

RUN corepack enable

VOLUME [ "/pnpm-store", "/app/node_modules" ]
RUN pnpm config --global set store-dir /pnpm-store

FROM base-image as builder-stage

WORKDIR /app

COPY ./package.json .
COPY ./pnpm-lock.yaml .
RUN pnpm install

COPY . .
RUN pnpm run build

FROM base-image as production-stage

WORKDIR /app
COPY --from=builder-stage /app/dist .

RUN npm install -g serve

EXPOSE 3000

CMD serve -l 3000 -s /app