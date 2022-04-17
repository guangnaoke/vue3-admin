FROM node:16.13.0-stretch-slim

RUN mkdir -p /app/dist

WORKDIR /app

ADD ./server /app

ADD ./build /app/dist

RUN npm init -y

RUN npm config set registry https://registry.npmmirror.com

RUN npm install koa@2.13.4 koa-static@5.0.0

EXPOSE 8083

CMD [ "node", "index.js" ]