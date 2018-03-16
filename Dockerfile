FROM node:8.10.0-alpine
MAINTAINER Carlos Justiniano cjus34@gmail.com
EXPOSE 3434
HEALTHCHECK --interval=5s --timeout=3s CMD curl -f http://localhost:3434/v1/hmr/health || exit 1
RUN apk add --update \
    curl \
  && rm -rf /var/cache/apk/*
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install --production
ENTRYPOINT ["node", "hmr-svcs"]
