FROM node:19.8-alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY ./dist dist/

CMD ["npm", "run", "dev"]