FROM node:20-alpine

WORKDIR /

# COPY package*.json ./

# RUN npm install

COPY . .

# A retester apres fait l'API
# RUN npm run dev

# CMD [ "npm", "run", "start" ]