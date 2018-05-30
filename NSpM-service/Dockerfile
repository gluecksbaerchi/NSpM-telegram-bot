FROM node:8.10.0

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet
RUN apt-get update
RUN apt-get install python2.7


COPY . .