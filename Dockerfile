# Setup and build the client

FROM alpine:latest as fe

RUN apk update && apk add nodejs npm libpng-dev 
RUN apk --no-cache update \ 
&& apk --no-cache add g++ make bash zlib-dev libtool libpng-dev autoconf automake nasm \
&&  rm -fr /var/cache/apk/*


COPY fe /src
RUN cd /src; npm install

WORKDIR src
RUN mkdir -p /src/dist
RUN npm run production-build


# Setup the server

FROM node:9.4.0-alpine

COPY be /src
WORKDIR src

COPY --from=fe /src/dist/ /src/fe/

ENV PORT 8080

EXPOSE 8080

CMD ["node", "server.js"]