FROM node:12.10.0-alpine
COPY ./package.json /package.json
RUN npm install
WORKDIR /app
ADD . /app