FROM node:12.8

RUN mkdir /app
RUN mkdir /app/public
COPY public /app/public
COPY index.js /app
COPY package.json /app
COPY yarn.lock /app
RUN cd app && yarn install

WORKDIR /app

EXPOSE 9000

ENTRYPOINT ["yarn", "start"]