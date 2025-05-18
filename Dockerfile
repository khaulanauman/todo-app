FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# ✅ Copy everything including public/
COPY . .

EXPOSE 8000
CMD ["node", "app.js"]
