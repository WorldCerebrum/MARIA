FROM node:6.13.1-alpine
RUN apk add -t .gyp --no-cache git python g++ make \ 
    && npm install -g ethereumjs-testrpc \ 
    && apk del .gyp
EXPOSE 8545
ENTRYPOINT ["testrpc"]