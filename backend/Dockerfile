# Stage 1: Build stage
FROM node:alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build


# Stage 2: Runtime stage
FROM node:alpine

WORKDIR /app

COPY --from=builder /app/out/* .

EXPOSE 8080

CMD ["node", "server.js"]