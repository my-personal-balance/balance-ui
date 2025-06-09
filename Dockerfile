FROM node:20-alpine as base-image

FROM base-image as builder-stage

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . .
RUN npm run build

FROM base-image as production-stage

WORKDIR /app
COPY --from=builder-stage /app/dist .

RUN npm install -g serve

EXPOSE 3000

CMD serve -l 3000 -s /app