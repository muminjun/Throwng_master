FROM node:lts-slim
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build:dev

CMD ["npm", "run", "preview"]



# FROM node:latest as build
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build:dev

# EXPOSE 5173

# CMD ["npx", "serve", "-s", "dist"]