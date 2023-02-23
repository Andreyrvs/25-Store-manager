FROM node:16

WORKDIR /home/node/app

COPY package*.json ./

COPY . ./home/node/app

RUN npm start