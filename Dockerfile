FROM node:16

WORKDIR /app

COPY package*.json ./

COPY . ./home/node/app

RUN npm start