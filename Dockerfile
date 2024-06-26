FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --save-dev env-cmd
RUN npm i --no-audit --no-fund
COPY . ./
RUN npm run build

FROM nginx:latest AS frontend
WORKDIR /app
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]