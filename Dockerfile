FROM node:18.1-alpine as base
WORKDIR /app
COPY package*.json ./

FROM base as test
RUN npm ci
COPY . .
CMD ["npm", "run", "test"]

FROM base as dev
RUN npm ci
COPY . .
CMD ["npm", "run", "start:dev"]

FROM base as prod
RUN npm ci --production
COPY . .
CMD ["npm", "run", "start:prod"]