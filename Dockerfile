FROM node:alpine

ARG work_dir=/usr/src/app

RUN mkdir -p ${work_dir}
WORKDIR ${work_dir}

COPY src             ${work_dir}/src
COPY public          ${work_dir}/public
COPY yarn.lock       ${work_dir}
COPY package.json    ${work_dir}

RUN yarn && yarn build

RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-l", "3000", "-s", "build"]