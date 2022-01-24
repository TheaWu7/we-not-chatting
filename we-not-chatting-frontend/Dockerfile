FROM node:17-buster

COPY . /app

WORKDIR /app/build

RUN yarn

RUN yarn global add serve

RUN yarn build

EXPOSE 1234

CMD serve -l tcp://0.0.0.0:1234 -s