FROM node:16-stretch-slim
EXPOSE 5000
# создание директории приложения
WORKDIR /var/www
COPY ./ ./
RUN npm install && npm run build:prod
CMD npm run dev



FROM node:16

WORKDIR /app
COPY ./package.json .

RUN npm install 
COPY . .

CMD "npm run dev"