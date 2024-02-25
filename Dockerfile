FROM node:20-alpine as base-image

# declaring the build stage
FROM base-image as builder-stage

ARG WORK_DIR=/usr/src/app
RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY src               src
COPY public            public
COPY package.json      package.json
COPY package-lock.json package-lock.json

RUN npm install
RUN npm run build

# declaring the run stage
FROM base-image AS runner-stage

ARG WORK_DIR=/usr/src/app
RUN mkdir -p ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY --from=builder-stage ${WORK_DIR}/build build

RUN npm install -g serve

EXPOSE 3000

CMD serve -l 3000 -s build