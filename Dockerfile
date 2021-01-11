# # Setup MongoDB
# FROM mongo

# EXPOSE 27017


# Setup Server
FROM node:14-stretch

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

RUN npm run build

COPY --chown=node:node . .

EXPOSE 3001

CMD ["node", "/server/index.js"]