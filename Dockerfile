FROM node:18-alpine

WORKDIR /mapster

COPY package*.json /mapster/

RUN npm install

COPY . /mapster/

EXPOSE 8080

CMD ["npm", "run", "serve"]