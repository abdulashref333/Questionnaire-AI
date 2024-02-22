# Dockerfile
FROM node:18.18.0

WORKDIR /app

COPY package*.json ./

COPY . .


EXPOSE  3000

RUN npm install