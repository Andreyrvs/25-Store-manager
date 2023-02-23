FROM node:16

WORKDIR /home/node/app

RUN pwd

COPY package*.json .

RUN npm install

COPY . .

ARG EnvironmentVariable
