FROM node:6.13.1-alpine

RUN apk add --no-cache bash

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json

RUN apk --no-cache --virtual build-dependencies add \
    git \
    python \
    make \
    g++ \
    && npm install -g truffle@3.2.1 \
    && cd /tmp && npm install \
    && apk del build-dependencies

RUN mkdir -p /var/www && cp -a /tmp/node_modules /var/www/

WORKDIR /var/www
ADD . /var/www
ADD ./app/config/const.hdap.js /var/www/app/javascripts/const.js
ADD ./app/config/01.hdap.js /var/www/app/javascripts/01.js

EXPOSE 8081
ENTRYPOINT ["/bin/bash", "-c", "truffle build && truffle migrate && truffle serve -p 8081"]