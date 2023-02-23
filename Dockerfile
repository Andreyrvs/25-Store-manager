FROM node:16

WORKDIR /app

RUN pwd

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run migration

# RUN npm run seed

ARG EnvironmentVariable
