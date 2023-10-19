FROM node:18.18.0-alpine
WORKDIR /vakilpors-front
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm","start"]