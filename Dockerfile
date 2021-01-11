# # Setup MongoDB
# FROM mongo

# EXPOSE 27017


# Setup Server
FROM node:14-stretch

# USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3001

CMD ["node", "./server/index.js"]