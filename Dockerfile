FROM node:14-stretch AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run nx -- build crow-storm --prod

FROM nginx:1.17 AS build
COPY --from=builder /app/dist/apps/crow-storm /usr/share/nginx/html
