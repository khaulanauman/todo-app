# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
RUN npm install
COPY . .

# Expose port 8000
EXPOSE 8000

# Start the application
CMD ["node", "app.js"]
