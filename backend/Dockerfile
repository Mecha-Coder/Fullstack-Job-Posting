FROM node:23-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy files
COPY ./src .

EXPOSE 5000

CMD ["node","server.js"]