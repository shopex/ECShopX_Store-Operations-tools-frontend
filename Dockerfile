FROM node:12.19.1-alpine3.12 AS builder

ARG CMD
ARG APP_BASE_URL
ARG APP_WEBSOCKET

ENV APP_BASE_URL ${APP_BASE_URL}
ENV APP_WEBSOCKET ${APP_WEBSOCKET}

WORKDIR /app
COPY package*.json ./
COPY .env ./
COPY .env.* ./
RUN npm config set registry https://registry.npm.taobao.org && npm config set @shopex:registry http://registry.npm.ishopex.cn
RUN npm ci

COPY . .
RUN ls -la
RUN ${CMD}
RUN ls -l /app/dist

FROM steebchen/nginx-spa:stable
WORKDIR /app
COPY --from=builder /app/dist .
EXPOSE 80
CMD ["nginx"]