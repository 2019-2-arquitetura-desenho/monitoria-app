FROM node:12.10.0-alpine
WORKDIR /app
COPY ./package.json .
ADD . /app
ENTRYPOINT [ "/bin/sh", "entrypoint.sh" ]