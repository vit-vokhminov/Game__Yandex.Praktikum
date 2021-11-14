FROM node:14-stretch-slim
ARG APP_URL=https://charleston-runner-07.ya-praktikum.tech
EXPOSE 5000
WORKDIR /var/www
COPY ./ ./
RUN npm install && npm run build
CMD npm run start:prod
