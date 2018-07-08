FROM alpine:latest

RUN apk update && apk add nodejs npm libpng-dev 
RUN apk --no-cache update \ 
&& apk --no-cache add g++ make bash zlib-dev libtool libpng-dev autoconf automake nasm \
&&  rm -fr /var/cache/apk/*


RUN cd /src; npm install

COPY . /src
WORKDIR src

EXPOSE 3000