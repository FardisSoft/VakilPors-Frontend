# Build stage
FROM node:latest AS build
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci --force 
COPY public/ public/
COPY src/ src/
RUN npm run build

# Run stage
FROM httpd:alpine
WORKDIR /var/www/html
COPY --from=build /build/build/ .