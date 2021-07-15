FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY yarn.lock          /usr/src/app/
COPY package.json       /usr/src/app/

COPY src          /usr/src/app/src
COPY public       /usr/src/app/public

RUN yarn

RUN yarn build

EXPOSE 3000

CMD yarn serve -l 3000 -s build
