FROM node:10.15.0-alpine
WORKDIR /app
COPY . .
RUN npm cache clean --force && npm install --production
CMD [ "npm", "run", "start" ]
