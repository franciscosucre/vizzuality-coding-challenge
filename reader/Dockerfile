FROM node:10.15.0-alpine
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm cache clean --force && npm install --production -q --no-color --no-progress
COPY . .
CMD [ "npm", "run", "start" ]
