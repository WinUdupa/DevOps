# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# healthcheck
HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]